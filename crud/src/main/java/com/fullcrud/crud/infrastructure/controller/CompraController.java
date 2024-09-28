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

import com.fullcrud.crud.application.service.CompraServiceI;
import com.fullcrud.crud.domain.entity.Compra;

@RestController
@RequestMapping("/api/compra")
public class CompraController {

    @Autowired
    private CompraServiceI compraServiceI;

    @GetMapping
    public List<Compra> list(){
        return compraServiceI.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Long id){
        Optional<Compra> CompraOpt = compraServiceI.findById(id);
        if (CompraOpt.isPresent()) {
            return ResponseEntity.ok(CompraOpt.orElseThrow());  
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Compra Compra){
        return ResponseEntity.status(HttpStatus.CREATED).body(compraServiceI.save(Compra));
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> Update(@RequestBody Compra Compra,@PathVariable Long id){
    //     Optional<Compra> CompraOpt = compraServiceI.delete(id);
    //     if (CompraOpt.isPresent()) {
    //         return ResponseEntity.ok(CompraOpt.orElseThrow());  
    //     }
    //     return ResponseEntity.notFound().build();

    // }
    
    @PutMapping("/{id}")
    public Optional<Compra> update(@PathVariable Long id,@RequestBody Compra compra){
        Optional<Compra> CompraOpt = compraServiceI.findById(id);
        if (CompraOpt.isPresent()) {
            Compra compraCopy = CompraOpt.get();
            if (compra.getFecha() != null) {
                compraCopy.setFecha(compra.getFecha());
            }
            if (compra.getMedio_pago() != null) {
                compraCopy.setMedio_pago(compra.getMedio_pago());
            }
            if (compra.getComentario() != null) {
                compraCopy.setComentario(compra.getComentario());
            }
            if (compra.getEstado() != null) {
                compraCopy.setEstado(compra.getEstado());
            }
            if (compra.getCliente() != null) {
                compraCopy.setCliente(compra.getCliente());
            }


            compraServiceI.update(id, compraCopy);
            return Optional.of(compraCopy);
            
        }
        return Optional.empty();


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Compra> CompraOptional = compraServiceI.delete(id);
        if (CompraOptional.isPresent()) {
            return ResponseEntity.ok(CompraOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    } 

}
