import Image from "next/image";

type Props = {
  car: {
    name: string;
    model: string;
    price: string;
    imageUrl: string;
  };
};

export function Shelf({ car }: Props) {
  const { name, model, price, imageUrl } = car;

  return (
    <div className="w-80 h-full flex flex-col gap-1 text-white">
      <div className="h-48 mb-3">
        <Image src={imageUrl} alt={name} width={320} height={300} className="object-cover w-full h-full rounded-lg transition-transform transform hover:scale-105" />
      </div>
      <p className="text-2xl font-bold truncate">{name}</p>
      <div className="flex justify-between gap-4 text-gray-500">
        <p className="truncate">{model}</p>
        <p>{price}</p>
      </div>
    </div>
  )
}