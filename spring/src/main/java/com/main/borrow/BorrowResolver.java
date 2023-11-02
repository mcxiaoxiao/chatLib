package com.main.borrow;

import com.main.book.BookService;
import com.main.reader.ReaderService;
import com.main.schema.*;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.Calendar;

@DgsComponent
public class BorrowResolver {
    @Resource
    @Autowired
    private BorrowService borrowService;
    @Resource
    @Autowired
    private BookService bookService;
    @Resource
    @Autowired
    private ReaderService readerService;
    public BorrowResolver(BookService bookService) {
        this.bookService = bookService;
    }

    @DgsMutation
    public TakeEntity borrow(@InputArgument Integer bookid,@InputArgument Integer readerid,@InputArgument Integer borrowtime) {
        //获取当前时间
        Date date = new Date(System.currentTimeMillis());
        Calendar c = Calendar.getInstance();
        c.setTime(date);//使用给定的 Date设置此日历的时间
        c.add(Calendar.DATE,borrowtime);  //将当前日历时间添加指定日期
        Date deadline = new Date(c.getTimeInMillis()); //以毫秒为单位返回此日历的时间值
        //获取所查询书籍
        BookEntity book = bookService.findBookById(bookid);
        //新建联系类
        TakeEntity take = new TakeEntity();
        //所查询书籍变更为已借出
        book.setBorrowed(true);
        //保存
        bookService.addBook(book);

        ReaderEntity reader =readerService.findReaderById(readerid);

        //创建一条历史记录
        HistoryEntity history = new HistoryEntity();
        history.setBookname(book.getName());
        history.setBookid(book.getBookid());
        history.setTime(date);
        history.setReaderid(readerid);
        history.setReadername(reader.getReadername());
        history.setType("借出");
        borrowService.addHistory(history);


        //封存属性设置
        take.setBookname(book.getName());
        take.setBookid(bookid);
        take.setBorroweddate(date);
        take.setReaderid(readerid);
        take.setBorrowedtime(borrowtime);
        take.setBorrowedddl(deadline);
        take.setIsreturned(false);
        return borrowService.add(take);
    }

    @DgsMutation
    public TakeEntity back(@InputArgument Integer takeid) {
        //获取当前时间
        Date date = new Date(System.currentTimeMillis());

        //获取联系类
        TakeEntity take = borrowService.findTakeById(takeid);
        //获取所查询书籍
        BookEntity book = bookService.findBookById(take.getBookid());
        //所查询书籍变更为已归还
        book.setBorrowed(false);
        //保存图书
        bookService.addBook(book);

        ReaderEntity reader =readerService.findReaderById(take.getReaderid());

        //创建一条历史记录
        HistoryEntity history = new HistoryEntity();
        history.setBookname(book.getName());
        history.setBookid(book.getBookid());
        history.setTime(date);
        history.setReaderid(take.getReaderid());
        history.setReadername(reader.getReadername());
        history.setType("归还");

        borrowService.addHistory(history);

        //修改借出记录状态
        take.setIsreturned(true);
        return borrowService.add(take);
    }

    @DgsMutation
    public TakeEntity renew(@InputArgument Integer takeid,@InputArgument Integer borrowtime) {

        Date date2 = new Date(System.currentTimeMillis());

        //获取联系类
        TakeEntity take = borrowService.findTakeById(takeid);

        Date date = take.getBorroweddate();

        borrowtime += take.getBorrowedtime();

        Calendar c = Calendar.getInstance();
        c.setTime(date);//使用给定的 Date设置此日历的时间
        c.add(Calendar.DATE,borrowtime);  //将当前日历时间添加指定日期
        Date deadline = new Date(c.getTimeInMillis()); //以毫秒为单位返回此日历的时间值

        take.setBorrowedtime(borrowtime);
        take.setBorrowedddl(deadline);


        //获取所查询书籍
        BookEntity book = bookService.findBookById(take.getBookid());
        ReaderEntity reader =readerService.findReaderById(take.getReaderid());
        //创建一条历史记录
        HistoryEntity history = new HistoryEntity();
        history.setBookname(book.getName());
        history.setBookid(book.getBookid());
        history.setTime(date2);
        history.setReaderid(take.getReaderid());
        history.setReadername(reader.getReadername());
        history.setType("续期");

        borrowService.addHistory(history);


        //修改借出记录状态
        return borrowService.add(take);
    }



    @DgsQuery
    public TakeEntity findById(@InputArgument Integer takeid) {
        return borrowService.findTakeById(takeid);
    }
    @DgsQuery
    public PagesTakeEntity findTakeAll(@InputArgument Integer pageNumber, @InputArgument Integer pageSize)
    {
        PagesTakeEntity p = new PagesTakeEntity();
        p.list = borrowService.findTakeAll(pageNumber,pageSize).getContent();
        p.totalCount = borrowService.findTakeAllAll().size();
        return p;
    }

    @DgsQuery
    public PagesHistoryEntity findHistoryAll(@InputArgument Integer pageNumber, @InputArgument Integer pageSize)
    {
        PagesHistoryEntity p = new PagesHistoryEntity();
        p.list = borrowService.findHistoryAll(pageNumber,pageSize).getContent();
        p.totalCount = borrowService.findHistoryAllAll().size();
        return p;
    }

}


