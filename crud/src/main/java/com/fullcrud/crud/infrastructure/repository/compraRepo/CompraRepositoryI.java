package com.fullcrud.crud.infrastructure.repository.compraRepo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fullcrud.crud.domain.entity.Compra;

@Repository
public interface CompraRepositoryI extends CrudRepository<Compra,Long>{

}
