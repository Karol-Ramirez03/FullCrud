package com.fullcrud.crud.infrastructure.repository.categoriasRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fullcrud.crud.application.service.CategoriaServiceI;
import com.fullcrud.crud.domain.entity.Categoria;


@Service
public class CategoriaImplementacion implements CategoriaServiceI {

    @Autowired
    private CategoriaRepositoryI categoriaRepositoryI;

    @Transactional(readOnly = true)
    @Override
    public List<Categoria> findAll() {
       return ((List<Categoria>) categoriaRepositoryI.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Categoria> findById(Long id) {
        return categoriaRepositoryI.findById(id);
    }

    // @Transactional(readOnly = true)
    @Override
    public Categoria save(Categoria categoria) {
        return categoriaRepositoryI.save(categoria);
    }

    @Override
    public Optional<Categoria> update(Long id, Categoria categoria) {
        Optional<Categoria> categoriaId = categoriaRepositoryI.findById(id);
        if (categoriaId.isPresent()) {
            Categoria categoriaCopy = categoriaId.orElseThrow();
            categoriaCopy.setNombre(categoria.getNombre());
            categoriaCopy.setEstado(categoria.getEstado());
            return Optional.of(categoriaRepositoryI.save(categoriaCopy));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Categoria> delete(Long id) {
        Optional<Categoria> categoriaId = categoriaRepositoryI.findById(id);
        categoriaId.ifPresent( c -> {
            categoriaRepositoryI.delete(c);
        });
        return categoriaId;
    }

    
} 
