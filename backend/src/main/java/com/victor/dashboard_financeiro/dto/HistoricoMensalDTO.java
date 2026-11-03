package com.victor.dashboard_financeiro.dto;

import java.math.BigDecimal;

public class HistoricoMensalDTO {
    private int mes;

    private BigDecimal totalReceitas;

    private BigDecimal totalDespesas;

    private BigDecimal saldo;

    public HistoricoMensalDTO(int mes, BigDecimal totalReceitas, BigDecimal totalDespesas, BigDecimal saldo) {
        this.mes = mes;
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.saldo = saldo;
    }

    public int getMes() {
        return mes;
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
