package com.example.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.Payment;
import com.example.backend.model.PaymentRequest;
import com.example.backend.repository.PaymentRepository;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Validate the paymentRequest object
            if (paymentRequest.getPaymentMethod() == null || paymentRequest.getPaymentMethod().isEmpty()) {
                return ResponseEntity.badRequest().body("Payment method is required.");
            }

            // Validate other required fields based on the payment method
            if ("upi".equalsIgnoreCase(paymentRequest.getPaymentMethod()) && (paymentRequest.getUpiId() == null || paymentRequest.getUpiId().isEmpty())) {
                return ResponseEntity.badRequest().body("UPI ID is required for UPI payments.");
            }

            if ("netbanking".equalsIgnoreCase(paymentRequest.getPaymentMethod())) {
                if (paymentRequest.getBankName() == null || paymentRequest.getBankName().isEmpty()) {
                    return ResponseEntity.badRequest().body("Bank Name is required for Net Banking payments.");
                }
                if (paymentRequest.getIfscCode() == null || paymentRequest.getIfscCode().isEmpty()) {
                    return ResponseEntity.badRequest().body("IFSC Code is required for Net Banking payments.");
                }
                if (paymentRequest.getAccountNo() == null || paymentRequest.getAccountNo().isEmpty()) {
                    return ResponseEntity.badRequest().body("Account No is required for Net Banking payments.");
                }
            }

            if ("card".equalsIgnoreCase(paymentRequest.getPaymentMethod())) {
                if (paymentRequest.getCardNumber() == null || paymentRequest.getCardNumber().isEmpty()) {
                    return ResponseEntity.badRequest().body("Card Number is required for Card payments.");
                }
                if (paymentRequest.getExpiryDate() == null) {
                    return ResponseEntity.badRequest().body("Expiry Date is required for Card payments.");
                }
                if (paymentRequest.getCvv() == null || paymentRequest.getCvv().isEmpty()) {
                    return ResponseEntity.badRequest().body("CVV is required for Card payments.");
                }
            }

            // Create a Payment entity and set relevant fields
            Payment payment = new Payment();
            payment.setPaymentMethod(paymentRequest.getPaymentMethod());
            payment.setAmount(paymentRequest.getAmount());
            payment.setIsSuccess(paymentRequest.getIsSuccess());

            switch (paymentRequest.getPaymentMethod().toLowerCase()) {
                case "upi":
                    payment.setUpiId(paymentRequest.getUpiId());
                    break;
                case "netbanking":
                    payment.setBankName(paymentRequest.getBankName());
                    payment.setIfscCode(paymentRequest.getIfscCode());
                    payment.setAccountNo(paymentRequest.getAccountNo());
                    break;
                case "card":
                    payment.setCardNumber(paymentRequest.getCardNumber());
                    payment.setExpiryDate(paymentRequest.getExpiryDate());
                    payment.setCvv(paymentRequest.getCvv());
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid payment method.");
            }

            // Save the payment details to the database
            paymentRepository.save(payment);

            // Return success response
            return ResponseEntity.ok("Payment processed successfully.");
        } catch (Exception e) {
            logger.error("Error processing payment: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the payment.");
        }
    }
}
