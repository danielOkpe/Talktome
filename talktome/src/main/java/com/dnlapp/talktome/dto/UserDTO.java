package com.dnlapp.talktome.dto;

import com.dnlapp.talktome.entities.Message;
import com.dnlapp.talktome.entities.Statu;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String role;
    private List<Message> messages;
}
