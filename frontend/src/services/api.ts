
const API_URL = "http://localhost:8080";

async function verificarResposta(resposta: Response): Promise<void> {
    if (!resposta.ok) {
        let mensagem = `Erro na requisição (${resposta.status}).`;

        try {
            const erro = await resposta.json();

            if (erro.message) {
                mensagem = erro.message;
            } else if (erro.mensagem) {
                mensagem = erro.mensagem;
            } else if (erro.detail) {
                mensagem = erro.detail;
            }
        } catch {
            // Mantém a mensagem padrão se a resposta não tiver JSON.
        }

        throw new Error(mensagem);
    }
}

export interface ResumoFinanceiro {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface HistoricoMensal {
    mes: number;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface Movimentacao {
    id: number;
    descricao: string;
    valor: number;
    data: string;
    categoria: string;
    tipo: "receita" | "despesa";
}

export async function buscarResumo(): Promise<ResumoFinanceiro> {
    const resposta = await fetch(`${API_URL}/resumo-financeiro`);

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar o resumo financeiro.");
    }

    return resposta.json();
}

export async function buscarHistorico(ano: number): Promise<HistoricoMensal[]> {
    const resposta = await fetch(
        `${API_URL}/resumo-financeiro/historico?ano=${ano}`
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar o histórico financeiro.");
    }

    return resposta.json();
}


export interface MovimentacaoRequest {
    descricao: string;
    valor: number;
    data: string;
    categoria: string;
}

export async function cadastrarReceita(dados: MovimentacaoRequest) {
    const resposta = await fetch(`${API_URL}/receitas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    await verificarResposta(resposta);

    return resposta.json();
}

export async function cadastrarDespesa(dados: MovimentacaoRequest) {
    const resposta = await fetch(`${API_URL}/despesas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    await verificarResposta(resposta);

    return resposta.json();
}

export async function buscarReceitas(): Promise<Omit<Movimentacao, "tipo">[]> {
    const resposta = await fetch(`${API_URL}/receitas`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar receitas.");
    }

    return resposta.json();
}

export async function buscarDespesas(): Promise<Omit<Movimentacao, "tipo">[]> {
    const resposta = await fetch(`${API_URL}/despesas`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar despesas.");
    }

    return resposta.json();
}

export async function buscarMovimentacoes(): Promise<Movimentacao[]> {
    const [receitas, despesas] = await Promise.all([
        buscarReceitas(),
        buscarDespesas(),
    ]);

    const movimentacoes: Movimentacao[] = [
        ...receitas.map((item) => ({ ...item, tipo: "receita" as const })),
        ...despesas.map((item) => ({ ...item, tipo: "despesa" as const })),
    ];

    return movimentacoes.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
}

export async function excluirMovimentacao(
    tipo: "receita" | "despesa",
    id: number
): Promise<void> {
    const resposta = await fetch(`${API_URL}/${tipo === "receita" ? "receitas" : "despesas"}/${id}`, {
        method: "DELETE",
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível excluir a movimentação.");
    }
}


export async function atualizarReceita(
    id: number,
    dados: MovimentacaoRequest
) {
    const resposta = await fetch(`${API_URL}/receitas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    await verificarResposta(resposta);

    return resposta.json();
}

export async function atualizarDespesa(
    id: number,
    dados: MovimentacaoRequest
) {
    const resposta = await fetch(`${API_URL}/despesas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    await verificarResposta(resposta);

    return resposta.json();
}

export async function buscarResumoMensal(
    mes: number,
    ano: number
): Promise<ResumoFinanceiro> {
    const resposta = await fetch(
        `${API_URL}/resumo-financeiro/mensal?mes=${mes}&ano=${ano}`
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar o resumo mensal.");
    }

    return resposta.json();
}