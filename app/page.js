"use client";
import Image from "next/image";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
// useState: Para manejar estados de variables
// useEffect: Para manejar efectos secundarios, similar a un "listener": es decir, podemos ejecutar código cuando algo cambia

export default function Ejemplo7() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect tiene dos parámetros:
  // 1. Una función que se ejecuta cuando se monta el componente => Lo que va en " {  } "
  // 2. Una lista de dependencias, que son las variables que se deben monitorear para ejecutar la función => Lo que va en " [] "
  useEffect(() => {
    console.log("Esto se ejecutará una vez");
    const fetchData = async () => {
      const response = await fetch("/api", { method: "GET" });
      const data = await response.json();
      console.log("Obteniendo datos desde CLIENTE:", data);
      setDatos(data.results);
      console.log("datos en la posicion 0", datos);
      setLoading(false);
    };
    fetchData();
  }, []);
  // Si la dependencia está vacía, se ejecuta una sola vez, cuando se monta el componente
  // "montar un componente" o "mount" es cuando se crea el componente y se muestra en pantalla

  return (
    <div className="contenedor center" id="imagen">
      {/* 
        Loading es true?
        Si -> Mostrar un spinner
        No -> Mostrar los datos
      */}
      {loading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <Container>
          {datos.map((info) => (
            <Mostrar key={info.name} info={info} />
          ))}
        </Container>
      )}
    </div>
  );
}

function Mostrar({ info }) {
  return (
    <Card mb={4}>
      <CardHeader>{info.name}</CardHeader>
      <CardBody>
        <Image
          style={{ margin: "auto" }}
          priority
          src={info.image}
          alt="Una imagen"
          width={100}
          height={100}
        />
      </CardBody>
    </Card>
  );
}