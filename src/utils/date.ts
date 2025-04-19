import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM 'de' yy", { locale: ptBR });
}

export function formatDateTime(date: string) {
  return moment.utc(date).format("D [de] MMM [de] YYYY [às] HH:mm");
}
