import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScanSearchIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type VehicleImagesProps = React.ComponentProps<"div"> & {
  images?: string[];
};

export function VehicleImages({
  images = [],
  className,
  ...props
}: VehicleImagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeout = 5000; // 5 segundos

  const startAutoPlay = useCallback(() => {
    if (!images.length) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSelectedImage((current) => {
        const currentIndex = images.indexOf(current);
        const nextIndex =
          currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        return images[nextIndex];
      });
    }, autoPlayTimeout);
  }, [images]);

  useEffect(() => {
    if (!isModalOpen) {
      startAutoPlay();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, startAutoPlay, isModalOpen]);

  function onClickMiniatureImage(img: string) {
    setSelectedImage(img);
    startAutoPlay();
  }

  function renderSelectedImage() {
    if (!selectedImage) return null;
    return (
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative flex items-center justify-center"
      >
        <Image
          src={selectedImage}
          alt="Foto do veículo selecionada"
          width={1920}
          height={1080}
          className={twMerge(
            "object-cover rounded-xl w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center ",
            !isModalOpen &&
              "cursor-pointer transition-opacity group-hover:opacity-80"
          )}
          priority
        />
        <ScanSearchIcon
          className={twMerge(
            "absolute w-28 h-28 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300 cursor-pointer",
            isModalOpen && "hidden"
          )}
        />
      </div>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className={twMerge("w-full", className)} {...props}>
        <DialogContent className="p-0 border-none bg-transparent w-full max-w-6xl">
          <DialogTitle className="hidden" />
          {renderSelectedImage()}
        </DialogContent>
        {renderSelectedImage()}
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Miniatura ${i + 1}`}
              onClick={() => onClickMiniatureImage(img)}
              width={160}
              height={90}
              loading="lazy"
              className={twMerge(
                "h-16 rounded-lg bg-zinc-900/40 cursor-pointer object-cover hover:opacity-80 transition-opacity",
                selectedImage === img && "border-2 border-blue-500"
              )}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
