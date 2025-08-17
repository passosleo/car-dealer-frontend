import { WhatsappIcon } from "@/assets/icons/Whatsapp";

const data = {
  phone: '11999999999',
  message: 'Olá, gostaria de saber mais sobre...',
}

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${data.phone}?text=${data.message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition w-12 h-12 fixed bottom-5 right-5 z-50 flex items-center justify-center"
    >
      <WhatsappIcon className="w-7 h-7 inline-block" />
    </a>
  )
}