package com.fiap.microservico.supportservice.db;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, UUID> {

    @Query(value = "select t.* from ticket t where t.iduser = ?1", nativeQuery = true)
    List<Ticket> findByIduser(Integer iduser);
}
