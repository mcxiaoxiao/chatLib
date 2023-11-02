package com.main.book;

import com.main.schema.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Resource
    private BookRepository bookRepository;
    private EntityManager entityManager;
    public BookServiceImpl(BookRepository bookRepository)
    {
        this.bookRepository=bookRepository;
    }
    @Override
    public BookEntity addBook(BookEntity book) {
        return bookRepository.save(book);
    }
    @Override
    public BookEntity deleteBook(Integer id) {
        BookEntity book=bookRepository.findById(id).orElse(null);
        bookRepository.deleteById(id);
        return book;
    }
    @Override
    public List<BookEntity> findBookAll() {
        return bookRepository.findAll();
    }
    @Override
    public BookEntity findBookById(int id) {
        return bookRepository.findById(id).orElse(null);
    }
    @Override
    public Page<BookEntity> findBookPaginated(int pageNumber, int pageSize) {
//        pageNumber = 1;
//        pageSize = 10;
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        return bookRepository.findAll(pageable);
    }
}
