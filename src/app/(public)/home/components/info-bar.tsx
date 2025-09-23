import { infoBarIconsMap } from "@/app/admin/(private)/layout/components/info-bar/info-bar-icons";
import { LayoutInfoBarConfig } from "@/types/layout-component";
import Link from "next/link";

type InfoBarProps = {
  previewMode?: boolean;
} & (Required<Pick<LayoutInfoBarConfig, "items">> &
  Partial<LayoutInfoBarConfig>);

export function InfoBar({
  active = true,
  items = [],
  previewMode = false,
}: InfoBarProps) {
  const shouldShow = (items.length > 0 && active) || previewMode;

  return shouldShow ? (
    <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-12 gap-4 bg-zinc-900 text-gray-400 lg:h-28 border-b border-t border-zinc-800 px-2 lg:px-0 lg:py-0 py-5">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {items.map((item, index) => {
          const Icon = item.icon ? infoBarIconsMap[item.icon] : null;

          return (
            <Link
              href={item.link ?? "#"}
              key={index}
              className="flex items-center gap-3 text-center lg:text-start"
            >
              {Icon && <Icon size={30} className="text-gray-300" />}
              <div className="flex flex-col">
                {item.title && (
                  <p className="text-lg font-bold">{item.title}</p>
                )}
                {item.description && (
                  <p className="text-sm">{item.description}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
}
