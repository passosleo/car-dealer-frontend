import { Section } from "../components/section";
import { Shelf } from "../components/shelf";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const cars = [
  {
    id: 1,
    name: 'Mercedes-Benz',
    model: 'Classe A 200 1.3 Turbo',
    price: 'R$200.000.000',
    imageUrl: 'https://cdn.motor1.com/images/mgl/40NNkq/s1/2025-mercedes-amg-glc63-s-e-performance.jpg',
  },
  {
    id: 2,
    name: 'BMW',
    model: 'X3 M50 3.0 Turbo',
    price: 'R$159.800.000',
    imageUrl: 'https://cdn.oantagonista.com/uploads/2024/10/videoframe_3533-1024x683.png',
  },
  {
    id: 3,
    name: 'Mercedes-Benz',
    model: 'Classe A 200 1.3 Turbo',
    price: 'R$200.000.000',
    imageUrl: 'https://cdn.motor1.com/images/mgl/40NNkq/s1/2025-mercedes-amg-glc63-s-e-performance.jpg',
  },
  {
    id: 4,
    name: 'BMW',
    model: 'X3 M50 3.0 Turbo X3 M50 3.0 Turbo X3 M50 3.0 Turbo',
    price: 'R$159.800.000',
    imageUrl: 'https://cdn.oantagonista.com/uploads/2024/10/videoframe_3533-1024x683.png',
  },
  {
    id: 5,
    name: 'Mercedes-Benz',
    model: 'Classe A 200 1.3 Turbo',
    price: 'R$200.000.000',
    imageUrl: 'https://cdn.motor1.com/images/mgl/40NNkq/s1/2025-mercedes-amg-glc63-s-e-performance.jpg',
  },
  {
    id: 6,
    name: 'BMW',
    model: 'X3 M50 3.0 Turbo X3 M50 3.0 Turbo X3 M50 3.0 Turbo',
    price: 'R$159.800.000',
    imageUrl: 'https://cdn.oantagonista.com/uploads/2024/10/videoframe_3533-1024x683.png',
  },
];

export function Opportunities() {
  return (
    <Section bgColor="zinc-950" id="opportunities" >
      <div className="flex items-center justify-between gap-10 flex-wrap">
        <div className="text-white 2xl:max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-blue-500" />
            <p className="font-light text-gray-400">Oportunidades</p>
          </div>
          <h2 className="text-4xl font-bold mb-3">Veja algumas oportunidades </h2>
          <p className="text-base">Você terá acesso a muitas ofertas, todas com os melhores preços do brasil!</p>
        </div>

        <Carousel className="max-w-80 lg:max-w-[63rem] mx-auto">
          <CarouselContent>
            {cars.map((car) => (
              <CarouselItem key={car.id} className=" lg:basis-1/3">
                <Shelf car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute md:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
          <CarouselNext className="absolute md:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
        </Carousel>
      </div>
    </Section>
  )
}