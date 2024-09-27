package com.fullcrud.crud.infrastructure.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullcrud.crud.application.service.CategoriaServiceI;
import com.fullcrud.crud.domain.entity.Categoria;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaServiceI categoriaService;

    @GetMapping
    public List<Categoria> list() {
        return categoriaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Long id) {
        Optional<Categoria> CategoriaOptional = categoriaService.findById(id);
        if (CategoriaOptional.isPresent()) {
            return ResponseEntity.ok(CategoriaOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.save(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Categoria Categoria, @PathVariable Long id) {
        Optional<Categoria> CategoriaOptional = categoriaService.update(id, Categoria);
        if (CategoriaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(CategoriaOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Categoria> CategoriaOptional = categoriaService.delete(id);
        if (CategoriaOptional.isPresent()) {
            return ResponseEntity.ok(CategoriaOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
}
