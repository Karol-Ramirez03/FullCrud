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

    // @PutMapping("/{id}")
    // public ResponseEntity<?> Update(@RequestBody Producto producto,@PathVariable Long id){
    //     Optional<Producto> ProductoOpt = ProductoServiceI.delete(id);
    //     if (ProductoOpt.isPresent()) {
    //         return ResponseEntity.ok(ProductoOpt.orElseThrow());  
    //     }
    //     return ResponseEntity.notFound().build();

    // }

    @PutMapping("/{id}")
    public Optional<Producto> update(@PathVariable Long id, @RequestBody Producto producto) {
        Optional<Producto> productoOptional = ProductoServiceI.findById(id);

        if (productoOptional.isPresent()) {
            Producto productoToUpdate = productoOptional.get();
            System.out.println(producto.getNombre());
            System.out.println(producto.getPrecio_venta());
            System.out.println(producto.getCantidad());
            System.out.println(producto.getEstado());
            System.out.println(producto.getCategoria());
            if (producto.getNombre() != null) {
                productoToUpdate.setNombre(producto.getNombre());
            }
            if (producto.getPrecio_venta() != null) { 
                productoToUpdate.setPrecio_venta(producto.getPrecio_venta());
            }
            if (producto.getCantidad() != 0) { 
                productoToUpdate.setCantidad(producto.getCantidad());
            }
            if (producto.getEstado() != null) { 
                productoToUpdate.setEstado(producto.getEstado());
            }

            if (producto.getCategoria() != null) {
                productoToUpdate.setCategoria(producto.getCategoria());
            }
            if (producto.getCodigo_barras() != null) {
                productoToUpdate.setCodigo_barras(producto.getCodigo_barras());
            }

            ProductoServiceI.update(id, productoToUpdate);
            return Optional.of(productoToUpdate);
        }
        return Optional.empty();
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
