package com.fullcrud.crud.infrastructure.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullcrud.crud.application.service.CompraProductoServiceI;

@RestController
@RequestMapping("/api/compra-Producto")
public class CompraProductoController {

    @Autowired
    private CompraProductoServiceI compraProductoServiceI;

    

}
