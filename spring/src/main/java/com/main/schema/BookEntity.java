package com.main.schema;

import javax.persistence.*;

@Entity
@Table(name = "book", schema = "public", catalog = "library")
public class BookEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "bookid")
    private int bookid;
    @Basic
    @Column(name = "author")
    private String author;
    @Basic
    @Column(name = "level")
    private Integer level;
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "borrowed")
    private Boolean borrowed;
    @Basic
    @Column(name = "isbn")
    private String isbn;
    @Basic
    @Column(name = "libid")
    private Integer libid;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "price")
    private Double price;
    @Basic
    @Column(name = "publisher")
    private String publisher;
    @Basic
    @Column(name = "libname")
    private String libname;
    @Basic
    @Column(name = "content")
    private String content;

    public int getBookid() {
        return bookid;
    }

    public void setBookid(int bookid) {
        this.bookid = bookid;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getBorrowed() {
        return borrowed;
    }

    public void setBorrowed(Boolean borrowed) {
        this.borrowed = borrowed;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getLibid() {
        return libid;
    }

    public void setLibid(Integer libid) {
        this.libid = libid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getLibname() {
        return libname;
    }

    public void setLibname(String libname) {
        this.libname = libname;
    }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookEntity that = (BookEntity) o;

        if (bookid != that.bookid) return false;
        if (author != null ? !author.equals(that.author) : that.author != null) return false;
        if (level != null ? !level.equals(that.level) : that.level != null) return false;
        if (type != null ? !type.equals(that.type) : that.type != null) return false;
        if (borrowed != null ? !borrowed.equals(that.borrowed) : that.borrowed != null) return false;
        if (isbn != null ? !isbn.equals(that.isbn) : that.isbn != null) return false;
        if (libid != null ? !libid.equals(that.libid) : that.libid != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (publisher != null ? !publisher.equals(that.publisher) : that.publisher != null) return false;
        if (libname != null ? !libname.equals(that.libname) : that.libname != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = bookid;
        result = 31 * result + (author != null ? author.hashCode() : 0);
        result = 31 * result + (level != null ? level.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (borrowed != null ? borrowed.hashCode() : 0);
        result = 31 * result + (isbn != null ? isbn.hashCode() : 0);
        result = 31 * result + (libid != null ? libid.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (publisher != null ? publisher.hashCode() : 0);
        result = 31 * result + (libname != null ? libname.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }


}
