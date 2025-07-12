'use client';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const banners = [
  {
    id: 1,
    title: 'Banner 1',
    isActive: true,
    imageDesktop: 'https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
    imageMobile: 'https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
  },
  {
    id: 2,
    title: 'Banner 2',
    isActive: false,
    imageDesktop: 'https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
    imageMobile: 'https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
  },
  {
    id: 3,
    title: 'Banner 3',
    isActive: false,
    imageDesktop: 'https://assets.volkswagen.com/is/image/volkswagenag/banner_nivus_1920x1080_2?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
    imageMobile: ''
  },
  {
    id: 4,
    title: 'Banner 4',
    isActive: false,
    imageDesktop: '',
    imageMobile: 'https://cdn2.storyasset.link/cv9bbWaP9vT5k8Uc07Eu4mOyH2D3/ms-fucaidygzj.jpg'
  },
]

export function Banners() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner, index) => {
          const imageSrc = windowWidth >= 768 ? banner.imageDesktop : banner.imageMobile;

          if (!imageSrc) {
            return null;
          }

          return (
            <CarouselItem key={index} className="relative flex justify-center items-center h-[300px] md:h-[550px]">
              <Image
                src={imageSrc}
                alt={`Banner ${index + 1}`}
                layout="fill" // Usando fill para preencher o contêiner
                className="object-cover w-full h-full" // Preenche o contêiner
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition" />
    </Carousel>
  )
}