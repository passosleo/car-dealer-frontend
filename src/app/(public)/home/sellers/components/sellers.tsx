"use client";

import { WhatsappIcon } from "@/assets/icons/Whatsapp";
import { Section } from "../../components/section";
import { useListActiveSellersService } from "../services/use-list-active-sellers-service";

export function Sellers() {
  const { sellers } = useListActiveSellersService({
    page: 1,
    limit: 100,
  });
  return (
    <Section bgColor="zinc-950" id="sellers">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Dúvidas?</h2>
          <p className="text-lg text-gray-300">
            Entre em contato com a nossa equipe de vendas
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {sellers.map((seller) => (
            <div
              key={seller.sellerId}
              className="bg-zinc-900 rounded-lg shadow-md px-4 py-7 flex flex-col items-center transition-transform transform hover:scale-105 max-w-64"
            >
              <div className="w-16 h-16 mb-4 bg-white rounded-full overflow-hidden">
                {/* <SellerAvatar name={`${employee.firstName} ${employee.lastName}`} /> */}
              </div>
              <p className="text-xl font-semibold text-white">{`${seller.firstName} ${seller.lastName}`}</p>
              <p className="text-gray-300 text-sm mb-2">{seller.email}</p>
              <a
                href={`https://wa.me/${seller.phone}?text=${seller.customMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition flex items-center gap-2"
              >
                <WhatsappIcon className="w-5 h-5 inline-block" /> Falar com{" "}
                {seller.firstName}
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
