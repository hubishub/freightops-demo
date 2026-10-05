/** DEMO analytics series — fictional KPIs for portfolio charts. */

export const UTILIZATION_SERIES = [
  { week: "W1", utilization: 78, emptyMiles: 14 },
  { week: "W2", utilization: 82, emptyMiles: 12 },
  { week: "W3", utilization: 75, emptyMiles: 16 },
  { week: "W4", utilization: 88, emptyMiles: 10 },
  { week: "W5", utilization: 85, emptyMiles: 11 },
  { week: "W6", utilization: 91, emptyMiles: 9 },
  { week: "W7", utilization: 87, emptyMiles: 10 },
  { week: "W8", utilization: 83, emptyMiles: 13 },
];

export const ON_TIME_SERIES = [
  { week: "W1", onTime: 92, late: 6, early: 2 },
  { week: "W2", onTime: 89, late: 8, early: 3 },
  { week: "W3", onTime: 94, late: 4, early: 2 },
  { week: "W4", onTime: 91, late: 7, early: 2 },
  { week: "W5", onTime: 96, late: 3, early: 1 },
  { week: "W6", onTime: 93, late: 5, early: 2 },
  { week: "W7", onTime: 90, late: 7, early: 3 },
  { week: "W8", onTime: 95, late: 4, early: 1 },
];

export const EXCEPTION_SERIES = [
  { name: "Detention", count: 14 },
  { name: "Late pickup", count: 8 },
  { name: "Equipment", count: 5 },
  { name: "HOS conflict", count: 7 },
  { name: "Broker cover", count: 3 },
  { name: "Weather", count: 4 },
];

export const REVENUE_SERIES = [
  { week: "W1", revenue: 48200, cost: 39100 },
  { week: "W2", revenue: 52100, cost: 41200 },
  { week: "W3", revenue: 44800, cost: 37500 },
  { week: "W4", revenue: 56700, cost: 43800 },
  { week: "W5", revenue: 55300, cost: 42100 },
  { week: "W6", revenue: 61200, cost: 45900 },
  { week: "W7", revenue: 58900, cost: 44600 },
  { week: "W8", revenue: 53400, cost: 41800 },
];

export const KPI_SUMMARY = {
  activeLoads: 8,
  availableDrivers: 4,
  detentionOpen: 2,
  onTimePct: 93.2,
  avgUtilization: 83.6,
  weeklyRevenue: 53400,
};
