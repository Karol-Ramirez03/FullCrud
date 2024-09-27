package com.fullcrud.crud.infrastructure.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullcrud.crud.application.service.ClienteServiceI;
import com.fullcrud.crud.domain.entity.Cliente;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ClienteServiceI clienteService;

    @GetMapping
    public List<Cliente> list(){
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id){
        Optional<Cliente> clienteOpt = clienteService.findById(id);
        if (clienteOpt.isPresent()) {
            return ResponseEntity.ok(clienteOpt.orElseThrow());  
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.save(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> Update(@RequestBody Cliente cliente,@PathVariable Integer id){
        Optional<Cliente> clienteOpt = clienteService.delete(id);
        if (clienteOpt.isPresent()) {
            return ResponseEntity.ok(clienteOpt.orElseThrow());  
        }
        return ResponseEntity.notFound().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Cliente> ClienteOptional = clienteService.delete(id);
        if (ClienteOptional.isPresent()) {
            return ResponseEntity.ok(ClienteOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
}
