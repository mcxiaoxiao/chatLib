package com.main.schema;

import javax.persistence.*;

@Entity
@Table(name = "library", schema = "public", catalog = "library")
public class LibraryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "libid")
    private int libid;
    @Basic
    @Column(name = "libname")
    private String libname;
    @Basic
    @Column(name = "libplace")
    private String libplace;
    @Basic
    @Column(name = "libtele")
    private String libtele;

    public int getLibid() {
        return libid;
    }

    public void setLibid(int libid) {
        this.libid = libid;
    }

    public String getLibname() {
        return libname;
    }

    public void setLibname(String libname) {
        this.libname = libname;
    }

    public String getLibplace() {
        return libplace;
    }

    public void setLibplace(String libplace) {
        this.libplace = libplace;
    }

    public String getLibtele() {
        return libtele;
    }

    public void setLibtele(String libtele) {
        this.libtele = libtele;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        LibraryEntity that = (LibraryEntity) o;

        if (libid != that.libid) return false;
        if (libname != null ? !libname.equals(that.libname) : that.libname != null) return false;
        if (libplace != null ? !libplace.equals(that.libplace) : that.libplace != null) return false;
        if (libtele != null ? !libtele.equals(that.libtele) : that.libtele != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = libid;
        result = 31 * result + (libname != null ? libname.hashCode() : 0);
        result = 31 * result + (libplace != null ? libplace.hashCode() : 0);
        result = 31 * result + (libtele != null ? libtele.hashCode() : 0);
        return result;
    }
}
