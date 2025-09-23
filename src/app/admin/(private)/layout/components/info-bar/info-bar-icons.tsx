import {
  BadgeInfoIcon,
  CarFrontIcon,
  CarIcon,
  CheckCheckIcon,
  CircleCheckIcon,
  CrownIcon,
  DollarSignIcon,
  FacebookIcon,
  GaugeIcon,
  GemIcon,
  HandshakeIcon,
  InstagramIcon,
  KeySquareIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  TrophyIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export const infoBarIcons = [
  { label: "facebook", value: "facebook", icon: FacebookIcon },
  { label: "instagram", value: "instagram", icon: InstagramIcon },
  { label: "twitter", value: "twitter", icon: TwitterIcon },
  { label: "youtube", value: "youtube", icon: YoutubeIcon },
  { label: "info", value: "info", icon: BadgeInfoIcon },
  { label: "phone", value: "phone", icon: PhoneIcon },
  { label: "handshake", value: "handshake", icon: HandshakeIcon },
  { label: "car", value: "car", icon: CarIcon },
  { label: "car-front", value: "car-front", icon: CarFrontIcon },
  { label: "double-check", value: "double-check", icon: CheckCheckIcon },
  { label: "circle-check", value: "circle-check", icon: CircleCheckIcon },
  { label: "trophy", value: "trophy", icon: TrophyIcon },
  { label: "crown", value: "crown", icon: CrownIcon },
  { label: "gem", value: "gem", icon: GemIcon },
  { label: "star", value: "star", icon: StarIcon },
  { label: "dollar", value: "dollar", icon: DollarSignIcon },
  { label: "gauge", value: "gauge", icon: GaugeIcon },
  { label: "key-square", value: "key-square", icon: KeySquareIcon },
  { label: "map-pin", value: "map-pin", icon: MapPinIcon },
];

export const infoBarIconsMap = Object.fromEntries(
  infoBarIcons.map(({ value, icon }) => [value, icon])
);
