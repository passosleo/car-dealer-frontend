import { useFormContext, UseFormReturn } from "react-hook-form";

type Props = {
  children: (methods: UseFormReturn) => React.ReactNode;
};

export function ConnectForm({ children }: Props) {
  const methods = useFormContext();
  return children({ ...methods });
}
