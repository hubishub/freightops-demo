"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import {
  EXCEPTION_SERIES,
  KPI_SUMMARY,
  ON_TIME_SERIES,
  REVENUE_SERIES,
  UTILIZATION_SERIES,
} from "@/data/mock-analytics";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

const PIE_COLORS = [
  "#0284c7",
  "#7c3aed",
  "#db2777",
  "#d97706",
  "#059669",
  "#e11d48",
];

function useChartTheme() {
  const [colors, setColors] = useState({
    grid: "#334155",
    axis: "#94a3b8",
    tooltipBg: "#0f172a",
    tooltipBorder: "#334155",
  });
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      setColors({
        grid: s.getPropertyValue("--chart-grid").trim() || "#334155",
        axis: s.getPropertyValue("--chart-axis").trim() || "#94a3b8",
        tooltipBg:
          s.getPropertyValue("--chart-tooltip-bg").trim() || "#0f172a",
        tooltipBorder:
          s.getPropertyValue("--chart-tooltip-border").trim() || "#334155",
      });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return colors;
}

export default function AnalyticsPage() {
  const chart = useChartTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Ops Analytics</h1>
        <p className="text-sm text-fg-muted">
          Demo KPI series only — fictional weekly aggregates for portfolio
          charts (Recharts).
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Active loads", value: String(KPI_SUMMARY.activeLoads) },
          {
            label: "Available drivers",
            value: String(KPI_SUMMARY.availableDrivers),
          },
          {
            label: "Open detention",
            value: String(KPI_SUMMARY.detentionOpen),
          },
          { label: "On-time %", value: `${KPI_SUMMARY.onTimePct}%` },
          {
            label: "Avg utilization",
            value: `${KPI_SUMMARY.avgUtilization}%`,
          },
          {
            label: "Weekly revenue",
            value: formatCurrency(KPI_SUMMARY.weeklyRevenue),
          },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-border bg-surface-raised p-4"
          >
            <div className="text-[11px] uppercase tracking-wide text-fg-subtle">
              {k.label}
            </div>
            <div className="mt-1 text-xl font-semibold text-fg">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Utilization & empty miles (demo)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={UTILIZATION_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="week" stroke={chart.axis} fontSize={12} />
              <YAxis stroke={chart.axis} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: chart.tooltipBg,
                  border: `1px solid ${chart.tooltipBorder}`,
                  color: "var(--fg)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--fg-muted)" }} />
              <Line
                type="monotone"
                dataKey="utilization"
                name="Utilization %"
                stroke="#0284c7"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="emptyMiles"
                name="Empty %"
                stroke="#d97706"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="On-time performance (demo)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ON_TIME_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="week" stroke={chart.axis} fontSize={12} />
              <YAxis stroke={chart.axis} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: chart.tooltipBg,
                  border: `1px solid ${chart.tooltipBorder}`,
                  color: "var(--fg)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--fg-muted)" }} />
              <Area
                type="monotone"
                dataKey="onTime"
                name="On-time %"
                stackId="1"
                stroke="#059669"
                fill="#05966944"
              />
              <Area
                type="monotone"
                dataKey="late"
                name="Late %"
                stackId="1"
                stroke="#e11d48"
                fill="#e11d4844"
              />
              <Area
                type="monotone"
                dataKey="early"
                name="Early %"
                stackId="1"
                stroke="#7c3aed"
                fill="#7c3aed44"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Exception mix (demo)">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={EXCEPTION_SERIES}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {EXCEPTION_SERIES.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: chart.tooltipBg,
                  border: `1px solid ${chart.tooltipBorder}`,
                  color: "var(--fg)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--fg-muted)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue vs cost (demo USD)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={REVENUE_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="week" stroke={chart.axis} fontSize={12} />
              <YAxis stroke={chart.axis} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: chart.tooltipBg,
                  border: `1px solid ${chart.tooltipBorder}`,
                  color: "var(--fg)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--fg-muted)" }} />
              <Bar dataKey="revenue" name="Revenue" fill="#0284c7" />
              <Bar dataKey="cost" name="Cost" fill="#64748b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-4">
      <h2 className="mb-3 text-sm font-semibold text-fg-muted">{title}</h2>
      {children}
    </div>
  );
}
