package com.main.schema;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "history", schema = "public", catalog = "library")
public class HistoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "hisid")
    private int hisid;
    @Basic
    @Column(name = "bookid")
    private Integer bookid;
    @Basic
    @Column(name = "readerid")
    private Integer readerid;
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "bookname")
    private String bookname;
    @Basic
    @Column(name = "readername")
    private String readername;
    @Basic
    @Column(name = "time")
    private Date time;

    public int getHisid() {
        return hisid;
    }

    public void setHisid(int hisid) {
        this.hisid = hisid;
    }

    public Integer getBookid() {
        return bookid;
    }

    public void setBookid(Integer bookid) {
        this.bookid = bookid;
    }

    public Integer getReaderid() {
        return readerid;
    }

    public void setReaderid(Integer readerid) {
        this.readerid = readerid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public String getReadername() {
        return readername;
    }

    public void setReadername(String readername) {
        this.readername = readername;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HistoryEntity that = (HistoryEntity) o;

        if (hisid != that.hisid) return false;
        if (bookid != null ? !bookid.equals(that.bookid) : that.bookid != null) return false;
        if (readerid != null ? !readerid.equals(that.readerid) : that.readerid != null) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (bookname != null ? !bookname.equals(that.bookname) : that.bookname != null) return false;
        if (readername != null ? !readername.equals(that.readername) : that.readername != null) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hisid;
        result = 31 * result + (bookid != null ? bookid.hashCode() : 0);
        result = 31 * result + (readerid != null ? readerid.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (bookname != null ? bookname.hashCode() : 0);
        result = 31 * result + (readername != null ? readername.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        return result;
    }
}
