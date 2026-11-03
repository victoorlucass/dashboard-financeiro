package com.victor.dashboard_financeiro.repositories;

import com.victor.dashboard_financeiro.entities.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query("SELECT SUM(d.valor) FROM Despesa d")
    BigDecimal somaTotalDespesas();

    @Query("SELECT SUM(d.valor) FROM Despesa d WHERE d.data BETWEEN :dataInicio AND :dataFim")
    BigDecimal somarDespesasPorPeriodo(
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
    );

}
