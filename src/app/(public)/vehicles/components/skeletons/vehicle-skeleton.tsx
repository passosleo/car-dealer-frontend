import { Card, CardContent } from "@/components/ui/card";

type VehicleSkeletonProps = {
  count?: number;
};

export function VehicleSkeleton({ count = 1 }: VehicleSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="bg-zinc-800 transition-colors border border-none shadow-lg h-fit animate-pulse"
        >
          <CardContent className="p-4">
            <div className="relative w-full h-[200px] bg-zinc-700 rounded-xl" />
            <div className="mt-2 h-5 w-3/4 bg-zinc-700 rounded" />
            <div className="mt-1 h-4 w-full bg-zinc-700 rounded" />
            <div className="mt-3 h-6 w-1/2 bg-zinc-700 rounded" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
