package com.dnlapp.talktome.config;

import com.dnlapp.talktome.entities.MessageType;
import com.dnlapp.talktome.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import com.dnlapp.talktome.dto.MessageDTO;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
private UserService userService;
private final SimpMessageSendingOperations messageTemplate;
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("username");
        if(username != null){
            var chatMessage = MessageDTO.builder()
                    .messageType(MessageType.LEAVE)
                    .sender(userService.getUserByUsername(username))
                    .build();

            messageTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }


}
