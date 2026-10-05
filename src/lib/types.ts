export type LoadStatus =
  | "planned"
  | "dispatched"
  | "at_shipper"
  | "in_transit"
  | "at_consignee"
  | "delivered"
  | "exception";

export type Priority = "hot" | "high" | "normal" | "low";

export type DriverStatus = "available" | "assigned" | "driving" | "off_duty" | "hometime";

export type CheckCallType =
  | "dispatch"
  | "en_route"
  | "arrived_shipper"
  | "loaded"
  | "departed_shipper"
  | "check_in"
  | "arrived_consignee"
  | "unloaded"
  | "delivered"
  | "detention"
  | "breakdown"
  | "other";

export interface Stop {
  id: string;
  sequence: number;
  type: "pickup" | "delivery" | "relay";
  facility: string;
  city: string;
  state: string;
  appointmentStart: string;
  appointmentEnd: string;
  status: "pending" | "arrived" | "completed" | "missed";
  notes?: string;
}

export interface CheckCall {
  id: string;
  loadId: string;
  driverId?: string;
  type: CheckCallType;
  timestamp: string;
  location?: string;
  notes: string;
  createdBy: string;
}

export interface Load {
  id: string;
  ref: string;
  status: LoadStatus;
  priority: Priority;
  shipper: string;
  broker?: string;
  originCity: string;
  originState: string;
  destCity: string;
  destState: string;
  miles: number;
  rate: number;
  equipment: "dry_van" | "reefer" | "flatbed";
  driverId?: string;
  tractor?: string;
  detentionFlag: boolean;
  detentionMinutes?: number;
  commodity: string;
  weight: number;
  stops: Stop[];
  checkCalls: CheckCall[];
  pickupDate: string;
  deliveryDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  name: string;
  tractor: string;
  status: DriverStatus;
  phone: string;
  homeBase: string;
  currentCity?: string;
  currentState?: string;
  hireDate: string;
  cdlClass: string;
  endorsements: string[];
  loadId?: string;
  hosRemaining: number;
  notes?: string;
}

export const LOAD_STATUS_LABELS: Record<LoadStatus, string> = {
  planned: "Planned",
  dispatched: "Dispatched",
  at_shipper: "At Shipper",
  in_transit: "In Transit",
  at_consignee: "At Consignee",
  delivered: "Delivered",
  exception: "Exception",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  hot: "HOT",
  high: "High",
  normal: "Normal",
  low: "Low",
};

export const DRIVER_STATUS_LABELS: Record<DriverStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  driving: "Driving",
  off_duty: "Off Duty",
  hometime: "Hometime",
};

export const CHECK_CALL_LABELS: Record<CheckCallType, string> = {
  dispatch: "Dispatch",
  en_route: "En Route",
  arrived_shipper: "Arrived Shipper",
  loaded: "Loaded",
  departed_shipper: "Departed Shipper",
  check_in: "Check-In",
  arrived_consignee: "Arrived Consignee",
  unloaded: "Unloaded",
  delivered: "Delivered",
  detention: "Detention",
  breakdown: "Breakdown",
  other: "Other",
};

export const BOARD_COLUMNS: LoadStatus[] = [
  "planned",
  "dispatched",
  "at_shipper",
  "in_transit",
  "at_consignee",
  "delivered",
  "exception",
];
