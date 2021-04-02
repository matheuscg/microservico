package com.fiap.microservico.supportservice.db;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

@Entity
public class Ticket {
    @Id
    @Type(type="uuid-char")
    @Column(length = 36)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private Integer iduser;

    private Integer status;

    private String description;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }
    
    public Integer getIduser() {
        return iduser;
    }
}
