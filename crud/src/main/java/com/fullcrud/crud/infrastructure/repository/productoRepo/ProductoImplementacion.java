package com.fullcrud.crud.infrastructure.repository.productoRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullcrud.crud.application.service.ProductoServiceI;
import com.fullcrud.crud.domain.entity.Producto;

@Service
public class ProductoImplementacion implements ProductoServiceI{

    @Autowired
    private ProductoRepositoryI productoRepositoryI;

    @Override
    public List<Producto> findAll() {
        return ((List<Producto>) productoRepositoryI.findAll());
    }

    @Override
    public Optional<Producto> findById(Long id) {
        return productoRepositoryI.findById(id);
    }

    @Override
    public Producto save(Producto producto) {
        return productoRepositoryI.save(producto);
    }

    @Override
    public Optional<Producto> update(Long id, Producto producto) {
        Optional<Producto> productoId = productoRepositoryI.findById(id);
        if (productoId.isPresent()) {
            Producto productoCopy = productoId.orElseThrow();
            productoCopy.setCantidad(producto.getCantidad());
            productoCopy.setCategoria(producto.getCategoria());
            productoCopy.setEstado(producto.getEstado());
            productoCopy.setCodigo_barras(producto.getCodigo_barras());
            productoCopy.setPrecio_venta(producto.getPrecio_venta());
            productoCopy.setNombre(producto.getNombre());

            return Optional.of(productoCopy);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Producto> delete(Long id) {
        Optional<Producto> productoId = productoRepositoryI.findById(id);
        productoId.ifPresent( p -> {
            productoRepositoryI.delete(p);
        });
        return productoId;

    }

}
