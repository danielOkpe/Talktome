package com.dnlapp.talktome.services;

import com.dnlapp.talktome.dto.UserDTO;
import com.dnlapp.talktome.entities.User;
import com.dnlapp.talktome.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<UserDTO> getAllUsers() {
        return userRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }
    public User getUserByUsername(String username) {
        if(userRepo.findByUsername(username) != null){
            return userRepo.findByUsername(username);
        }else{
            throw new RuntimeException("User not found with username: " + username);
        }

    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        User savedUser = userRepo.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {

      User user = userRepo.findById(id)
              .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
      if(Objects.equals(user.getRole(), userDTO.getRole())){
          //user.setMessages(userDTO.getMessages());
          user.setPassword(userDTO.getPassword());
          user.setUsername(userDTO.getUsername());

         User updateUser = userRepo.save(user);
         return convertToDTO(updateUser);
      }else{
          throw new RuntimeException("Wrong role");
      }

      
    }

    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }

    public UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setRole(user.getRole());
        userDTO.setPassword(user.getPassword());
        userDTO.setMessages(user.getMessages());
        return userDTO;
    }

    public User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setRole(userDTO.getRole());
        user.setPassword(userDTO.getPassword());
       user.setMessages(userDTO.getMessages());
        return user;
    }
}
