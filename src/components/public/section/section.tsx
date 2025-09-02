import { TitleSection } from "@/components/public/section/title-section";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  title?: string;
  bgColor: string;
  positionBlur?: "left" | "right" | undefined;
  children: React.ReactNode;
};

export function Section({
  positionBlur,
  bgColor,
  title,
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
          className={`h-52 w-72 absolute opacity-50 bg-gray-700 ${blur} blur-3xl rounded-full z-10`}
        />
      )}
      <div className="flex flex-col gap-6 max-w-9xl w-full z-10">
        {title && <TitleSection title={title} />}
        <div className="flex flex-wrap gap-8">{children}</div>
      </div>
    </section>
  );
}
