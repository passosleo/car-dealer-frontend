"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Headphones,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";

type FooterProps = React.HTMLAttributes<HTMLElement>;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={twMerge(
        "border-t border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-300",
        className
      )}
      {...props}
    >
      {/* CTA topo */}
      {/* <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-6">
          <div>
            <p className="text-sm text-zinc-400">Receba ofertas</p>
            <h3 className="text-2xl font-bold text-zinc-100">
              Fique por dentro das melhores oportunidades
            </h3>
          </div>

          <form
            className="flex w-full max-w-xl items-center gap-3"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Inscrever-se para receber ofertas"
          >
            <div className="relative w-full">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Inscrever
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div> */}

      {/* Selos rápidos */}
      <div className="pt-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Badge
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Compra segura"
            subtitle="Site protegido e política de transparência"
          />
          <Badge
            icon={<Truck className="h-5 w-5" />}
            title="Veículos inspecionados"
            subtitle="Anúncios verificados e atualizados"
          />
          <Badge
            icon={<Headphones className="h-5 w-5" />}
            title="Atendimento ágil"
            subtitle="Fale pelo WhatsApp ou e-mail"
          />
        </div>
      </div>

      {/* Grade principal */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-zinc-400">
              Plataforma moderna para revendedores locais com foco em
              personalização, performance e autonomia.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Social href="#" label="Instagram">
                <Instagram className="h-4 w-4" />
              </Social>
              <Social href="#" label="Facebook">
                <Facebook className="h-4 w-4" />
              </Social>
              <Social href="#" label="YouTube">
                <Youtube className="h-4 w-4" />
              </Social>
              <Social href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Social>
            </div>
          </div>

          <FooterCol title="Navegação">
            <FooterLink href="/">Início</FooterLink>
            <FooterLink href="/vehicles">Veículos</FooterLink>
            <FooterLink href="/brands">Marcas</FooterLink>
            <FooterLink href="/sellers">Vendedores</FooterLink>
            <FooterLink href="/about">Sobre</FooterLink>
          </FooterCol>

          <FooterCol title="Categorias">
            <FooterLink href="/vehicles?category=Hatch">Hatch</FooterLink>
            <FooterLink href="/vehicles?category=Sedan">Sedan</FooterLink>
            <FooterLink href="/vehicles?category=SUV">SUV</FooterLink>
            <FooterLink href="/vehicles?category=Pickup">Pickup</FooterLink>
            <FooterLink href="/vehicles?category=Utilitário">
              Utilitário
            </FooterLink>
          </FooterCol>

          <FooterCol title="Contato">
            <FooterLine icon={<Phone className="h-4 w-4" />}>
              (51) 99999-0000
            </FooterLine>
            <FooterLine icon={<Mail className="h-4 w-4" />}>
              contato@revenda.com.br
            </FooterLine>
            <FooterLine icon={<MapPin className="h-4 w-4" />}>
              Av. Exemplo, 123 — Taquara/RS
            </FooterLine>
          </FooterCol>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Revenda Local. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-300 transition-colors"
            >
              Termos
            </Link>
            <Link
              href="/contact"
              className="hover:text-zinc-300 transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Subcomponentes ---------- */

function Logo() {
  return (
    <div className="inline-flex select-none items-center gap-2">
      {/* Se tiver teu logo em <Image />, troca aqui */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
        <span className="text-sm font-bold text-zinc-200">RL</span>
      </div>
      <span className="text-lg font-bold text-zinc-100">Revenda Local</span>
    </div>
  );
}

function Badge({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-blue-500">
        {icon}
      </div>
      <div>
        <p className="font-medium text-zinc-100">{title}</p>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-300 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterLine({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-zinc-300">
      <span className="text-zinc-500">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function Social({
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
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200"
    >
      {children}
    </Link>
  );
}
