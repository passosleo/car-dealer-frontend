"use client";

import Link from "next/link";
import { Section } from "@/components/public/section/section";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";

export function Contact() {
  // dados fixos
  const address = "Rua Exemplo, 123 — Cidade, Estado";
  const phoneDisplay = "(11) 1234-5678";
  const phoneLink = "551112345678";
  const email = "contato@exemplo.com";
  const hours = "Seg a Sex — 8h às 18h";

  const mapsQuery = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;

  return (
    <Section bgColor="zinc-900" title="Onde estamos" id="contact">
      <div className="mx-auto w-full px-4">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {/* MAPA */}
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 ring-1 ring-zinc-800/60">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="h-[320px] md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.082632178024!2d-122.4194154846819!3d37.77492927975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c7e24c85b%3A0x6b68a63a4b7b1c1b!2sSan%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sbr!4v1632779076145!5m2!1sen!2sbr"
                loading="lazy"
                title="Mapa"
                className="h-full w-full"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* CARD DE CONTATO */}
          <div className="rounded-2xl bg-zinc-950/70 p-6 text-zinc-200 shadow-xl ring-1 ring-zinc-800/60 flex h-full flex-col">
            <header>
              <h3 className="text-2xl font-semibold text-white">
                Informações de contato
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Fale com a equipe ou venha nos visitar.
              </p>
            </header>

            {/* conteúdo dividido em 2 colunas */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 flex-1">
              {/* Coluna 1: dados */}
              <div>
                <ul className="space-y-4">
                  <InfoLine
                    icon={<MapPin className="h-5 w-5" />}
                    label={address}
                  />
                  <InfoLine
                    icon={<Phone className="h-5 w-5" />}
                    label={
                      <Link
                        href={`tel:${phoneLink}`}
                        className="hover:underline"
                      >
                        {phoneDisplay}
                      </Link>
                    }
                  />
                  <InfoLine
                    icon={<Mail className="h-5 w-5" />}
                    label={
                      <Link
                        href={`mailto:${email}`}
                        className="hover:underline"
                      >
                        {email}
                      </Link>
                    }
                  />
                  <InfoLine
                    icon={<Clock className="h-5 w-5" />}
                    label={hours}
                  />
                </ul>
              </div>

              {/* Coluna 2: ações/redes */}
              <div className="flex flex-col justify-between gap-6">
                <Link
                  href={mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
                >
                  <Navigation className="h-4 w-4" />
                  Traçar rota
                </Link>

                <div>
                  <p className="mb-3 text-sm text-zinc-400">Nossas redes</p>
                  <div className="flex gap-3">
                    <SocialIcon href="#" label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </SocialIcon>
                    <SocialIcon href="#" label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </SocialIcon>
                    <SocialIcon href="#" label="YouTube">
                      <Youtube className="h-4 w-4" />
                    </SocialIcon>
                    <SocialIcon href="#" label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </SocialIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Subcomponentes ---------- */
function InfoLine({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-blue-400">
        {icon}
      </span>
      <span className="text-sm leading-6 text-zinc-300">{label}</span>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
    >
      {children}
    </Link>
  );
}
