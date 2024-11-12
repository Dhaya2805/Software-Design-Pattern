package com.example.backend.repository;

import com.example.backend.model.Payment;
import com.example.backend.model.PaymentRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    void save(PaymentRequest paymentRequest);
    // Custom query methods (if needed) can be added here
}
