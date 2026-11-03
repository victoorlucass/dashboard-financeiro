package com.victor.dashboard_financeiro.services;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.victor.dashboard_financeiro.entities.Receita;
import com.victor.dashboard_financeiro.repositories.ReceitaRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class ReceitaService {
    private final ReceitaRepository receitaRepository;

    public ReceitaService(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    public Receita cadastrar(Receita receita) {
        return receitaRepository.save(receita);
    }

    public Receita buscar(Long id) {
        return receitaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Receita não encontrada!"
                ));

    }

    public List<Receita> listarTodas() {
        return receitaRepository.findAll();
    }

    public void excluir(Long id) {
       buscar(id);
       receitaRepository.deleteById(id);
    }

    public Receita atualizar(Long id, Receita novosDados) {
        Receita receitaExistente = buscar(id);

        receitaExistente.setDescricao(novosDados.getDescricao());
        receitaExistente.setValor(novosDados.getValor());
        receitaExistente.setData(novosDados.getData());
        receitaExistente.setCategoria(novosDados.getCategoria());

        return receitaRepository.save(receitaExistente);
    }

    public BigDecimal somaTotal() {
        return Objects.requireNonNullElse(
                receitaRepository.somaTotalReceitas(),
                BigDecimal.ZERO
        );
    }

    public BigDecimal somaTotalPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        return Objects.requireNonNullElse(
                receitaRepository.somarReceitasPorPeriodo(dataInicio, dataFim),
                BigDecimal.ZERO
        );
    }
}
