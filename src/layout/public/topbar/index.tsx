"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {
  isEnabled: boolean;
};

const data = [
  "Descontos imperdíveis em modelos selecionados!",
  "Avaliação gratuita do seu carro usado!",
  "Parcelas a partir de R$ 399,00!",
  "Garantia estendida de 5 anos em todos os modelos!",
  "Explore nossa linha de veículos elétricos e sustentáveis!",
];

export function TopBar({ isEnabled }: Props) {
  return isEnabled ? (
    <div className="flex justify-center items-center h-9 w-full bg-zinc-950 px-6 py-2">
      <Carousel
        plugins={[
          Autoplay({
            // delay: 3000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="text-white text-sm flex justify-center select-none"
            >
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ) : null;
}
