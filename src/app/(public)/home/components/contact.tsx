import { Section } from "@/components/public/section/section";

export function Contact() {
  return (
    <Section bgColor="zinc-900" title="Onde estamos" id="contact">
      <div className="flex flex-col justify-center md:flex-row w-full gap-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.082632178024!2d-122.4194154846819!3d37.77492927975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c7e24c85b%3A0x6b68a63a4b7b1c1b!2sSan%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sbr!4v1632779076145!5m2!1sen!2sbr"
          height="500"
          loading="lazy"
          title="Mapa"
          className="rounded-lg shadow-md w-full max-w-[800px]"
        ></iframe>

        <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-white flex flex-col">
          <h3 className="text-2xl font-bold mb-4">Informações de Contato</h3>
          <p className="mb-2">
            <strong>Endereço:</strong> Rua Exemplo, 123 - Cidade, Estado
          </p>
          <p className="mb-2">
            <strong>Telefone:</strong> (11) 1234-5678
          </p>
          <p className="mb-2">
            <strong>E-mail:</strong> contato@exemplo.com
          </p>
        </div>
      </div>
    </Section>
  );
}
