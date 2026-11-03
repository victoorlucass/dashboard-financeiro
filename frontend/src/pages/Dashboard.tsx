
import { useEffect, useState } from "react";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    LayoutDashboard,
    List,
    ChartNoAxesCombined,
    PlusCircle,
    Menu,
    X
} from "lucide-react";
import TransactionForm from "../components/TransactionForm";
import SummaryCard from "../components/SummaryCard";
import FinanceChart from "../components/FinanceChart";
import TransactionList from "../components/TransactionList";
import FinanceOverview from "../components/FinanceOverview";
import type { Movimentacao } from "../services/api";

import {
    buscarResumo,
    buscarHistorico,
    buscarResumoMensal,
    buscarMovimentacoes,
} from "../services/api";

import type {
    ResumoFinanceiro,
    HistoricoMensal,
} from "../services/api";

function Dashboard() {
    const [resumo, setResumo] = useState<ResumoFinanceiro | null>(null);
    const [historico, setHistorico] = useState<HistoricoMensal[]>([]);
    const [erro, setErro] = useState("");
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [mesSelecionado, setMesSelecionado] = useState(
        new Date().getMonth() + 1
    );
    const [sidebarAberta, setSidebarAberta] = useState(false);

    const [anoSelecionado, setAnoSelecionado] = useState(
        new Date().getFullYear()
    );

    const [resumoMensal, setResumoMensal] =
        useState<ResumoFinanceiro | null>(null);

    async function carregarResumoMensal() {

        if (
            !Number.isInteger(anoSelecionado) ||
            anoSelecionado < 2000 ||
            anoSelecionado > new Date().getFullYear()
        ) {
            setResumoMensal(null);
            setErro("Informe um ano válido.");
            return;
        }

        setErro("");

        try {
            const dados = await buscarResumoMensal(
                mesSelecionado,
                anoSelecionado
            );

            setResumoMensal(dados);
        } catch {
            setErro("Não foi possível carregar o resumo mensal.");
        }
    }

    async function atualizarDados() {
        try {
            const [dadosResumo, dadosHistorico, dadosMovimentacoes] = await Promise.all([
                buscarResumo(),
                buscarHistorico(anoSelecionado),
                buscarMovimentacoes(),
            ]);

            setResumo(dadosResumo);
            setHistorico(dadosHistorico);
            setMovimentacoes(dadosMovimentacoes);

            const dadosMensais = await buscarResumoMensal(
                mesSelecionado,
                anoSelecionado
            );

            setResumoMensal(dadosMensais);
        } catch {
            setErro("Não foi possível atualizar os dados financeiros.");
        }
    }

    useEffect(() => {
        carregarResumoMensal();
    }, [mesSelecionado, anoSelecionado]);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [dadosResumo, dadosHistorico, dadosMovimentacoes] =
                    await Promise.all([
                        buscarResumo(),
                        buscarHistorico(anoSelecionado),
                        buscarMovimentacoes(),
                    ]);

                setResumo(dadosResumo);
                setHistorico(dadosHistorico);
                setMovimentacoes(dadosMovimentacoes);
            } catch {
                setErro("Não foi possível conectar ao servidor financeiro.");
            }
        }

        carregarDados();
    }, [anoSelecionado]);


    const moeda = (valor: number) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

    if (erro) return <p>{erro}</p>;
    if (!resumo || !resumoMensal) {
        return <p>Carregando informações financeiras...</p>;
    }

    return (
        <div className="app-layout">

            {sidebarAberta && (
                <button
                    className="sidebar-backdrop"
                    aria-label="Fechar menu"
                    onClick={() => setSidebarAberta(false)}
                />
            )}

            <aside className={`sidebar ${sidebarAberta ? "sidebar-open" : ""}`}>
                <div className="sidebar-brand">
                    <ChartNoAxesCombined size={32} />
                    <h2>Dashboard<br />Financeiro</h2>
                </div>

                <nav
                    className="sidebar-nav"
                    onClick={() => setSidebarAberta(false)}
                >
                    <a href="#visao-geral" className="active">
                        <LayoutDashboard size={19} />
                        <span>Visão geral</span>
                    </a>

                    <a href="#movimentacoes">
                        <List size={19} />
                        <span>Movimentações</span>
                    </a>

                    <a href="#relatorios">
                        <ChartNoAxesCombined size={19} />
                        <span>Relatórios</span>
                    </a>

                    <a href="#novo-lancamento">
                        <PlusCircle size={19} />
                        <span>Novo lançamento</span>
                    </a>
                </nav>

                <div className="sidebar-tip">
                    <Wallet size={25} />
                    <p>Controle suas finanças e acompanhe seus objetivos!</p>
                </div>
            </aside>

            <main className="dashboard">

                <header id="visao-geral" className="dashboard-header">
                    <button
                        className="menu-toggle"
                        onClick={() => setSidebarAberta(!sidebarAberta)}
                        aria-label={sidebarAberta ? "Fechar menu" : "Abrir menu"}
                    >
                        {sidebarAberta ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <div className="dashboard-heading">
                        <h1>Visão geral</h1>
                        <p>Acompanhe sua vida financeira.</p>
                    </div>

                    <section className="period-selector">
                        <div>
                            <label htmlFor="mes">Mês</label>
                            <select
                                id="mes"
                                value={mesSelecionado}
                                onChange={(e) => setMesSelecionado(Number(e.target.value))}
                            >
                                {[
                                    "Janeiro", "Fevereiro", "Março", "Abril",
                                    "Maio", "Junho", "Julho", "Agosto",
                                    "Setembro", "Outubro", "Novembro", "Dezembro"
                                ].map((mes, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {mes}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="ano">Ano</label>
                            <input
                                id="ano"
                                type="number"
                                min="2000"
                                max={new Date().getFullYear()}
                                value={anoSelecionado}
                                onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                            />
                        </div>
                    </section>
                </header>

                <section className="summary-grid">
                    <SummaryCard
                        title="Saldo do mês"
                        value={moeda(resumoMensal?.saldo ?? 0)}
                        icon={<Wallet />}
                        description="Receitas menos despesas"
                        variant="saldo"
                    />

                    <SummaryCard
                        title="Receitas"
                        value={moeda(resumoMensal?.totalReceitas ?? 0)}
                        icon={<TrendingUp />}
                        description="Total de receitas"
                        variant="receita"
                    />

                    <SummaryCard
                        title="Despesas"
                        value={moeda(resumoMensal?.totalDespesas ?? 0)}
                        icon={<TrendingDown />}
                        description="Total de despesas"
                        variant="despesa"
                    />
                </section>


                <div className="dashboard-workspace">
                    <section id="relatorios" className="workspace-chart">
                        <FinanceChart data={historico} />
                    </section>

                    <section id="novo-lancamento" className="workspace-form">
                        <TransactionForm onSaved={atualizarDados} />
                    </section>
                </div>

                <section id="movimentacoes" className="workspace-transactions">
                    <TransactionList
                        movimentacoes={movimentacoes}
                        onDeleted={atualizarDados}
                        mesSelecionado={mesSelecionado}
                        anoSelecionado={anoSelecionado}
                    />
                </section>

            </main>
        </div>
    );
}

export default Dashboard;

