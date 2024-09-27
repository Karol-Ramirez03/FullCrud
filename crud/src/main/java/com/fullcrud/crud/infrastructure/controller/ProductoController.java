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

import com.fullcrud.crud.application.service.ProductoServiceI;
import com.fullcrud.crud.domain.entity.Producto;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {
    @Autowired
    private ProductoServiceI ProductoServiceI;

    @GetMapping
    public List<Producto> list(){
        return ProductoServiceI.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Long id){
        Optional<Producto> ProductoOpt = ProductoServiceI.findById(id);
        if (ProductoOpt.isPresent()) {
            return ResponseEntity.ok(ProductoOpt.orElseThrow());  
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Producto producto){
        return ResponseEntity.status(HttpStatus.CREATED).body(ProductoServiceI.save(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> Update(@RequestBody Producto producto,@PathVariable Long id){
        Optional<Producto> ProductoOpt = ProductoServiceI.delete(id);
        if (ProductoOpt.isPresent()) {
            return ResponseEntity.ok(ProductoOpt.orElseThrow());  
        }
        return ResponseEntity.notFound().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Producto> ProductoOptional = ProductoServiceI.delete(id);
        if (ProductoOptional.isPresent()) {
            return ResponseEntity.ok(ProductoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    } 

}
