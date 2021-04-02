package com.fiap.microservico.supportservice;

import java.util.Optional;
import java.util.UUID;

import com.fiap.microservico.supportservice.db.Ticket;
import com.fiap.microservico.supportservice.db.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping(path="/api/v1/support/ticket")
public class SupportTicketController {
    @Autowired
    private TicketRepository ticketRepository;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Ticket NewTicket(@RequestBody Ticket ticket) {
        Ticket newTicket = new Ticket();
        newTicket.setIduser(ticket.getIduser());
        newTicket.setDescription(ticket.getDescription());        

        return ticketRepository.save(newTicket);
    }

    @GetMapping
    public @ResponseBody Iterable<Ticket> ListTickets(@RequestParam(required = false) Integer iduser) {    
        return iduser != null ? ticketRepository.findByIduser(iduser) : ticketRepository.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Optional<Ticket> GetTicket(@PathVariable UUID id) {    
        Optional<Ticket> ticket = ticketRepository.findById(id);

        if (!ticket.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }

        return ticket;
    }
}
