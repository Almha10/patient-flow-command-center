export const initialMockData = {
  kpis: {
    liveERCount: 42,
    avgTriageTime: 18, // mins
    bedOccupancyPct: 76,
    criticalMedicinesCount: 3,
  },
  erPatients: [
    { id: "PT-8932", severity: "critical", waitTime: 5 },
    { id: "PT-8933", severity: "urgent", waitTime: 12 },
    { id: "PT-8934", severity: "urgent", waitTime: 18 },
    { id: "PT-8935", severity: "stable", waitTime: 45 },
    { id: "PT-8936", severity: "stable", waitTime: 50 },
    { id: "PT-8937", severity: "stable", waitTime: 65 },
  ],
  erArrivalTrends: [
    { time: "08:00", count: 12 },
    { time: "09:00", count: 18 },
    { time: "10:00", count: 25 },
    { time: "11:00", count: 30 },
    { time: "12:00", count: 28 },
    { time: "13:00", count: 35 },
    { time: "14:00", count: 42 },
  ],
  wards: [
    { id: "er", nameKey: "er", totalBeds: 50, occupiedBeds: 45 },
    { id: "icu", nameKey: "icu", totalBeds: 20, occupiedBeds: 18 },
    { id: "surgery", nameKey: "surgery", totalBeds: 40, occupiedBeds: 25 },
    { id: "internal", nameKey: "internalMedicine", totalBeds: 60, occupiedBeds: 50 },
    { id: "pediatrics", nameKey: "pediatrics", totalBeds: 30, occupiedBeds: 15 },
    { id: "maternity", nameKey: "maternity", totalBeds: 25, occupiedBeds: 20 },
  ],
  pharmacy: [
    { id: 1, name: "Epinephrine", department: "ER / ICU", currentStock: 12, minThreshold: 50, status: "critical" },
    { id: 2, name: "Morphine", department: "Surgery", currentStock: 45, minThreshold: 100, status: "low" },
    { id: 3, name: "Aspirin", department: "General", currentStock: 500, minThreshold: 200, status: "normal" },
    { id: 4, name: "Amoxicillin", department: "Pediatrics", currentStock: 150, minThreshold: 100, status: "normal" },
    { id: 5, name: "Propofol", department: "ICU", currentStock: 8, minThreshold: 30, status: "critical" },
  ],
  staff: [
    { id: "er", departmentKey: "er", doctors: 8, nurses: 15, activePatients: 42, status: "overloaded" },
    { id: "icu", departmentKey: "icu", doctors: 5, nurses: 12, activePatients: 18, status: "busy" },
    { id: "surgery", departmentKey: "surgery", doctors: 10, nurses: 20, activePatients: 25, status: "balanced" },
    { id: "internal", departmentKey: "internalMedicine", doctors: 6, nurses: 18, activePatients: 50, status: "busy" },
  ]
};
