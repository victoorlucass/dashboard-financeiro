
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import type { HistoricoMensal } from "../services/api";

interface FinanceChartProps {
    data: HistoricoMensal[];
}

const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

const moeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

function FinanceChart({ data }: FinanceChartProps) {
    const dadosGrafico = data.map((item) => ({
        ...item,
        nomeMes: meses[item.mes - 1] ?? `Mês ${item.mes}`,
    }));

    return (
        <section className="chart-card finance-chart">
            <div className="chart-header">
                <div>
                    <h2>Evolução financeira anual</h2>
                    <p>Comparativo mensal de receitas, despesas e saldo</p>
                </div>
            </div>

            {dadosGrafico.length === 0 ? (
                <div className="chart-empty">
                    Nenhum dado disponível para este período.
                </div>
            ) : (
                <div className="finance-chart-content">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={dadosGrafico}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                            barGap={4}
                            barCategoryGap="30%"
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="rgba(221, 190, 171, 0.10)"
                                strokeDasharray="3 5"
                            />

                            <XAxis
                                dataKey="nomeMes"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#cbb8ad", fontSize: 11 }}
                                dy={8}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                width={62}
                                tick={{ fill: "#cbb8ad", fontSize: 10 }}
                                tickFormatter={(valor) =>
                                    valor.toLocaleString("pt-BR", {
                                        notation: "compact",
                                        maximumFractionDigits: 1,
                                    })
                                }
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(201, 155, 131, 0.07)" }}
                                contentStyle={{
                                    background: "rgba(48, 34, 34, 0.96)",
                                    border: "1px solid rgba(221, 190, 171, 0.22)",
                                    borderRadius: "10px",
                                    color: "#f5eee9",
                                    boxShadow: "0 8px 22px rgba(20, 12, 13, 0.25)",
                                    fontSize: "12px",
                                }}
                                labelStyle={{
                                    color: "#e3b99d",
                                    fontWeight: 700,
                                    marginBottom: 6,
                                }}
                                formatter={(valor) => moeda(Number(valor))}
                            />

                            <Legend
                                verticalAlign="top"
                                align="right"
                                height={36}
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{
                                    color: "#ddc9bd",
                                    fontSize: "11px",
                                    paddingBottom: "4px",
                                }}
                            />

                            <Bar
                                dataKey="totalReceitas"
                                name="Receitas"
                                fill="#65B98A"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={18}
                            />

                            <Bar
                                dataKey="totalDespesas"
                                name="Despesas"
                                fill="#D8757D"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={18}
                            />

                            <Line
                                type="monotone"
                                dataKey="saldo"
                                name="Saldo"
                                stroke="#75A9E8"
                                strokeWidth={2.5}
                                dot={{
                                    r: 3,
                                    fill: "#75A9E8",
                                    stroke: "#302222",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 5,
                                    fill: "#75A9E8",
                                    stroke: "#dceaff",
                                    strokeWidth: 2,
                                }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}

export default FinanceChart;
