import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react";

export const ToasterIcons = {
  error: <CircleXIcon size={20} className="text-secondary" />,
  success: <CircleCheckIcon size={20} className="text-secondary" />,
  info: <InfoIcon size={20} className="text-secondary" />,
  warning: <CircleAlertIcon size={20} className="text-secondary" />,
};
