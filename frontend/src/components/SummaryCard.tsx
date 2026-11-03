import type { ReactNode } from "react";

interface SummaryCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    description: string;
    variant: "saldo" | "receita" | "despesa";
}

function SummaryCard({
    title,
    value,
    icon,
    description,
    variant
}: SummaryCardProps) {
    return (
        <div className={`summary-card summary-card-${variant}`}>
            <div className="summary-card-top">
                <span>{title}</span>
                <span className="summary-icon">{icon}</span>
            </div>

            <h2>{value}</h2>
            <p>{description}</p>
        </div>
    );
}

export default SummaryCard;