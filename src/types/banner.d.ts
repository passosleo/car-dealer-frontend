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

export type CreateBannerRequest = {
  title: string;
  imageDesktop: string;
  imageMobile: string;
  startAt: Date | string | null;
  endAt: Date | string | null;
  active: boolean;
};

export type UpdateBannerRequest = {
  title: string;
  imageDesktop: string;
  imageMobile: string;
  startAt: Date | string | null;
  endAt: Date | string | null;
  active: boolean;
};
