"use client";

import {
    ListItem,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";

function MostrarEpisodios({info}){
    const [episodios, setEpisodios] = useState("");
  
    useEffect(() => {
      const CambioEpisodios = async () => {
        const response = await fetch(info, { method: "GET" });
        const data = await response.json();
        setEpisodios(data);
      }
      CambioEpisodios();
    }, [episodios]);
    
    return(
      <ListItem>
        {episodios.episode} ( {episodios.air_date} ); {episodios.name}
      </ListItem>
    )
  }
  export {MostrarEpisodios}