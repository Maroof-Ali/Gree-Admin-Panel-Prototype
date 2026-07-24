import { Boxes, CircleUserRound, ClipboardCheck, FileSpreadsheet } from "lucide-react";
import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import { PageHeader } from "../components/layout/AppLayout";

type DashboardData = Awaited<ReturnType<typeof adminApi.getDashboard>>;

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    adminApi.getDashboard().then(setData);
  }, []);

  const cards = data
    ? [
        {
          label: "Registered This Year",
          value: data.registeredThisYear,
          icon: ClipboardCheck,
          tone: "primary",
        },
        {
          label: "Active Contractors",
          value: data.activeContractors,
          icon: CircleUserRound,
          tone: "success",
        },
        {
          label: "Pending Contractors",
          value: data.pendingContractors,
          icon: Boxes,
          tone: "warning",
        },
        {
          label: "Serials Uploaded",
          value: data.serialsUploaded,
          icon: FileSpreadsheet,
          tone: "neutral",
        },
      ]
    : [];

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Analytics for registrations, product movement, and contractor activity."
      />
      <section className="metric-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="metric-card" key={card.label}>
              <div className={`metric-icon metric-${card.tone}`}>
                <Icon size={22} />
              </div>
              <div>
                <span>{card.label}</span>
                <strong>{card.value.toLocaleString()}</strong>
              </div>
            </article>
          );
        })}
      </section>
      <section className="dashboard-grid">
        <div className="analytics-panel">
          <div className="section-head">
            <h2>Most Selling Products</h2>
            <span>Units sold</span>
          </div>
          <div className="bar-list">
            {(data?.mostSellingProducts ?? []).map((item) => (
              <div className="bar-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.series}</span>
                </div>
                <div className="bar-track">
                  <span style={{ width: `${Math.max(18, item.units / 3.4)}%` }} />
                </div>
                <b>{item.units}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="analytics-panel">
          <div className="section-head">
            <h2>Top 5 Selling Contractors</h2>
            <span>Registrations</span>
          </div>
          <div className="rank-list">
            {(data?.topContractors ?? []).map((item, index) => (
              <div className="rank-row" key={item.name}>
                <span>{index + 1}</span>
                <strong>{item.name}</strong>
                <b>{item.registrations}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
