import { Suspense } from "react";
import { VehicleDetails } from "../../components/vehicle-details";


export default async function VehicleDetailsPage() {
  return (
    <Suspense>
      <main className="w-full bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <VehicleDetails />
        </div>
      </main>
    </Suspense>
  );
}


