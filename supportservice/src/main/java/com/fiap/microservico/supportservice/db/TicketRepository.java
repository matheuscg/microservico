package com.fiap.microservico.supportservice.db;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, UUID> {
    
}
