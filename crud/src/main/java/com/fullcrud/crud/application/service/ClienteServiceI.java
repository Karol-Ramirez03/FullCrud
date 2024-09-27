package com.fullcrud.crud.application.service;

import java.util.List;
import java.util.Optional;

import com.fullcrud.crud.domain.entity.Cliente;


public interface ClienteServiceI {
    List<Cliente> findAll();
    Optional<Cliente> findById(Integer id);
    Cliente save(Cliente Cliente);
    Optional<Cliente> update(Integer id, Cliente Cliente);
    Optional<Cliente> delete(Integer id);
}
