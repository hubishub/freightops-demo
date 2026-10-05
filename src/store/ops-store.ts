"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckCall, CheckCallType, Load, LoadStatus, Priority } from "@/lib/types";
import { MOCK_LOADS } from "@/data/mock-loads";
import { MOCK_DRIVERS } from "@/data/mock-drivers";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface OpsState {
  loads: Load[];
  drivers: typeof MOCK_DRIVERS;
  toasts: Toast[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  updateLoadStatus: (id: string, status: LoadStatus) => void;
  addLoad: (partial: {
    ref?: string;
    shipper: string;
    originCity: string;
    originState: string;
    destCity: string;
    destState: string;
    miles: number;
    rate: number;
    priority: Priority;
    commodity: string;
  }) => void;
  addCheckCall: (input: {
    loadId: string;
    driverId?: string;
    type: CheckCallType;
    location?: string;
    notes: string;
  }) => void;
  pushToast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: string) => void;
  resetDemo: () => void;
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useOpsStore = create<OpsState>()(
  persist(
    (set, get) => ({
      loads: MOCK_LOADS,
      drivers: MOCK_DRIVERS,
      toasts: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      updateLoadStatus: (id, status) => {
        set({
          loads: get().loads.map((l) =>
            l.id === id
              ? { ...l, status, updatedAt: new Date().toISOString() }
              : l
          ),
        });
        get().pushToast(`Load status → ${status.replace(/_/g, " ")}`, "success");
      },
      addLoad: (partial) => {
        const now = new Date().toISOString();
        const id = uid("load");
        const ref = partial.ref || `FO-${Math.floor(78000 + Math.random() * 2000)}`;
        const load: Load = {
          id,
          ref,
          status: "planned",
          priority: partial.priority,
          shipper: partial.shipper,
          originCity: partial.originCity,
          originState: partial.originState,
          destCity: partial.destCity,
          destState: partial.destState,
          miles: partial.miles,
          rate: partial.rate,
          equipment: "dry_van",
          detentionFlag: false,
          commodity: partial.commodity,
          weight: 35000,
          pickupDate: now,
          deliveryDate: now,
          createdAt: now,
          updatedAt: now,
          stops: [
            {
              id: uid("st"),
              sequence: 1,
              type: "pickup",
              facility: `${partial.shipper} Dock`,
              city: partial.originCity,
              state: partial.originState,
              appointmentStart: now,
              appointmentEnd: now,
              status: "pending",
            },
            {
              id: uid("st"),
              sequence: 2,
              type: "delivery",
              facility: "Consignee Dock",
              city: partial.destCity,
              state: partial.destState,
              appointmentStart: now,
              appointmentEnd: now,
              status: "pending",
            },
          ],
          checkCalls: [],
          notes: "Created in demo UI — sample data only.",
        };
        set({ loads: [load, ...get().loads] });
        get().pushToast(`Created load ${ref}`, "success");
      },
      addCheckCall: (input) => {
        const call: CheckCall = {
          id: uid("cc"),
          loadId: input.loadId,
          driverId: input.driverId,
          type: input.type,
          timestamp: new Date().toISOString(),
          location: input.location,
          notes: input.notes,
          createdBy: "Demo Dispatcher",
        };
        set({
          loads: get().loads.map((l) =>
            l.id === input.loadId
              ? {
                  ...l,
                  checkCalls: [...l.checkCalls, call],
                  updatedAt: new Date().toISOString(),
                }
              : l
          ),
        });
        get().pushToast("Check-call logged (demo store)", "success");
      },
      pushToast: (message, type = "info") => {
        const id = uid("toast");
        set({ toasts: [...get().toasts, { id, message, type }] });
        setTimeout(() => get().dismissToast(id), 3500);
      },
      dismissToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),
      resetDemo: () => {
        set({ loads: MOCK_LOADS, drivers: MOCK_DRIVERS });
        get().pushToast("Demo data reset", "info");
      },
    }),
    {
      name: "freightops-demo-store",
      partialize: (s) => ({ loads: s.loads }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
