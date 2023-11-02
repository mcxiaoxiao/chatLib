package com.main.schema;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "take", schema = "public", catalog = "library")
public class TakeEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "takeid")
    private int takeid;
    @Basic
    @Column(name = "bookid")
    private Integer bookid;
    @Basic
    @Column(name = "borroweddate")
    private Date borroweddate;
    @Basic
    @Column(name = "borrowedddl")
    private Date borrowedddl;
    @Basic
    @Column(name = "borrowedtime")
    private Integer borrowedtime;
    @Basic
    @Column(name = "readerid")
    private Integer readerid;
    @Basic
    @Column(name = "isreturned")
    private Boolean isreturned;
    @Basic
    @Column(name = "bookname")
    private String bookname;

    public int getTakeid() {
        return takeid;
    }

    public void setTakeid(int takeid) {
        this.takeid = takeid;
    }

    public Integer getBookid() {
        return bookid;
    }

    public void setBookid(Integer bookid) {
        this.bookid = bookid;
    }

    public Date getBorroweddate() {
        return borroweddate;
    }

    public void setBorroweddate(Date borroweddate) {
        this.borroweddate = borroweddate;
    }

    public Date getBorrowedddl() {
        return borrowedddl;
    }

    public void setBorrowedddl(Date borrowedddl) {
        this.borrowedddl = borrowedddl;
    }

    public Integer getBorrowedtime() {
        return borrowedtime;
    }

    public void setBorrowedtime(Integer borrowedtime) {
        this.borrowedtime = borrowedtime;
    }

    public Integer getReaderid() {
        return readerid;
    }

    public void setReaderid(Integer readerid) {
        this.readerid = readerid;
    }

    public Boolean getIsreturned() {
        return isreturned;
    }

    public void setIsreturned(Boolean isreturned) {
        this.isreturned = isreturned;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TakeEntity that = (TakeEntity) o;

        if (takeid != that.takeid) return false;
        if (bookid != null ? !bookid.equals(that.bookid) : that.bookid != null) return false;
        if (borroweddate != null ? !borroweddate.equals(that.borroweddate) : that.borroweddate != null) return false;
        if (borrowedddl != null ? !borrowedddl.equals(that.borrowedddl) : that.borrowedddl != null) return false;
        if (borrowedtime != null ? !borrowedtime.equals(that.borrowedtime) : that.borrowedtime != null) return false;
        if (readerid != null ? !readerid.equals(that.readerid) : that.readerid != null) return false;
        if (isreturned != null ? !isreturned.equals(that.isreturned) : that.isreturned != null) return false;
        if (bookname != null ? !bookname.equals(that.bookname) : that.bookname != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = takeid;
        result = 31 * result + (bookid != null ? bookid.hashCode() : 0);
        result = 31 * result + (borroweddate != null ? borroweddate.hashCode() : 0);
        result = 31 * result + (borrowedddl != null ? borrowedddl.hashCode() : 0);
        result = 31 * result + (borrowedtime != null ? borrowedtime.hashCode() : 0);
        result = 31 * result + (readerid != null ? readerid.hashCode() : 0);
        result = 31 * result + (isreturned != null ? isreturned.hashCode() : 0);
        result = 31 * result + (bookname != null ? bookname.hashCode() : 0);
        return result;
    }
}
