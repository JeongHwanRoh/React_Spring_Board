import NavBar from "@/components/common/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <main className="max-w-screen-md min-w-[320px] mx-auto">
        <NavBar />
        {children}
        </main>
      </body>
    </html>
  );
}
