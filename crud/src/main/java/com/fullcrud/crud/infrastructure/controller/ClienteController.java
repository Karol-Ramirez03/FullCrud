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

    // @PutMapping("/{id}")
    // public ResponseEntity<?> Update(@RequestBody Cliente cliente,@PathVariable Integer id){
    //     Optional<Cliente> clienteOpt = clienteService.update(id,cliente);
    //     if (clienteOpt.isPresent()) {
            
    //         return ResponseEntity.status(HttpStatus.CREATED).body(clienteOpt.orElseThrow());  
    //     }
    //     return ResponseEntity.notFound().build();

    // }

    @PutMapping("/{id}")
    public Optional<Cliente> update(@PathVariable int id,@RequestBody Cliente cliente) {
        Optional<Cliente> clienteOptional = clienteService.findById(id);
    
        if (clienteOptional.isPresent()) {
            Cliente clienteToUpdate = clienteOptional.get();
    
            if (cliente.getNombre() != null) {
                clienteToUpdate.setNombre(cliente.getNombre());
            }
            if (cliente.getApellidos() != null) {
                clienteToUpdate.setApellidos(cliente.getApellidos());
            }
            if (cliente.getCelular() != 0) {
                clienteToUpdate.setCelular(cliente.getCelular());
            }
            if (cliente.getDireccion() != null) {
                clienteToUpdate.setDireccion(cliente.getDireccion());
            }
            if (cliente.getCorreo() != null) {
                clienteToUpdate.setCorreo(cliente.getCorreo());
            }
            clienteService.update(id, clienteToUpdate);
            return Optional.of(clienteToUpdate);
        }
        return Optional.empty();
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
