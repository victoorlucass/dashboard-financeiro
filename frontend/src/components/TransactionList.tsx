
import type { Movimentacao } from "../services/api";
import { excluirMovimentacao } from "../services/api";
import { useState, useEffect } from "react";
import {
    atualizarReceita,
    atualizarDespesa,
} from "../services/api";

interface TransactionListProps {
    movimentacoes: Movimentacao[];
    onDeleted: () => void;
    mesSelecionado: number;
    anoSelecionado: number;
}

function TransactionList({ movimentacoes, onDeleted, mesSelecionado, anoSelecionado }: TransactionListProps) {
    const moeda = (valor: number) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

    async function handleDelete(item: Movimentacao) {
        const confirmar = window.confirm(
            `Deseja excluir "${item.descricao}"?`
        );

        if (!confirmar) return;

        setMensagem("");
        setExcluindo(`${item.tipo}-${item.id}`);

        try {
            await excluirMovimentacao(item.tipo, item.id);

            setMensagem("Movimentação excluída com sucesso!");
            onDeleted();
        } catch (erro: unknown) {
            if (erro instanceof Error) {
                setMensagem(erro.message);
            } else {
                setMensagem("Não foi possível excluir a movimentação.");
            }
        } finally {
            setExcluindo(null);
        }
    }

    const [editando, setEditando] = useState<Movimentacao | null>(null);
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [filtroCategoria, setFiltroCategoria] = useState("todas");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [excluindo, setExcluindo] = useState<string | null>(null);

    useEffect(() => {
        if (!mensagem) return;

        const temporizador = window.setTimeout(() => {
            setMensagem("");
        }, 3000);

        return () => window.clearTimeout(temporizador);
    }, [mensagem]);

    function limparFiltros() {
        setFiltroTipo("todos");
        setFiltroCategoria("todas");
        setDataInicio("");
        setDataFim("");
    }

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!editando) return;

        const formulario = new FormData(event.currentTarget);

        const descricao = String(formulario.get("descricao")).trim();
        const categoria = String(formulario.get("categoria")).trim();
        const valor = Number(formulario.get("valor"));
        const data = String(formulario.get("data"));

        if (descricao.length < 3 || categoria.length < 3) {
            setMensagem("Descrição e categoria precisam ter pelo menos 3 caracteres.");
            return;
        }

        if (!Number.isFinite(valor) || valor <= 0) {
            setMensagem("Informe um valor válido e maior que zero.");
            return;
        }

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dataSelecionada = new Date(`${data}T00:00:00`);

        if (!data || Number.isNaN(dataSelecionada.getTime()) || dataSelecionada > hoje) {
            setMensagem("Informe uma data válida, que não seja futura.");
            return;
        }

        const dados = {
            descricao,
            valor,
            data,
            categoria,
        };

        setMensagem("");
        setSalvando(true);

        try {
            if (editando.tipo === "receita") {
                await atualizarReceita(editando.id, dados);
            } else {
                await atualizarDespesa(editando.id, dados);
            }

            setEditando(null);
            setMensagem("Movimentação atualizada com sucesso!");
        } catch (erro: unknown) {
            if (erro instanceof Error) {
                setMensagem(erro.message);
            } else {
                setMensagem("Não foi possível atualizar a movimentação.");
            }
        } finally {
            setSalvando(false);
        }
    }

    const categorias = [
        ...new Set(movimentacoes.map((item) => item.categoria.trim())),
    ];

    const movimentacoesFiltradas = movimentacoes.filter((item) => {
        const correspondeTipo =
            filtroTipo === "todos" || item.tipo === filtroTipo;

        const correspondeCategoria =
            filtroCategoria === "todas" ||
            item.categoria.trim() === filtroCategoria;

        const correspondeDataInicio =
            !dataInicio || item.data >= dataInicio;

        const correspondeDataFim =
            !dataFim || item.data <= dataFim;

        const correspondeMes =
            new Date(`${item.data}T00:00:00`).getMonth() + 1 === mesSelecionado;

        const correspondeAno =
            new Date(`${item.data}T00:00:00`).getFullYear() === anoSelecionado;

        return (
            correspondeTipo &&
            correspondeCategoria &&
            correspondeDataInicio &&
            correspondeDataFim &&
            correspondeMes &&
            correspondeAno
        );
    });

    return (
        <section className="transaction-list-card">
            <h2>Últimas movimentações</h2>

            {mensagem && (
                <p className="form-message" role="status">
                    {mensagem}
                </p>
            )}

            <div className="transaction-filters">
                <div>
                    <label>Tipo</label>
                    <select
                        className={filtroTipo !== "todos" ? "filter-active" : ""}
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                        <option value="todos">Todos</option>
                        <option value="receita">Receitas</option>
                        <option value="despesa">Despesas</option>
                    </select>
                </div>

                <div>
                    <label>Categoria</label>
                    <select
                        className={filtroCategoria !== "todas" ? "filter-active" : ""}
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                        <option value="todas">Todas</option>
                        {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Data inicial</label>
                    <input
                        type="date"
                        className={dataInicio ? "filter-active" : ""}
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                    />
                </div>

                <div>
                    <label>Data final</label>
                    <input
                        type="date"
                        className={dataFim ? "filter-active" : ""}
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                    />
                </div>

                <div className="transaction-filter-actions">
                    <button type="button" onClick={limparFiltros}>
                        Limpar filtros
                    </button>
                </div>
            </div>


            {
                editando && (
                    <form className="edit-form" onSubmit={handleUpdate}>
                        <h3>
                            Editar {editando.tipo === "receita" ? "receita" : "despesa"}
                        </h3>

                        <label>Descrição</label>
                        <input
                            name="descricao"
                            defaultValue={editando.descricao}
                            required
                            minLength={3}
                            maxLength={100}
                        />

                        <label>Valor (R$)</label>
                        <input
                            name="valor"
                            type="number"
                            defaultValue={editando.valor}
                            min="0.01"
                            step="0.01"
                            required
                        />

                        <label>Data</label>
                        <input
                            name="data"
                            type="date"
                            defaultValue={editando.data}
                            max={new Date().toISOString().split("T")[0]}
                            required
                        />

                        <label>Categoria</label>
                        <input
                            name="categoria"
                            defaultValue={editando.categoria.trim()}
                            required
                            minLength={3}
                            maxLength={50}
                        />

                        <div className="edit-form-actions">
                            <button type="submit" disabled={salvando}>
                                {salvando ? "Salvando..." : "Salvar alterações"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditando(null)}
                                disabled={salvando}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )
            }


            {
                movimentacoesFiltradas.length === 0 ? (
                    <p className="empty-transactions">
                        Nenhuma movimentação encontrada para os filtros selecionados.
                    </p>
                ) : (
                    <div className="transaction-table-wrapper">
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {movimentacoesFiltradas.map((item) => (
                                    <tr key={`${item.tipo}-${item.id}`}>
                                        <td>{item.descricao}</td>

                                        <td>{item.categoria.trim()}</td>

                                        <td>
                                            {new Date(`${item.data}T00:00:00`).toLocaleDateString("pt-BR")}
                                        </td>

                                        <td>
                                            <span className={`transaction-type ${item.tipo}`}>
                                                {item.tipo === "receita" ? "Receita" : "Despesa"}
                                            </span>
                                        </td>

                                        <td className={item.tipo}>
                                            {item.tipo === "despesa" ? "- " : "+ "}
                                            {moeda(item.valor)}
                                        </td>

                                        <td className="transaction-actions">
                                            <button
                                                type="button"
                                                className="edit-button"
                                                disabled={salvando || excluindo !== null}
                                                onClick={() => setEditando(item)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="delete-button"
                                                onClick={() => handleDelete(item)}
                                                disabled={excluindo !== null || salvando}
                                            >
                                                {excluindo === `${item.tipo}-${item.id}` ? "Excluindo..." : "Excluir"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </section >
    );
}

export default TransactionList;
