package com.main.reader;

import com.main.book.BookService;
import com.main.schema.BookEntity;
import com.main.schema.PagesBookEntity;
import com.main.schema.ReaderEntity;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;

@DgsComponent
public class ReaderResolver {
    @Resource
    @Autowired
    private ReaderService readerService;
    @DgsQuery
    public ReaderEntity findReaderById(@InputArgument Integer readerid) {
        ReaderEntity r = readerService.findReaderById(10086);
        return r;
    }
    @DgsMutation
    public ReaderEntity addReader(@InputArgument ReaderEntity reader) {
        return readerService.addReader(reader);
    }
}


