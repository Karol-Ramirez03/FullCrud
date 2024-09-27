package com.fullcrud.crud.infrastructure.repository.productoRepo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullcrud.crud.domain.entity.Producto;

@Repository
public interface ProductoRepositoryI extends CrudRepository<Producto, Long> {

}
