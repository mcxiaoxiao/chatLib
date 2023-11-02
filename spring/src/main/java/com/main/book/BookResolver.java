package com.main.book;

import com.main.schema.BookEntity;
import com.main.schema.PagesBookEntity;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;

import javax.annotation.Resource;
@DgsComponent
public class BookResolver {
    @Resource
    private BookService bookService;
    @DgsQuery
    public PagesBookEntity findBookAll(@InputArgument Integer pageNumber, @InputArgument Integer pageSize) {
        PagesBookEntity p = new PagesBookEntity();
        p.list = bookService.findBookPaginated(pageNumber,pageSize).getContent();
        p.totalCount = bookService.findBookAll().size();
        return p;
    }
    @DgsQuery
    public BookEntity findBookById(@InputArgument Integer id) {
        return bookService.findBookById(id);
    }
    @DgsMutation
    public BookEntity addBook(@InputArgument BookEntity book) {
        return bookService.addBook(book);
    }
    @DgsMutation
    public BookEntity deleteBook(@InputArgument Integer id) {
        return bookService.deleteBook(id);
    }
}


