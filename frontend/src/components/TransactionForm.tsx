
import { useState, type FormEvent } from "react";
import {
    cadastrarReceita,
    cadastrarDespesa,
} from "../services/api";

import type { MovimentacaoRequest } from "../services/api";

interface TransactionFormProps {
    onSaved: () => void;
}

function TransactionForm({ onSaved }: TransactionFormProps) {
    const [tipo, setTipo] = useState<"receita" | "despesa">("receita");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [categoria, setCategoria] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMensagem("");

        // Validação da descrição
        if (descricao.trim().length < 3) {
            setMensagem("A descrição precisa ter pelo menos 3 caracteres.");
            return;
        }

        // Validação da categoria
        if (categoria.trim().length < 3) {
            setMensagem("A categoria precisa ter pelo menos 3 caracteres.");
            return;
        }

        // Validação do valor
        const valorNumerico = Number(valor);

        if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
            setMensagem("Informe um valor válido e maior que zero.");
            return;
        }

        // Validação da data
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dataSelecionada = new Date(`${data}T00:00:00`);

        if (dataSelecionada > hoje) {
            setMensagem("A data não pode ser futura.");
            return;
        }

        setCarregando(true);

        const dados: MovimentacaoRequest = {
            descricao: descricao.trim(),
            valor: valorNumerico,
            data,
            categoria: categoria.trim(),
        };

        try {
            if (tipo === "receita") {
                await cadastrarReceita(dados);
            } else {
                await cadastrarDespesa(dados);
            }

            setMensagem("Movimentação cadastrada com sucesso!");
            setDescricao("");
            setValor("");
            setCategoria("");

            onSaved();
        } catch (erro: unknown) {
            if (erro instanceof Error) {
                setMensagem(erro.message);
            } else {
                setMensagem("Ocorreu um erro inesperado.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <section className="transaction-card">
            <h2>Nova movimentação</h2>



            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-field">
                    <label>Tipo de movimentação</label>
                    <select
                        value={tipo}
                        onChange={(e) =>
                            setTipo(e.target.value as "receita" | "despesa")
                        }
                    >
                        <option value="receita">Receita</option>
                        <option value="despesa">Despesa</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Valor (R$)</label>
                    <input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="0,00"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-field form-field-full">
                    <label>Descrição</label>
                    <input
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Ex.: Salário"
                        required
                        minLength={3}
                        maxLength={100}
                    />
                </div>

                <div className="form-field">
                    <label>Data</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Categoria</label>
                    <input
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Ex.: Alimentação"
                        required
                        minLength={3}
                        maxLength={50}
                    />
                </div>

                <button
                    className="transaction-submit"
                    type="submit"
                    disabled={carregando}
                >
                    {carregando ? "Salvando..." : "Cadastrar movimentação"}
                </button>

                {mensagem && (
                    <p className="form-message" role="status">
                        {mensagem}
                    </p>
                )}
            </form>


        </section>
    );
}

export default TransactionForm;
