package com.fullcrud.crud.infrastructure.repository.categoriasRepo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullcrud.crud.domain.entity.Categoria;

@Repository
public interface CategoriaRepositoryI extends CrudRepository<Categoria,Long> {

    
} 
