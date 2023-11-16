import "@/styles/layout.css";

export const metadata = {
  title: "Comunicazione Aziendale",
  description: "Software Per La Comunicazione Aziendale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
