
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { HistoricoMensal } from "../services/api";

interface FinanceOverviewProps {
  data: HistoricoMensal[];
}

function FinanceOverview({ data }: FinanceOverviewProps) {
  const totalReceitas = data.reduce(
    (total, item) => total + item.totalReceitas,
    0
  );

  const totalDespesas = data.reduce(
    (total, item) => total + item.totalDespesas,
    0
  );

  const dados = [
    { name: "Receitas", value: totalReceitas },
    { name: "Despesas", value: totalDespesas },
  ].filter((item) => item.value > 0);

  const moeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const cores = ["#c99b83", "#a66c79"];

  return (
    <section className="overview-card">
      <h2>Distribuição anual</h2>
      <p className="overview-subtitle">Receitas x despesas</p>

      {dados.length === 0 ? (
        <p className="overview-empty">Ainda não existem movimentações neste ano.</p>
      ) : (
        <>
          <div className="overview-chart">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={dados}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={5}
                  stroke="none"
                >
                  {dados.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={cores[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(valor) => moeda(Number(valor))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="overview-legend">
            {dados.map((item, index) => (
              <div className="overview-legend-item" key={item.name}>
                <span
                  className="overview-dot"
                  style={{ background: cores[index] }}
                />
                <span>{item.name}</span>
                <strong>{moeda(item.value)}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default FinanceOverview;
