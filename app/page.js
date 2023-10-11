"use client";
import Image from "next/image";
import {useRef} from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
  CardFooter,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

export default function Main() {
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
      <CardFooter>
        <DrawerInfo />
      </CardFooter>
    </Card>
  );
}

function DrawerInfo(){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Mas informacion
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>informacion de personaje seleccionado</DrawerHeader>

          <DrawerBody>
            
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}