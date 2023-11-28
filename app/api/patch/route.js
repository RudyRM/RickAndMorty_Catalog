const API_URL = "https://info104-2023-2-db.onrender.com";

// PATCH /api/comentarios/:id: Actualizar un comentario por ID

export async function actualizarComentario(id, nuevoComentario) {
  const res = await fetch(API_URL + "/api/comentarios/" + id, {
    method: "PUT",
    headers: {
        
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      comentario: nuevoComentario,
    }),
  });

  const data = await res.json();
  console.log("data de actualizarComentario " + data._id);

  return Response.json(data);
}
