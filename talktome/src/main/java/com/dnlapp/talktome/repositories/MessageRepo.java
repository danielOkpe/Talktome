package com.dnlapp.talktome.repositories;

import com.dnlapp.talktome.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message, Long> {
    public List<Message> findAllBySenderId(long id);
}
