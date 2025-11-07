import { TitleSection } from "@/components/public/section/title-section";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  title?: string;
  subtitle?: string;
  bgColor: string;
  positionBlur?: "left" | "right" | undefined;
  children: React.ReactNode;
};

export function Section({
  positionBlur,
  bgColor,
  title,
  subtitle,
  children,
  className,
  ...props
}: Props) {
  const blur = positionBlur === "left" ? "left-[15%]" : "right-[15%]";

  return (
    <section
      {...props}
      className={twMerge(
        `relative flex flex-col items-center justify-center py-12 px-6 bg-${bgColor}`,
        className
      )}
    >
      {positionBlur && (
        <div
          className={`h-52 w-72 absolute opacity-50 bg-gray-700 ${blur} blur-3xl rounded-full`}
        />
      )}
      <div className="flex flex-col gap-6 max-w-9xl w-full">
        <div className="flex flex-col gap-1">
          {title && <TitleSection title={title} />}
          {subtitle && <p className="text-gray-400 max-w-3xl">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap gap-8">{children}</div>
      </div>
    </section>
  );
}
