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
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    console.log("Esto se ejecutará una vez");
    const fetchData = async () => {
      const response = await fetch("/api", { method: "GET" });
      const data = await response.json();
      console.log("Obteniendo datos desde CLIENTE:", data);
      setDatos(data);
      console.log("datos en la posicion 0", datos);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="center" id="imagen" >
      {loading ? (
        <div className="pantalla-carga">
          <CircularProgress isIndeterminate 
          color="teal.700"
          thickness='15px' 
          size='7vw'/>
        </div>
      ) : (
        <div>
          <div className="logo">
            <img src={"/rm_logo.png"} />
          </div>

          <SimpleGrid columns={{ sm: 1, md: 2, }} spacingX='200px' spacingY='20px' marginLeft={150} marginRight={150}>
            {(datos.results).map((info) => (
              <Mostrar key={info.name} info={info} />
            ))}
          </SimpleGrid>

          <div className="contenedor-botones">
            <ButtonGroup spacing="5rem">
              <Button onClick={CambioPaginaSig}>Anterior pagina</Button>
              <Button>Siguiente pagina</Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  );


}

function CambioPaginaSig() {
  console.log("funca");
}

function Mostrar({ info }) {
  return (
    <Card className="carta" mb={4}>
      <CardHeader>{info.name}</CardHeader>
      <CardBody>
        <Image
          className="imagen"
          priority
          style={{ margin: "auto" }}
          src={info.image}
          width={"100"}
          height={"100"}
        />
      </CardBody>
      <CardFooter className='boton-info'>
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
      <Button
        rightIcon={<ArrowForwardIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}>
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