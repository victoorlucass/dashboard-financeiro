package com.victor.dashboard_financeiro.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class DespesaRequestDTO {

    public DespesaRequestDTO() {
    }

    @NotBlank
    @Size(min = 3, max = 100)
    private String descricao;

    @Positive
    @NotNull
    private BigDecimal valor;

    @NotNull
    @PastOrPresent
    private LocalDate data;

    @NotBlank
    @Size(min = 3, max = 50)
    private String categoria;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}