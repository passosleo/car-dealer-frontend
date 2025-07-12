const items = [
  {
    title: "Oportunidades Infinitas",
    description: "Oportunidades atualizadas",
  },
  {
    title: "Compra Segura",
    description: "Transparência e segurança",
  },
  {
    title: "Comunidade Superpoderosa",
    description: "Grupo exclusivo",
  },
];

export function Info() {
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-12 gap-4 bg-zinc-900 text-gray-400 lg:h-28 border-b border-t border-zinc-800 px-2 lg:px-0 lg:py-0 py-5">
      <div className="flex items-center gap-6">
        <div className="bg-zinc-950 rounded-full w-11 h-11 p-2" />
        <span className="text-sm">@mercedes</span>
      </div>
      <div className="bg-zinc-800 w-[1px] h-full" />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {items.map((item, index) => (
          <div key={index} className="text-center lg:text-start">
            <p className="text-lg font-bold">{item.title}</p>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
