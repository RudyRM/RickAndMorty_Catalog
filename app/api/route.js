import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://rickandmortyapi.com/api/character"
  );
  // Fetch: Solicitamos los datos a la API
  // next: { revalidate: 30 } => Cada 30 segundos se volverá a solicitar los datos a la API; Esto es en caso de que los datos cambien con el tiempo

  const data = await res.json();
  return NextResponse.json(data);
}
