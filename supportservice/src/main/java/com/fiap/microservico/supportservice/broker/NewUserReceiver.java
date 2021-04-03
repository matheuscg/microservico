package com.fiap.microservico.supportservice.broker;

import com.fiap.microservico.supportservice.db.User;
import com.fiap.microservico.supportservice.db.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.CountDownLatch;

@Component
public class NewUserReceiver {
    private CountDownLatch latch = new CountDownLatch(1);

    @Autowired
    private UserRepository users;

    public void receiveMessage(byte[] message) {
        String newUserString = new String(message, StandardCharsets.UTF_8);
        System.out.println("Received <" + newUserString + ">");
        JSONObject newUserObject = new JSONObject(newUserString);
        User newUser = new User();
        try {
            newUser.setId(newUserObject.getNumber("id").intValue());
            newUser.setName(newUserObject.getString("name"));
            users.save(newUser);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        latch.countDown();
    }

    public CountDownLatch getLatch() {
        return latch;
    }
}
