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
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";

import { useState, useEffect } from "react";

export default function Main() {
  const [pagina, setPagina] = useState("https://rickandmortyapi.com/api/character");
  const [cambio, setCambio] = useState("");
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      console.log("direccion de la api " + pagina);
      const response = await fetch(pagina, { method: "GET" });
      const data = await response.json();
      console.log("Obteniendo datos desde CLIENTE:", data);
      setDatos(data);
      setLoading(false);
    };
    fetchData();
  }, [pagina]);

  const SiguientePag = async () => {
    if (datos.info.next != null) {
      setLoading(true);
      console.log("direccion siguiente " + datos.info.next);
      setPagina(datos.info.next);
    } else {
      alert("Ultima Pagina");
    }
  };

  const AnteriorPag = async () => {
    if (datos.info.prev != null) {
      setLoading(true);
      console.log("direccion anterior" + datos.info.prev);
      setPagina(datos.info.prev);
    } else {
      alert("Primera Pagina");
    }
  };

  const UltimaPag = async () => {
    if (datos.info.next != null) {
      setLoading(true);
      console.log("ultima direccion" + "https://rickandmortyapi.com/api/character/?page=42")
      setPagina("https://rickandmortyapi.com/api/character/?page=42")
    } else {
      alert("Ultima Pagina");
    }
  }

  const PrimeraPag = async () => {
    if (datos.info.prev != null) {
      setLoading(true);
      console.log("ultima direccion" + "https://rickandmortyapi.com/api/character/?page=1")
      setPagina("https://rickandmortyapi.com/api/character/?page=1")
    } else {
      alert("Primera Pagina");
    }
  }

  return (
    <div className="center" id="imagen" >
      {loading ? (
        <div className="pantalla-carga">
          <CircularProgress isIndeterminate
            color="teal.700"
            thickness='15px'
            size='7vw' />
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
              <Button onClick={PrimeraPag} leftIcon={<ArrowLeftIcon />}></Button>
              <Button onClick={AnteriorPag}>Anterior pagina</Button>
              <Button onClick={SiguientePag}>Siguiente pagina</Button>
              <Button onClick={UltimaPag} rightIcon={<ArrowRightIcon />}></Button>
            </ButtonGroup>
          </div>
        </div>
      )};
    </div>
  )
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
      <CardFooter>
        <DrawerInfo info={info} />
      </CardFooter>
    </Card>
  );
}

function DrawerInfo({ info }) {
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

          <DrawerBody><p>
            Nombre: {info.name} <br></br>
            ID: {info.id} <br></br>
            Status: {info.status} <br></br>
            Specie: {info.species} <br></br>
            Tipo: {info.type} <br></br>
            Genero: {info.gender} <br></br>
            Origen: {info.origin.name} <br></br>
            Localizacion: {info.location.name} <br></br>
            Creado: {info.created} <br></br>
          </p>
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