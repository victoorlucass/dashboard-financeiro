package com.victor.dashboard_financeiro.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Despesa {

    public Despesa() { }

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @Size(min = 3, max = 100)
    private String descricao;

    @Positive
    @NotNull
    @Column(precision = 10, scale = 2)
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
