package com.fullcrud.crud.application.service;

import java.util.List;
import java.util.Optional;

import com.fullcrud.crud.domain.entity.Compra;

public interface CompraServiceI {
    List<Compra> findAll();
    Optional<Compra> findById(Long id);
    Compra save(Compra compra);
    Optional<Compra> update(Long id, Compra compra);
    Optional<Compra> delete(Long id);
}
