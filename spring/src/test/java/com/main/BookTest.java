package com.main;

import com.main.book.*;
import com.main.borrow.TakeRepository;
import com.main.reader.ReaderRepository;
import com.main.reader.ReaderService;
import com.main.schema.BookEntity;
import com.main.schema.TakeEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;

import java.util.List;

@Slf4j
@SpringBootTest
public class BookTest {

    @Autowired
    private ReaderService readerService;
    @Autowired
    private TakeRepository takeRepository;


    @Test
    public void test() throws Exception {
//        TakeEntity take = new TakeEntity();
////      take.setIsreturned(false);
//
//        Example<TakeEntity> example = Example.of(take);

        System.out.println(readerService.findReaderById(10086));
//        System.out.println(takeRepository.findAll());
        System.out.println("已经运行");



    }

}