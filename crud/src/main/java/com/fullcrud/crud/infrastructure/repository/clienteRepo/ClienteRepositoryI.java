package com.fullcrud.crud.infrastructure.repository.clienteRepo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullcrud.crud.domain.entity.Cliente;

@Repository
public interface ClienteRepositoryI extends CrudRepository<Cliente,Integer>{

}
