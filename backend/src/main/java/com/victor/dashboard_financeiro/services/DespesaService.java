package com.victor.dashboard_financeiro.services;

import com.victor.dashboard_financeiro.entities.Despesa;
import com.victor.dashboard_financeiro.repositories.DespesaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class DespesaService {

    private final DespesaRepository despesaRepository;

    public DespesaService(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    public Despesa cadastrar(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public Despesa buscar(Long id) {
        return despesaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Despesa não encontrada!"
                ));
    }

    public List<Despesa> listarTodas() {
        return despesaRepository.findAll();
    }

    public void excluir(Long id) {
        buscar(id);
        despesaRepository.deleteById(id);
    }

    public Despesa atualizar(Long id, Despesa novosDados) {
        Despesa despesaExistente = buscar(id);

        despesaExistente.setDescricao(novosDados.getDescricao());
        despesaExistente.setValor(novosDados.getValor());
        despesaExistente.setData(novosDados.getData());
        despesaExistente.setCategoria(novosDados.getCategoria());

        return despesaRepository.save(despesaExistente);
    }

    public BigDecimal somaTotal() {
        return Objects.requireNonNullElse(
                despesaRepository.somaTotalDespesas(),
                BigDecimal.ZERO
        );
    }

    public BigDecimal somaTotalPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        return Objects.requireNonNullElse(
                despesaRepository.somarDespesasPorPeriodo(dataInicio, dataFim),
                BigDecimal.ZERO
        );
    }
}
