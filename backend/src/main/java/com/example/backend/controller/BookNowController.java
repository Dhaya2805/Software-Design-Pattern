package com.example.backend.controller;


import com.example.backend.model.BookNow;
import com.example.backend.Services.BookNowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booknow")
public class BookNowController {

    @Autowired
    private BookNowService bookNowService;

    @PostMapping
    public ResponseEntity<BookNow> createBookNow(@RequestBody BookNow bookNow) {
        return ResponseEntity.ok(bookNowService.createBookNow(bookNow));
    }

    @GetMapping
    public ResponseEntity<List<BookNow>> getAllBookNows() {
        return ResponseEntity.ok(bookNowService.getAllBookNows());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookNow> getBookNowById(@PathVariable Long id) {
        return ResponseEntity.ok(bookNowService.getBookNowById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookNow> updateBookNowById(@PathVariable Long id, @RequestBody BookNow bookNow) {
        return ResponseEntity.ok(bookNowService.updateBookNowById(id, bookNow));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookNowById(@PathVariable Long id) {
        bookNowService.deleteBookNowById(id);
        return ResponseEntity.noContent().build();
    }
}

