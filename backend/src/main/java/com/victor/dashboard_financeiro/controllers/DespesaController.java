package com.victor.dashboard_financeiro.controllers;

import com.victor.dashboard_financeiro.dto.DespesaRequestDTO;
import com.victor.dashboard_financeiro.entities.Despesa;
import com.victor.dashboard_financeiro.services.DespesaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/despesas")
public class DespesaController {

    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    @PostMapping
    public Despesa cadastrar(@Valid @RequestBody DespesaRequestDTO dto) {

        Despesa despesa = new Despesa();

        despesa.setDescricao(dto.getDescricao());
        despesa.setData(dto.getData());
        despesa.setValor(dto.getValor());
        despesa.setCategoria(dto.getCategoria());

        return despesaService.cadastrar(despesa);
    }

    @GetMapping
    public List<Despesa> listarTodas() {
        return despesaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Despesa buscarPorId(@PathVariable Long id) {
        return despesaService.buscar(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
        despesaService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Despesa atualizarPorId(@PathVariable Long id, @Valid @RequestBody DespesaRequestDTO dto) {
        Despesa despesa = new Despesa();

        despesa.setDescricao(dto.getDescricao());
        despesa.setData(dto.getData());
        despesa.setValor(dto.getValor());
        despesa.setCategoria(dto.getCategoria());

        return despesaService.atualizar(id, despesa);
    }

}
