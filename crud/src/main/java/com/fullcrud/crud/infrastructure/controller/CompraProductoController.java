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

import com.fullcrud.crud.application.service.CompraProductoServiceI;
import com.fullcrud.crud.domain.entity.CompraProducto;
import com.fullcrud.crud.domain.entity.CompraProductoPk;

@RestController
@RequestMapping("/api/compraproducto")
public class CompraProductoController {

    @Autowired
    private CompraProductoServiceI compraProductoServiceI;

    @GetMapping
    public List<CompraProducto> list() {
        return compraProductoServiceI.findAll();
    }

    @GetMapping("/{idCompra}/{idProducto}")
    public ResponseEntity<?> view(@PathVariable Long idCompra, @PathVariable Long idProducto) {
        CompraProductoPk id = new CompraProductoPk(idCompra, idProducto);
        Optional<CompraProducto> compraProductoOptional = compraProductoServiceI.findById(id);
        if (compraProductoOptional.isPresent()) {
            return ResponseEntity.ok(compraProductoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CompraProducto compraProducto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraProductoServiceI.save(compraProducto));
    }

    // @PutMapping("/{idCompra}/{idProducto}")
    // public ResponseEntity<?> update(@RequestBody CompraProducto compraProducto, @PathVariable Long idCompra, @PathVariable Long idProducto) {
    //     CompraProductoPk id = new CompraProductoPk(idCompra, idProducto);
    //     Optional<CompraProducto> compraProductoOptional = compraProductoServiceI.update(id, compraProducto);
    //     if (compraProductoOptional.isPresent()) {
    //         return ResponseEntity.status(HttpStatus.CREATED).body(compraProductoOptional.orElseThrow());
    //     }
    //     return ResponseEntity.notFound().build();
    // }
    @PutMapping("/{idCompra}/{idProducto}")
    public Optional<CompraProducto> update(@PathVariable Long idCompra, @PathVariable Long idProducto, @RequestBody CompraProducto compraProducto){
        CompraProductoPk id = new CompraProductoPk(idCompra, idProducto);
        Optional<CompraProducto> compranew = compraProductoServiceI.findById(id);
        if (compranew.isPresent()) {
            CompraProducto compraProductoCopy = compranew.get();
            if (compraProducto.getCantidad() != 0) {
                compraProductoCopy.setCantidad(compraProducto.getCantidad());
            }
            if (compraProducto.getEstado() != null) {
                compraProductoCopy.setEstado(compraProducto.getEstado());
            }
            if (compraProducto.getTotal() != 0) {
                compraProductoCopy.setTotal(compraProducto.getTotal());
            }

            compraProductoServiceI.update(id, compraProductoCopy);
            return Optional.of(compraProductoCopy);
            
        }
        return Optional.empty();

    }

    @DeleteMapping("/{idCompra}/{idProducto}")
    public ResponseEntity<?> delete(@PathVariable Long idCompra, @PathVariable Long idProducto) {
        CompraProductoPk id = new CompraProductoPk(idCompra, idProducto);
        Optional<CompraProducto> compraProductoOptional = compraProductoServiceI.delete(id);
        if (compraProductoOptional.isPresent()) {
            return ResponseEntity.ok(compraProductoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }


}
