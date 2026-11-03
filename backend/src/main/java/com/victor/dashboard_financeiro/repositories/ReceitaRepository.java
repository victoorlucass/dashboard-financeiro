package com.victor.dashboard_financeiro.repositories;

import com.victor.dashboard_financeiro.entities.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query("SELECT SUM(r.valor) FROM Receita r")
    BigDecimal somaTotalReceitas();

    @Query("SELECT SUM(r.valor) FROM Receita r WHERE r.data BETWEEN :dataInicio AND :dataFim")
    BigDecimal somarReceitasPorPeriodo(
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
            );

}
