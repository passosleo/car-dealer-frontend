export type Banner = {
  bannerId;
  title: string;
  imageDesktopUrl: string;
  imageMobileUrl: string;
  startAt: string | null;
  endAt: string | null;
  visible: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
