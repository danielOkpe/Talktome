package com.dnlapp.talktome.dto;

import com.dnlapp.talktome.entities.MessageType;
import com.dnlapp.talktome.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDTO {
    private Long id;
    private User sender;
    private String content;
    private MessageType messageType;
    private LocalDateTime sendMessageDate;
}
