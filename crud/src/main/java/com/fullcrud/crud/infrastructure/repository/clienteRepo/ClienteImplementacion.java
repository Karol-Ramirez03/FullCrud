package com.fullcrud.crud.infrastructure.repository.clienteRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fullcrud.crud.application.service.ClienteServiceI;
import com.fullcrud.crud.domain.entity.Cliente;


@Service
public class ClienteImplementacion implements ClienteServiceI{

    @Autowired
    private ClienteRepositoryI clienteRepositoryI;

    @Transactional(readOnly = true)
    @Override
    public List<Cliente> findAll() {
        return ((List<Cliente>) clienteRepositoryI.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Cliente> findById(Integer id) {
        return clienteRepositoryI.findById(id);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteRepositoryI.save(cliente);
    }

    @Override
    public Optional<Cliente> update(Integer id, Cliente Cliente) {
        Optional<Cliente> clienteId = clienteRepositoryI.findById(id);
        if (clienteId.isPresent()) {
            Cliente clienteCopy = clienteId.orElseThrow();
            clienteCopy.setNombre(clienteCopy.getNombre());
            clienteCopy.setApellidos(clienteCopy.getApellidos());
            clienteCopy.setCelular(clienteCopy.getCelular());
            clienteCopy.setDireccion(clienteCopy.getDireccion());
            clienteCopy.setCorreo(clienteCopy.getCorreo());

            return Optional.of(clienteRepositoryI.save(clienteCopy));
            
        }

        return Optional.empty();
    }

    @Override
    public Optional<Cliente> delete(Integer id) {
        Optional<Cliente> clienteId = clienteRepositoryI.findById(id);
        clienteId.ifPresent( c -> {
            clienteRepositoryI.delete(c);
        });
        return clienteId;
    }

}
