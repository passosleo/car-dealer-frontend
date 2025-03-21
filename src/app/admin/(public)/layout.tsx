export default function AdminPublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat bg-primary"
      // style={{ backgroundImage: "url('/images/login-background-3.jpg')" }}
    >
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </main>
  );
}
