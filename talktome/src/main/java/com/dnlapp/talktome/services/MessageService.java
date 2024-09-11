package com.dnlapp.talktome.services;

import com.dnlapp.talktome.dto.MessageDTO;
import com.dnlapp.talktome.entities.Message;
import com.dnlapp.talktome.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepository;

    public List<MessageDTO> getAllMessages() {
        return messageRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MessageDTO getMessageById(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
        return convertToDTO(message);
    }

    public MessageDTO createMessage(MessageDTO messageDTO) {
        Message message = convertToEntity(messageDTO);
        Message savedMessage = messageRepository.save(message);
        return convertToDTO(savedMessage);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    private MessageDTO convertToDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setId(message.getId());
        messageDTO.setContent(message.getContent());
        messageDTO.setSender(message.getSender());
        messageDTO.setSendMessageDate(message.getSendMessageDate());
        messageDTO.setMessageType(message.getMessageType());
        return messageDTO;
    }

    private Message convertToEntity(MessageDTO messageDTO) {
        Message message = new Message();
        message.setContent(messageDTO.getContent());
        message.setSender(messageDTO.getSender());
        message.setMessageType(messageDTO.getMessageType());
        return message;
    }
}
