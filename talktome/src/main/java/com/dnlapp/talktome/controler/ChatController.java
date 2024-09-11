package com.dnlapp.talktome.controler;

import com.dnlapp.talktome.dto.MessageDTO;
import com.dnlapp.talktome.dto.UserDTO;
import com.dnlapp.talktome.entities.User;
import com.dnlapp.talktome.services.MessageService;
import com.dnlapp.talktome.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Objects;

@Controller
@CrossOrigin
public class ChatController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public MessageDTO sendMessage(@Payload MessageDTO messageDTO) {
        messageService.createMessage(messageDTO);
        return messageDTO;
    }

    @MessageMapping("/chat.registerUser")
    @SendTo("/topic/public")
    public MessageDTO registerUser(
            @Payload MessageDTO messageDTO,
            SimpMessageHeaderAccessor headerAccessor

    ) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", messageDTO.getSender());
        User user = messageDTO.getSender();
        UserDTO userDTO = userService.convertToDTO(user);
        userService.createUser(userDTO);
        return  messageDTO;
       // return userService.getAllUsers();

    }

    @MessageMapping("/chat.loginUser")
    @SendTo("/topic/public")
    public UserDTO loginUser(
            @Payload MessageDTO messageDTO,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", messageDTO.getSender());

return userService.convertToDTO(messageDTO.getSender());
    }
}
