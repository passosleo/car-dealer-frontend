import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";
import { Role } from "../../roles/types/roles";
import { Switch } from "@/components/ui/switch";
import { TextNormal } from "@/components/admin/text/text-normal";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { UseFormReturn } from "react-hook-form";

type ProfileFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
  roles: Role[];
  form: UseFormReturn<{
    name: string;
    roles: Pick<Role, "roleId">[];
  }>;
};

export function ProfileFormContent({
  form,
  roles,
  isLoading,
  additionalButton,
}: ProfileFormContentProps) {
  const router = useRouter();

  const selectedRoles = form.watch("roles");

  if (!selectedRoles) {
    form.setValue("roles", []);
  }

  function onRoleChange(roleId: string) {
    const isSelected = selectedRoles.some((role) => role.roleId === roleId);
    const updatedRoles = isSelected
      ? selectedRoles.filter((role) => role.roleId !== roleId)
      : [...selectedRoles, { roleId }];

    form.setValue("roles", updatedRoles);
    form.clearErrors("roles");
    form.trigger("roles");
  }

  return (
    <div className="flex flex-row gap-8 w-full">
      <div className="flex flex-col gap-2 w-full flex-wrap">
        <FormInput
          label="Nome"
          name="name"
          disabled={isLoading}
          leftIcon={<TypeIcon size={18} />}
        />

        <div className="flex flex-col gap-1">
          {roles.map((role) => (
            <label
              key={role.roleId}
              htmlFor={role.roleId}
              className="flex flex-row justify-between items-center gap-2 hover:bg-primary-foreground cursor-pointer transition-all p-2 rounded-md select-none"
            >
              <div>
                <TextSubheading className="text-sm">
                  {role.label}
                </TextSubheading>
                <TextNormal className="text-sm">{role.description}</TextNormal>
              </div>
              <Switch
                id={role.roleId}
                disabled={isLoading}
                defaultChecked={selectedRoles.some(
                  (selectedRole) => selectedRole.roleId === role.roleId
                )}
                onClick={() => onRoleChange(role.roleId)}
              />
            </label>
          ))}
        </div>

        <div className="text-destructive min-h-5 text-xs">
          {form.formState.errors.roles && (
            <span>{form.formState.errors.roles.message}</span>
          )}
        </div>

        <div className="flex flex-row gap-4 w-full mt-auto">
          {additionalButton ? additionalButton : <></>}

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
