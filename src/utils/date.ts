import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM 'de' yy", { locale: ptBR });
}
