// Importe diseño
import "./globals.css";
import './botones.css'
import './cartas.css'
import './grilla.css'
import './modal.css'
import './barras.css'

import { Providers } from "@/app/providers/provider";

export const metadata = {
  title: "Rick and Morty Catalog",
  description: "Página de búsqueda de información sobre personajes de Rick and Mort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
