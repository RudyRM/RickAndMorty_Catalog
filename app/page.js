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

export default function Ejemplo7() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
 
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

  return (
    <div className="contenedor center" id="imagen">
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