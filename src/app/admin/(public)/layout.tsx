export default function AdminPublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen">
      <h1>Public Admin Layout</h1>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </main>
  );
}
