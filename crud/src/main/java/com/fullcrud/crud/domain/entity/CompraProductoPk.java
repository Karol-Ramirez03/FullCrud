package com.fullcrud.crud.domain.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class CompraProductoPk implements Serializable{

    private Long idCompra;

    private Long idProducto;


}
