
package com.victor.dashboard_financeiro.controllers;

import com.victor.dashboard_financeiro.dto.HistoricoMensalDTO;
import com.victor.dashboard_financeiro.dto.ResumoFinanceiroDTO;
import com.victor.dashboard_financeiro.services.ResumoFinanceiroService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resumo-financeiro")
public class ResumoFinanceiroController {

    private final ResumoFinanceiroService resumoFinanceiroService;

    public ResumoFinanceiroController(
            ResumoFinanceiroService resumoFinanceiroService) {
        this.resumoFinanceiroService = resumoFinanceiroService;
    }

    @GetMapping
    public ResumoFinanceiroDTO obterResumoFinanceiro() {
        return resumoFinanceiroService.gerarResumo();
    }

    @GetMapping("/periodo")
    public ResumoFinanceiroDTO obterResumoPorPeriodo(
            @RequestParam LocalDate dataInicio,
            @RequestParam LocalDate dataFim) {
        return resumoFinanceiroService.gerarResumoPorPeriodo(
                dataInicio,
                dataFim
        );
    }

    @GetMapping("/mensal")
    public ResumoFinanceiroDTO obterResumoMensal(
            @RequestParam int mes,
            @RequestParam int ano) {
        if (mes < 1 || mes > 12) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O mês deve estar entre 1 e 12."
            );
        }
        return resumoFinanceiroService.gerarResumoMensal(
                mes,
                ano
        );
    }

    @GetMapping("/historico")
    public List<HistoricoMensalDTO> obterHistoricoAnual(@RequestParam int ano) {
        return resumoFinanceiroService.gerarHistoricoAnual(ano);
    }
}
