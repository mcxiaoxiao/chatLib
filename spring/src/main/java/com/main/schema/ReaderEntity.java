package com.main.schema;

import javax.persistence.*;

@Entity
@Table(name = "reader", schema = "public", catalog = "library")
public class ReaderEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "userid")
    private int userid;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "readername")
    private String readername;
    @Basic
    @Column(name = "readersex")
    private String readersex;
    @Basic
    @Column(name = "readertype")
    private String readertype;
    @Basic
    @Column(name = "admin")
    private String admin;
    @Basic
    @Column(name = "password")
    private String password;
    @Basic
    @Column(name = "role")
    private Integer role;

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getReadername() {
        return readername;
    }

    public void setReadername(String readername) {
        this.readername = readername;
    }

    public String getReadersex() {
        return readersex;
    }

    public void setReadersex(String readersex) {
        this.readersex = readersex;
    }

    public String getReadertype() {
        return readertype;
    }

    public void setReadertype(String readertype) {
        this.readertype = readertype;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReaderEntity that = (ReaderEntity) o;

        if (userid != that.userid) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (readername != null ? !readername.equals(that.readername) : that.readername != null) return false;
        if (readersex != null ? !readersex.equals(that.readersex) : that.readersex != null) return false;
        if (readertype != null ? !readertype.equals(that.readertype) : that.readertype != null) return false;
        if (admin != null ? !admin.equals(that.admin) : that.admin != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (role != null ? !role.equals(that.role) : that.role != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userid;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (readername != null ? readername.hashCode() : 0);
        result = 31 * result + (readersex != null ? readersex.hashCode() : 0);
        result = 31 * result + (readertype != null ? readertype.hashCode() : 0);
        result = 31 * result + (admin != null ? admin.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        return result;
    }
}
