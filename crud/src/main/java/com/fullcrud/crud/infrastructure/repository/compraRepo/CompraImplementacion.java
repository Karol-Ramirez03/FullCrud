package com.fullcrud.crud.infrastructure.repository.compraRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fullcrud.crud.application.service.CompraServiceI;
import com.fullcrud.crud.domain.entity.Compra;

@Service
public class CompraImplementacion implements CompraServiceI {

    @Autowired 
    private CompraRepositoryI compraRepositoryI;

    @Transactional(readOnly = true)
    @Override
    public List<Compra> findAll() {
        return ((List<Compra>) compraRepositoryI.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Compra> findById(Long id) {
        return compraRepositoryI.findById(id);
    }

    @Override
    public Compra save(Compra compra) {
        return compraRepositoryI.save(compra);
    }

    @Override
    public Optional<Compra> update(Long id, Compra compra) {
        Optional<Compra> compraId = compraRepositoryI.findById(id);
        if (compraId.isPresent()) {
            Compra compra2 = compraId.orElseThrow();
            compra2.setComentario(compra.getComentario());
            compra2.setEstado(compra.getEstado());
            compra2.setMedio_pago(compra.getMedio_pago());

            return Optional.of(compraRepositoryI.save(compra2));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Compra> delete(Long id) {
        Optional<Compra> compraId = compraRepositoryI.findById(id);
        compraId.ifPresent( co -> {
            compraRepositoryI.delete(co);
        });
        return compraId;

    }

}
