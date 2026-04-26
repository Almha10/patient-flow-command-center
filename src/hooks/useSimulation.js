import { useState, useEffect } from 'react';
import { initialMockData } from '../data/mockData';

export function useSimulation() {
  const [data, setData] = useState(initialMockData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        // 1. Gradually change ER Count
        const erChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newERCount = Math.max(10, Math.min(100, prev.kpis.liveERCount + erChange));
        
        // 2. Gradually change Avg Triage Time
        const triageChange = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const newTriageTime = Math.max(5, Math.min(60, prev.kpis.avgTriageTime + triageChange));

        // 3. Update Bed Occupancy
        const newWards = prev.wards.map(ward => {
          // Small chance to change beds
          if (Math.random() > 0.6) {
            const bedChange = Math.floor(Math.random() * 3) - 1; // -1 to +1
            return {
              ...ward,
              occupiedBeds: Math.max(0, Math.min(ward.totalBeds, ward.occupiedBeds + bedChange))
            };
          }
          return ward;
        });

        const totalBeds = newWards.reduce((acc, w) => acc + w.totalBeds, 0);
        const totalOccupied = newWards.reduce((acc, w) => acc + w.occupiedBeds, 0);
        const newBedOccupancyPct = Math.round((totalOccupied / totalBeds) * 100);

        // 4. Update Pharmacy Stock (gradually decrease, occasionally restock)
        const newPharmacy = prev.pharmacy.map(med => {
          if (Math.random() > 0.5) {
            // consume 1-3 units
            const consumption = Math.floor(Math.random() * 3) + 1;
            let newStock = med.currentStock - consumption;
            
            // Auto restock if it hits 0
            if (newStock < 0) newStock = med.minThreshold + 20;

            let status = "normal";
            if (newStock <= med.minThreshold / 2) status = "critical";
            else if (newStock <= med.minThreshold) status = "low";

            return { ...med, currentStock: newStock, status };
          }
          return med;
        });

        const criticalMedsCount = newPharmacy.filter(m => m.status === 'critical').length;

        // 5. Update Staff Workload
        const newStaff = prev.staff.map(dept => {
          const ward = newWards.find(w => w.id === dept.id);
          const active = ward ? ward.occupiedBeds : dept.activePatients;
          
          let status = "balanced";
          const ratio = active / (dept.doctors + dept.nurses);
          if (ratio > 2.5) status = "overloaded";
          else if (ratio > 1.5) status = "busy";

          return { ...dept, activePatients: active, status };
        });

        // 6. Update ER Patients Waiting Time
        const newERPatients = prev.erPatients.map(pt => ({
          ...pt,
          waitTime: pt.waitTime + 1 // Add 1 min every interval simulating time passing
        }));

        return {
          ...prev,
          kpis: {
            liveERCount: newERCount,
            avgTriageTime: newTriageTime,
            bedOccupancyPct: newBedOccupancyPct,
            criticalMedicinesCount: criticalMedsCount,
          },
          wards: newWards,
          pharmacy: newPharmacy,
          staff: newStaff,
          erPatients: newERPatients
        };
      });
      
      setLastUpdated(new Date());
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return { data, lastUpdated };
}
