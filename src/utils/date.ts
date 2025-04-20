import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM 'de' yy", { locale: ptBR });
}

export function formatDateTime(date: string) {
  const utcDate = toZonedTime(date, "UTC");
  return format(utcDate, "d 'de' MMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });
}
