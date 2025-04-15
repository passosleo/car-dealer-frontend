import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM 'de' yy", { locale: ptBR });
}

export function formatDateTime(date: string) {
  return format(new Date(date), "d 'de' MMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });
}
