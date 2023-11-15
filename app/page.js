"use client";
import Image from "next/image";
import { useLocalStorage } from "./useLocalStorage";
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
  Text,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";

import { useState, useEffect } from "react";

export default function Main() {
  const [pagina, setPagina] = useState("https://rickandmortyapi.com/api/character");
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useLocalStorage("likes", "0");
  
  console.log(likes);
  

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
      <Button onClick={()=>setLikes("234")} />
      {likes}
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
            <img src={"/rm_logo.png"}/>
          </div>
          <div className="boton-filtro">
            <Button className="boton-avance">Filtro</Button>
          </div>
          <div className="contenedor-botones">
            <ButtonGroup spacing="5rem">
              <Button className = "boton-avance" onClick={PrimeraPag} leftIcon={<ArrowLeftIcon />}></Button>
              <Button className = "boton-avance" onClick={AnteriorPag}>Página Anterior</Button>
              <Button className = "boton-avance" onClick={SiguientePag}>Página siguiente</Button>
              <Button className = "boton-avance" onClick={UltimaPag} rightIcon={<ArrowRightIcon />}></Button>
            </ButtonGroup>
          </div>
          <SimpleGrid columns={{ sm: 2, md: 4, }} spacingX='50px' spacingY='20px' marginLeft={100} marginRight={100}>
            {(datos.results).map((info) => (
              <Mostrar key={info.name} info={info} />
            ))}
          </SimpleGrid>


          <div className="contenedor-botones">
            <ButtonGroup spacing="5rem">
              <Button className = "boton-avance" onClick={PrimeraPag} leftIcon={<ArrowLeftIcon />}></Button>
              <Button className = "boton-avance" onClick={AnteriorPag}>Página Anterior</Button>
              <Button className = "boton-avance" onClick={SiguientePag}>Página siguiente</Button>
              <Button className = "boton-avance" onClick={UltimaPag} rightIcon={<ArrowRightIcon />}></Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  )
}

function Mostrar({ info }) {
  return (
    <Card className="carta" mb={2} size= "sm">
      <CardHeader>{info.name}</CardHeader>
      <CardBody>
        {info.name == "Rick Sanchez" ? (
          <a href= "https://www.youtube.com/watch?v=x4LqqxYQhtQ">
          <Image
          className="imagen"
          priority
          style={{ width: '100%', height: '100%' }}
          src={info.image}
          width={"100"}
          height={"100"}

        />
        </a>
        ):(
          <Image
          className="imagen"
          priority
          style={{ width: '100%', height: '100%' }}
          src={info.image}
          width={"100"}
          height={"100"}
        />
        )}
        
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
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent className="carta">
          <DrawerCloseButton />
          <DrawerHeader>Información: </DrawerHeader>

          <DrawerBody className="carta"><p>
            {/* <Image
            className="imagen"
            priority
            style={{ width: '100%', height: '100%' }}
            src={info.image}
            width={"100"}
            height={"100"}
            /> */}
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

function CollapseEx({info}) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Button onClick={onToggle} marginTop={2}>Episodios</Button>
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
          <Text as='b'>Episodio / Al aire   /   Nombre de episodio</Text>
          <Text as='div'> <br /> </Text>{/** salto de linea */}
          {info.map((informacion) =>(
            <MostrarEpisodios info={informacion}/>
            ))}
          </UnorderedList>
        </Box>
      </Collapse>
    </>
  )
}

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

