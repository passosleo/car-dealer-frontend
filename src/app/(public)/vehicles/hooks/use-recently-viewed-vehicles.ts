import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Vehicle } from "@/types/vehicle";

export function useRecentlyViewedVehicles() {
  const storeKey = "recently-viewed-vehicles";
  const maxItems = 3;
  const { getStoredData, storeData } = useLocalStorage();

  const [recentlyViewedVehicles, setRecentlyViewedVehicles] = useState<
    Vehicle[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const vehicles = getStoredData<Vehicle[]>(storeKey, []);
    setRecentlyViewedVehicles(vehicles);
    setIsLoading(false);
  }, [getStoredData]);

  function saveRecentlyViewedVehicle(vehicle: Vehicle) {
    const accessedVehicles = getStoredData<Vehicle[]>(storeKey, []);

    const filteredVehicles = accessedVehicles.filter(
      (v) => v.vehicleId !== vehicle.vehicleId
    );

    const updatedAccessedVehicles = [vehicle, ...filteredVehicles].slice(
      0,
      maxItems
    );

    storeData(storeKey, updatedAccessedVehicles);
    setRecentlyViewedVehicles(updatedAccessedVehicles);
  }

  return { recentlyViewedVehicles, isLoading, saveRecentlyViewedVehicle };
}
