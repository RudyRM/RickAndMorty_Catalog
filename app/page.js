"use client";
import Image from "next/image";
import { useRef } from "react";
import {
  Container,
  UnorderedList,
  List,
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
  Collapse,
  ListItem,
} from "@chakra-ui/react";
import { 
  ArrowForwardIcon,
} from "@chakra-ui/icons";

import { useState, useEffect } from "react";

export default function Main() {
  const [pagina, setPagina] = useState("https://rickandmortyapi.com/api/character");
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);

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
    if(datos.info.next != null){
      setLoading(true);
      console.log("direccion siguiente " + datos.info.next);
      setPagina(datos.info.next);
    }
  };
  
  const AnteriorPag = async () => {
    if(datos.info.prev != null){
      setLoading(true);
      console.log("direccion anterior" + datos.info.prev);
      setPagina(datos.info.prev);
    }
  };

  return (
    <div className="contenedor center" id="imagen">
      {loading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <SimpleGrid columns={{sm: 1, md:2,}} spacingX='200px' spacingY='20px'>
          {(datos.results).map((info) => (
            <Mostrar key={info.id} info={info} />
          ))}
        </SimpleGrid>
      )}
      <ButtonGroup spacing="5rem">
        <Button onClick={AnteriorPag}>Anterior pagina</Button>
        <Button onClick={SiguientePag}>Siguiente pagina</Button>
      </ButtonGroup>
    </div>
  );
}

function CollapseEx({info}) {
  const { isOpen, onToggle } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')

  return (
    <>
      <Button onClick={onToggle}>Episodios</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          <UnorderedList>
          {info.map((informacion) =>(
            <ListItem>{informacion}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Collapse>
    </>
  )
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
        <DrawerInfo info={info} />
      </CardFooter>
    </Card>
  );
}

function DrawerInfo({info}) {
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
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>informacion de personaje seleccionado</DrawerHeader>

          <DrawerBody><p>
           Nombre: {info.name} <br></br>
           ID: {info.id} <br></br>
           Estatus: {info.status} <br></br>
           Especie: {info.species} <br></br>
           Tipo: {info.type} <br></br>
           Genero: {info.gender} <br></br>
           Origen: {info.origin.name} <br></br>
           Localizacion: {info.location.name} <br></br>
           Creado: {info.created} <br></br>
          </p>
          <CollapseEx info={info.episode}/>
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