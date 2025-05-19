import React from "react";
import { Card } from "@/components/ui/card";
import { ListPlusIcon, PencilLineIcon } from "lucide-react";
import Link from "next/link";
import { Vehicle as VehicleType } from "../types/vehicle";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/date";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { DeleteVehicleButton } from "./delete-vehicle-button";
import { formatInlineInfo } from "@/utils/string";
import { Tag } from "@/components/admin/tag/tag";

const Vehicle = React.forwardRef<HTMLDivElement, VehicleType>(
  (vehicle, ref) => {
    return (
      <div className="relative">
        <Link href={`/admin/vehicles/${vehicle.vehicleId}`} passHref>
          <Card
            ref={ref}
            className="flex flex-col gap-2 p-2 hover:bg-primary-foreground cursor-pointer transition-all"
          >
            <div className="flex gap-4">
              <Image
                src={vehicle.vehicleImages[0]} // TODO: ajustar
                alt={vehicle.model}
                width={1920}
                height={1080}
                objectFit="contain"
                className="w-36 h-36 rounded-md border border-border object-contain"
              />

              <div className="flex flex-col w-full justify-between">
                <div>
                  <Tag className="bg-secondary text-secondary-foreground">
                    {vehicle.brand.name}
                  </Tag>
                  <TextSubheading>{vehicle.model}</TextSubheading>

                  <TextNormal className="text-xs">
                    {formatInlineInfo(
                      vehicle.year,
                      vehicle.transmission,
                      vehicle.color,
                      vehicle.mileage &&
                        `${vehicle.mileage
                          .toString()
                          .replace(".", ",")
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} km`,
                      vehicle.plate,
                      vehicle.price &&
                        `R$ ${vehicle.price
                          .toString()
                          .replace(".", ",")
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
                    )}
                  </TextNormal>

                  <ActiveTag active={vehicle.active} />
                </div>

                <Separator />

                <div className="flex flex-col gap-0.5">
                  <TextNormal className="text-xs">
                    <ListPlusIcon size={14} />
                    Cadastrado em {formatDate(vehicle.createdAt)}
                  </TextNormal>
                  <TextNormal className="text-xs">
                    <PencilLineIcon size={14} />
                    Atualizado em {formatDate(vehicle.updatedAt)}
                  </TextNormal>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <DeleteVehicleButton vehicleId={vehicle.vehicleId} />
      </div>
    );
  }
);

Vehicle.displayName = "Vehicle";

export { Vehicle };
