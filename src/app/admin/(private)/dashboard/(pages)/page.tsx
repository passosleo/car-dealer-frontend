"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextHeading } from "@/components/admin/text/text-heading";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const chartData = [
  { month: "Jan", desktop: 1200, mobile: 800 },
  { month: "Fev", desktop: 1500, mobile: 950 },
  { month: "Mar", desktop: 1800, mobile: 1300 },
  { month: "Abr", desktop: 2000, mobile: 1700 },
  { month: "Mai", desktop: 2400, mobile: 2100 },
  { month: "Jun", desktop: 2600, mobile: 2300 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--primary))" },
  mobile: { label: "Mobile", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig;

interface InfoCardProps {
  label: string;
  total: number;
  active: number;
}

const latestVehicles = [
  {
    vehicleId: "1",
    model: "Honda Civic 2020",
    active: true,
    createdAt: "04/07/2025",
  },
  {
    vehicleId: "2",
    model: "Jeep Renegade 2022",
    active: true,
    createdAt: "03/07/2025",
  },
  {
    vehicleId: "3",
    model: "Chevrolet Onix 2021",
    active: false,
    createdAt: "02/07/2025",
  },
];

const InfoCard = ({ label, total, active }: InfoCardProps) => {
  return (
    <Card className="text-secondary-foreground min-h-[140px] flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <TextHeading className="text-4xl leading-none">{total}</TextHeading>
        <div className="rounded-md bg-primary text-primary-foreground text-xs px-2 py-1 w-fit">
          {active} ativos
        </div>
      </CardContent>
    </Card>
  );
};

const LatestVehiclesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Últimos veículos cadastrados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestVehicles.map((vehicle, index) => (
          <Link
            href={`/admin/vehicles/${vehicle.vehicleId}`}
            key={index}
            className="flex items-center justify-between border-b py-2 text-muted-foreground hover:text-primary transition-all"
          >
            <div className="flex flex-col">
              <span className="font-medium text-sm text-primary">
                {vehicle.model}
              </span>
              <span className="text-xs text-muted-foreground">
                Cadastrado em {vehicle.createdAt}
              </span>
            </div>
            <ChevronRightIcon />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-4">
        <InfoCard label="Veículos" total={124} active={93} />
        <InfoCard label="Banners" total={124} active={93} />
        <InfoCard label="Categorias" total={7} active={6} />
        <InfoCard label="Marcas" total={15} active={12} />
        <InfoCard label="Vendedores" total={7} active={6} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Acessos por dispositivo (últimos 6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[250px] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent payload={{}} />} />
                <Bar dataKey="desktop" fill="hsl(var(--primary))" radius={4} />
                <Bar
                  dataKey="mobile"
                  fill="hsl(var(--muted-foreground))"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <LatestVehiclesCard />
      </div>
    </div>
  );
}
