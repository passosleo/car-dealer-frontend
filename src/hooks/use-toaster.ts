import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { ToasterIcons } from "../components/admin/toaster/toaster-icons";

export function useToaster() {
  const className = "text-secondary text-sm";
  const progressClassName = "bg-secondary";

  function error(message: string) {
    toast.error(message, {
      className: twMerge(className, "bg-[#d9534f]"),
      progressClassName,
      icon: ToasterIcons.error,
    });
  }

  function success(message: string) {
    toast.success(message, {
      className: twMerge(className, "bg-[#5cb85c]"),
      progressClassName,
      icon: ToasterIcons.success,
    });
  }

  function info(message: string) {
    toast.info(message, {
      className: twMerge(className, "bg-[#5bc0de"),
      progressClassName,
      icon: ToasterIcons.info,
    });
  }

  function warning(message: string) {
    toast.warning(message, {
      className: twMerge(className, "bg-[#f0ad4e]"),
      progressClassName,
      icon: ToasterIcons.warning,
    });
  }

  return { error, success, info, warning };
}
