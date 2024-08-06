package com.example.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BookNow  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookNowId;

    @JoinColumn(name = "userId")
    private String user;

    @JoinColumn(name = "eventId")
    private String eventName;

    private String bookingDetails;
}
