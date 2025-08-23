import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type VehicleImagesProps = React.ComponentProps<"div"> & {
  images?: string[];
};

export function VehicleImages({
  images = [],
  className,
  ...props
}: VehicleImagesProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeout = 5000; // 5 segundos

  function startAutoPlay() {
    if (!images.length) return;

    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSelectedImage((current) => {
        const currentIndex = images.indexOf(current);
        const nextIndex =
          currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        return images[nextIndex];
      });
    }, autoPlayTimeout);
  }

  useEffect(() => {
    startAutoPlay();
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [images]);

  return (
    <div className={twMerge("w-full", className)} {...props}>
      <Image
        src={selectedImage}
        alt="Foto do veículo selecionada"
        width={1920}
        height={1080}
        className="object-cover rounded-xl w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center"
        priority
      />

      <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`Miniatura ${i + 1}`}
            onClick={() => {
              setSelectedImage(img);
              startAutoPlay();
            }}
            width={160}
            height={90}
            className={twMerge(
              "h-16 rounded-lg bg-zinc-900/40 cursor-pointer object-cover hover:opacity-80 transition-opacity",
              selectedImage === img && "border-2 border-blue-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}
