package com.fullcrud.crud.application.service;

import java.util.List;
import java.util.Optional;

import com.fullcrud.crud.domain.entity.Categoria;

public interface CategoriaServiceI {
    List<Categoria> findAll();
    Optional<Categoria> findById(Long id);
    Categoria save(Categoria Categoria);
    Optional<Categoria> update(Long id, Categoria Categoria);
    Optional<Categoria> delete(Long id);

}
