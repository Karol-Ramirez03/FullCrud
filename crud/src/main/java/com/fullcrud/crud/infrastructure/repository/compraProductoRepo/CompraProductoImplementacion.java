package com.fullcrud.crud.infrastructure.repository.compraProductoRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fullcrud.crud.application.service.CompraProductoServiceI;
import com.fullcrud.crud.domain.entity.CompraProducto;
import com.fullcrud.crud.domain.entity.CompraProductoPk;

@Service
public class CompraProductoImplementacion implements CompraProductoServiceI {

    @Autowired
    private CompraProductoRepository compraProductoRepositoryI;

    @Transactional(readOnly = true)
    @Override
    public List<CompraProducto> findAll() {
        return (List<CompraProducto>) compraProductoRepositoryI.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<CompraProducto> findById(CompraProductoPk id) {
        return compraProductoRepositoryI.findById(id);
    }

    @Override
    public CompraProducto save(CompraProducto compraProducto) {
        return compraProductoRepositoryI.save(compraProducto);
    }

     @Override
    public Optional<CompraProducto> update(CompraProductoPk id, CompraProducto compraProducto) {
        Optional<CompraProducto> compraProductoOptional = compraProductoRepositoryI.findById(id);
        if (compraProductoOptional.isPresent()) {
            CompraProducto compraProductoCopy = compraProductoOptional.orElseThrow();
            compraProductoCopy.setCantidad(compraProducto.getCantidad());
            compraProductoCopy.setTotal(compraProducto.getTotal());
            compraProductoCopy.setEstado(compraProducto.getEstado());
            return Optional.of(compraProductoRepositoryI.save(compraProductoCopy));
        }
        return Optional.empty();
    }

    @Override
    public Optional<CompraProducto> delete(CompraProductoPk id) {
        Optional<CompraProducto> compraProductoOptional = compraProductoRepositoryI.findById(id);
        compraProductoOptional.ifPresent(cP -> {
            compraProductoRepositoryI.delete(cP);
        });
        return compraProductoOptional;
    }

}
