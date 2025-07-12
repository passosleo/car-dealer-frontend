export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col h-screen bg-zinc-900">{children}</main>;
}
