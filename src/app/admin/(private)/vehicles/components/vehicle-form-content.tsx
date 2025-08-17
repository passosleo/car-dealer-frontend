import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { FormMultiImagePicker } from "@/components/admin/form/form-multi-image-picker";
import { FormSelectPaginatedSearch } from "@/components/admin/form/form-select-paginated-search";
import { useListBrandsService } from "../../brands/services/use-list-brands-service";
import { useListCategoriesService } from "../../categories/services/use-list-categories-service";
import { formatInput } from "@/utils/input";
import { useFormContext } from "react-hook-form";
import { TextNormal } from "@/components/admin/text/text-normal";
import { FormSelect } from "@/components/admin/form/form-select";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

type VehicleFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function VehicleFormContent({
  isLoading,
  additionalButton,
}: VehicleFormContentProps) {
  const router = useRouter();
  const hookFormMethods = useFormContext();

  const [currentBrandPage, setCurrentBrandPage] = useState(1);
  const [brands, setBrands] = useState<Brand[]>([]);

  const { totalPages: totalBrandsPages, isPending: isBrandsLoading } =
    useListBrandsService(
      {
        limit: 100,
        page: currentBrandPage,
      },
      {
        onSuccess: (res) => {
          setBrands((prev) => {
            const existingIds = new Set(prev.map((p) => p.brandId));
            const newItems = res.data.items.filter(
              (item) => !existingIds.has(item.brandId)
            );
            return [...prev, ...newItems];
          });
        },
      }
    );

  function onLoadMoreBrands() {
    if (currentBrandPage < totalBrandsPages) {
      setCurrentBrandPage((prev) => prev + 1);
    }
  }

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const { totalPages: totalCategoriesPages, isPending: isCategoriesLoading } =
    useListCategoriesService(
      {
        limit: 100,
        page: currentCategoryPage,
      },
      {
        onSuccess: (res) => {
          setCategories((prev) => {
            const existingIds = new Set(prev.map((p) => p.categoryId));
            const newItems = res.data.items.filter(
              (item) => !existingIds.has(item.categoryId)
            );
            return [...prev, ...newItems];
          });
        },
      }
    );

  function onLoadMoreCategories() {
    if (currentCategoryPage < totalCategoriesPages) {
      setCurrentCategoryPage((prev) => prev + 1);
    }
  }

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4 xl:gap-4 w-full">
      <div className="w-full xl:max-w-[365px] flex-shrink-0 flex justify-center xl:justify-start">
        <FormMultiImagePicker
          label="Imagens"
          name="vehicleImages"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-4 flex-1 w-full">
        <FormInput label="Modelo" name="model" disabled={isLoading} autoFocus />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Ano"
            name="year"
            type="number"
            disabled={isLoading}
            onChange={(e) => formatInput(e, { mask: "0000" }, hookFormMethods)}
          />
          <FormInput
            label="Placa"
            name="plate"
            disabled={isLoading}
            onChange={(e) =>
              formatInput(
                e,
                {
                  mask: "***-****",
                  prepareChar: (char) => char.toUpperCase(),
                  definitions: {
                    "*": /[A-Za-z0-9]/,
                  },
                },
                hookFormMethods
              )
            }
          />
          <FormSelectPaginatedSearch
            label="Marca"
            name="brandId"
            data={brands.map((brand) => ({
              label: brand.name,
              value: brand.brandId,
            }))}
            onLoadMore={onLoadMoreBrands}
            isLoading={isBrandsLoading}
            currentPage={currentBrandPage}
            totalPages={totalBrandsPages}
            disabled={isLoading}
          />

          <FormSelectPaginatedSearch
            label="Categoria"
            name="categoryId"
            data={categories.map((category) => ({
              label: category.name,
              value: category.categoryId,
            }))}
            onLoadMore={onLoadMoreCategories}
            isLoading={isCategoriesLoading}
            currentPage={currentBrandPage}
            totalPages={totalCategoriesPages}
            disabled={isLoading}
          />
        </div>

        <FormTextArea
          label="Descrição"
          name="description"
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Preço"
            name="price"
            leftIcon={<TextNormal className="text-sm">R$</TextNormal>}
            disabled={isLoading}
            type="number"
          />
          <FormInput
            label="Quilometragem"
            name="mileage"
            rightIcon={<TextNormal className="text-sm">km</TextNormal>}
            disabled={isLoading}
          />
          <FormInput label="Cor" name="color" disabled={isLoading} />
          <FormSelect
            label="Transmissão"
            name="transmission"
            data={[
              { label: "Manual", value: "MANUAL" },
              { label: "Automática", value: "AUTOMATIC" },
              { label: "Semi-Automática", value: "SEMI-AUTOMATIC" },
            ]}
            disabled={isLoading}
            allowClear
          />
          <FormSelect
            label="Combustível"
            name="fuelType"
            data={[
              { label: "Gasolina", value: "GASOLINE" },
              { label: "Álcool", value: "ETHANOL" },
              { label: "Diesel", value: "DIESEL" },
              { label: "Elétrico", value: "ELECTRIC" },
              { label: "Híbrido", value: "HYBRID" },
              { label: "GNV", value: "CNG" },
              { label: "Flex", value: "FLEX" },
            ]}
            disabled={isLoading}
            allowClear
          />
          <FormSelect
            label="Tração"
            name="driveTrain"
            data={[
              { label: "Dianteira (FWD)", value: "FWD" },
              { label: "Traseira (RWD)", value: "RWD" },
              { label: "Integral (AWD)", value: "AWD" },
              { label: "Tração 4x4 (4WD)", value: "4WD" },
            ]}
            disabled={isLoading}
            allowClear
          />
          <FormInput
            label="Portas"
            name="doors"
            type="number"
            disabled={isLoading}
          />
          <FormInput
            label="Assentos"
            name="seats"
            type="number"
            disabled={isLoading}
          />
          <FormInput
            label="Potência"
            name="horsepower"
            type="number"
            disabled={isLoading}
            rightIcon={<TextNormal className="text-sm">cv</TextNormal>}
          />
          <FormInput
            label="Torque"
            name="torque"
            type="number"
            disabled={isLoading}
            rightIcon={<TextNormal className="text-sm">kgfm</TextNormal>}
          />
        </div>

        <FormSwitch
          label="Ativo"
          name="active"
          defaultChecked
          disabled={isLoading}
        />

        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          {additionalButton ?? <></>}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isLoading}
            onClick={() => router.back()}
          >
            <XIcon />
            Cancelar
          </Button>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle color="secondary" /> : <SaveIcon />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
