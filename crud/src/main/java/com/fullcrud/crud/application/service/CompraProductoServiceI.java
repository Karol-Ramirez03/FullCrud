package com.fullcrud.crud.application.service;

import java.util.List;
import java.util.Optional;

import com.fullcrud.crud.domain.entity.CompraProducto;
import com.fullcrud.crud.domain.entity.CompraProductoPk;

public interface CompraProductoServiceI {
    List<CompraProducto> findAll();
    Optional<CompraProducto> findById(CompraProductoPk id);
    CompraProducto save(CompraProducto compraProducto);
    Optional<CompraProducto> update(CompraProductoPk id, CompraProducto compraProducto);
    Optional<CompraProducto> delete(CompraProductoPk id);
}
