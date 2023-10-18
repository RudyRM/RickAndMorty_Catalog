"use client";
import Image from "next/image";
import { useRef } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
  CardFooter,
  Button,
  ButtonGroup,
  Box,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

export default function Main() {
  const [cambio, setCambio] = useState("");
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    console.log("Esto se ejecutará una vez");
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character", { method: "GET" });
      const data = await response.json();
      console.log("Obteniendo datos desde CLIENTE:", data);
      setDatos(data);
      console.log("datos en la posicion 0", datos);
      setLoading(false);
    };
    fetchData();
  }, []);

  const SiguientePag = async () => {
    var pag = 1;
    pag += 1;
    setCambio("?page="+ pag);
    const response = await fetch("https://rickandmortyapi.com/api/character" + cambio, { method: "GET" });
    const data = await response.json();
    console.log("Obteniendo datos desde CLIENTE:", data);
    setDatos(data);
  };

  return (
    <div className="contenedor center" id="imagen">
      {loading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <SimpleGrid columns={2} spacingX='200px' spacingY='20px'>
          {(datos.results).map((info) => (
            <Mostrar key={info.name} info={info} />
          ))}
        </SimpleGrid>
      )}
      <ButtonGroup spacing="5rem">
        <Button>Anterior pagina</Button>
        <Button onClick={SiguientePag}>Siguiente pagina</Button>
      </ButtonGroup>
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

function DrawerInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button rightIcon={<ArrowForwardIcon />} ref={btnRef} colorScheme="teal" onClick={onOpen}>
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