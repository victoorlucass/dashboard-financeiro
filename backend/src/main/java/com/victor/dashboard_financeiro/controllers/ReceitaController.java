package com.victor.dashboard_financeiro.controllers;

import com.victor.dashboard_financeiro.dto.ReceitaRequestDTO;
import com.victor.dashboard_financeiro.entities.Receita;
import com.victor.dashboard_financeiro.services.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    private final ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        this.receitaService = receitaService;
    }

    @PostMapping
    public Receita cadastrar(@Valid @RequestBody ReceitaRequestDTO dto) {

        Receita receita = new Receita();

        receita.setDescricao(dto.getDescricao());
        receita.setData(dto.getData());
        receita.setValor(dto.getValor());
        receita.setCategoria(dto.getCategoria());

        return receitaService.cadastrar(receita);
    }

    @GetMapping
    public List<Receita> listarTodas() {
        return receitaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Receita buscarPorId(@PathVariable Long id) {
        return receitaService.buscar(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
        receitaService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Receita atualizarPorId(@PathVariable Long id, @Valid @RequestBody ReceitaRequestDTO dto) {
        Receita receita = new Receita();

        receita.setDescricao(dto.getDescricao());
        receita.setData(dto.getData());
        receita.setValor(dto.getValor());
        receita.setCategoria(dto.getCategoria());

        return receitaService.atualizar(id, receita);
    }

}
