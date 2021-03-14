package com.fiap.microservico.supportservice;

import java.util.UUID;

import com.fiap.microservico.supportservice.db.Ticket;
import com.fiap.microservico.supportservice.db.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/v1/support/ticket")
public class SupportTicketController {
    @Autowired
    private TicketRepository ticketRepository;
    
    @PostMapping
    public @ResponseBody String NewTicket(String userId, String description) {
        Ticket newTicket = new Ticket();
        newTicket.setIduser(UUID.fromString(userId));
        newTicket.setDescription(description);
        ticketRepository.save(newTicket);        

        return new String("Saved");
    }

    @GetMapping
    public @ResponseBody Iterable<Ticket> ListTickets() {
        return ticketRepository.findAll();
    }

}
