package com.example.backend.Services;

import com.example.backend.model.BookNow;
import com.example.backend.repository.BookNowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookNowService {

    @Autowired
    private BookNowRepository bookNowRepository;

    public BookNow createBookNow(BookNow bookNow) {
        return bookNowRepository.save(bookNow);
    }

    public List<BookNow> getAllBookNows() {
        return bookNowRepository.findAll();
    }

    public BookNow getBookNowById(Long id) {
        Optional<BookNow> optionalBookNow = bookNowRepository.findById(id);
        return optionalBookNow.orElse(null);
    }

    public BookNow updateBookNowById(Long id, BookNow bookNow) {
        if (bookNowRepository.existsById(id)) {
            bookNow.setBookNowId(id);
            return bookNowRepository.save(bookNow);
        }
        return null;
    }

    public void deleteBookNowById(Long id) {
        bookNowRepository.deleteById(id);
    }
}
