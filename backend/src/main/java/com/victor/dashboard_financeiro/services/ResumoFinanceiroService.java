package com.victor.dashboard_financeiro.services;

import com.victor.dashboard_financeiro.dto.HistoricoMensalDTO;
import com.victor.dashboard_financeiro.dto.ResumoFinanceiroDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResumoFinanceiroService {

    private final ReceitaService receitaService;
    private final DespesaService despesaService;

    public ResumoFinanceiroService(
        ReceitaService receitaService,
        DespesaService despesaService) {
        this.receitaService = receitaService;
        this.despesaService = despesaService;
    }

    public ResumoFinanceiroDTO gerarResumo() {
        BigDecimal totalReceitas = receitaService.somaTotal();

        BigDecimal totalDespesas = despesaService.somaTotal();

        BigDecimal saldo = totalReceitas.subtract(totalDespesas);

        return new ResumoFinanceiroDTO(totalReceitas, totalDespesas, saldo);
    }

    public ResumoFinanceiroDTO gerarResumoPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        BigDecimal totalReceitasPorPeriodo = receitaService.somaTotalPorPeriodo(dataInicio, dataFim);

        BigDecimal totalDespesasPorPeriodo = despesaService.somaTotalPorPeriodo(dataInicio, dataFim);

        BigDecimal saldoPorPeriodo = totalReceitasPorPeriodo.subtract(totalDespesasPorPeriodo);

        return new ResumoFinanceiroDTO(totalReceitasPorPeriodo, totalDespesasPorPeriodo, saldoPorPeriodo);
    }

    public ResumoFinanceiroDTO gerarResumoMensal(int mes, int ano) {
        YearMonth periodo = YearMonth.of(ano, mes);
        LocalDate dataInicio = periodo.atDay(1);
        LocalDate dataFim = periodo.atEndOfMonth();

        return gerarResumoPorPeriodo(dataInicio, dataFim);
    }

    public List<HistoricoMensalDTO> gerarHistoricoAnual(int ano) {
        List<HistoricoMensalDTO> historico = new ArrayList<>();
        int anoAtual = LocalDate.now().getYear();

        if (ano < 2000 || ano > anoAtual) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O ano deve estar entre 2000 e " + anoAtual + "."
            );
        }
        for (int mes = 1; mes <= 12; mes++) {
            ResumoFinanceiroDTO resumo = gerarResumoMensal(mes, ano);
            HistoricoMensalDTO historicoMensalDTO = new HistoricoMensalDTO(
                    mes,
                    resumo.getTotalReceitas(),
                    resumo.getTotalDespesas(),
                    resumo.getSaldo()
            );
            historico.add(historicoMensalDTO);
        }
        return historico;
    }
}
