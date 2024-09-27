package com.fullcrud.crud.infrastructure.repository.compraProductoRepo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullcrud.crud.domain.entity.CompraProducto;
import com.fullcrud.crud.domain.entity.CompraProductoPk;

@Repository
public interface CompraProductoRepository extends CrudRepository<CompraProducto, CompraProductoPk> {

}
