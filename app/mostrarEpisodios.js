"use client";

// Importe Funciones React
import { useEffect, useState } from "react";

// Importe Elementos Chakra
import {
  ListItem,
} from "@chakra-ui/react";

  function MostrarEpisodios({ info }) {
    const [episodios, setEpisodios] = useState("");
  
    // useEffect se ejecuta cada vez que el valor de episodios cambie
    useEffect(() => {
      // Que la función sea async permite utilizar await
      const CambioEpisodios = async () => {
        const response = await fetch(info, { method: "GET" });
        const data = await response.json();
        setEpisodios(data);
      };
      CambioEpisodios();
    }, [episodios]);
  
    return (
      <ListItem>
        {episodios.episode} ( {episodios.air_date} ); {episodios.name}
      </ListItem>
    );
  }
  export { MostrarEpisodios };