package com.victor.dashboard_financeiro.dto;

import java.math.BigDecimal;

public class ResumoFinanceiroDTO {

    private BigDecimal totalReceitas;

    private BigDecimal totalDespesas;

    private BigDecimal saldo;

    public ResumoFinanceiroDTO(BigDecimal totalReceitas, BigDecimal totalDespesas, BigDecimal saldo) {
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.saldo = saldo;
    }

    public BigDecimal getTotalReceitas() {
        return totalReceitas;
    }

    public BigDecimal getTotalDespesas() {
        return totalDespesas;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }
}
