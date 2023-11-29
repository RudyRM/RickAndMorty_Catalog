"use client"
// Importe Elementos Chakra
import Image from "next/image";

// Importe Elementos Chakra
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";

import { InformacionDrawer } from "./InformacionDrawer";

function Mostrar({ info }) {
  return (
    <Card className="carta" mb={2} size="sm" borderRadius="15" >
      <CardHeader>{info.name}</CardHeader>
      <CardBody>
        {info.id == 1 ? (
          <a
          target="_blank" 
          href="https://www.youtube.com/watch?v=x4LqqxYQhtQ">
            <Image
          alt="foto-carta"
          className="imagen-personaje"
          style={{ width: "100%", height: "auto", borderRadius: "5%" }}
          src={info.image}
          width={"100"}
          height={"100"}
        />
          </a>
        ):(
          <Image
          alt="foto-carta"
          className="imagen-personaje"
          priority
          style={{ width: "100%", height: "auto", borderRadius: "5%" }}
          src={info.image}
          width={"100"}
          height={"100"}
        />
        )}
      </CardBody>
      <CardFooter>
        <InformacionDrawer info={info} />
      </CardFooter>
    </Card>
  );
}
export { Mostrar };