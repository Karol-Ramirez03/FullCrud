package com.fullcrud.crud.application.service;

import java.util.List;
import java.util.Optional;

import com.fullcrud.crud.domain.entity.Producto;

public interface ProductoServiceI {
    List<Producto> findAll();
    Optional<Producto> findById(Long id);
    Producto save(Producto producto);
    Optional<Producto> update(Long id, Producto producto);
    Optional<Producto> delete(Long id);
}
