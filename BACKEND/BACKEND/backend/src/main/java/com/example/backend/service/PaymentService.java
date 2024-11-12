package com.example.backend.service;

import com.example.backend.model.Payment;
import com.example.backend.repository.PaymentRepository;
import com.example.backend.exception.PaymentException; // Import the custom exception
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        // Save only if payment is successful
        if (payment.isSuccess()) {
            return paymentRepository.save(payment);
        }
        throw new PaymentException("Payment was not successful.");
    }
}
