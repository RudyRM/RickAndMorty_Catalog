"use client";

import { useRef, useState, useEffect } from "react";
import { CollapseEx } from "./collapseInfo";
import { useLocalStorage } from "./useLocalStorage";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  ArrowForwardIcon,
} from "@chakra-ui/icons";

function DrawerInfo({ info }) {
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get");
      const data = await response.json();
      setDatos(data);
    };
    fetchData();
  }, []);

  const sendRequest = async () => {
    const response = await fetch("/api/ejemplo-4", {
      method: "POST",
      body: JSON.stringify({
        usuario: " ",
        idApp: "ram",
        idItem: info.name,
        comentario: comentario,
        timestamp: Date.now(),
        enRespuestaA: enRespuestaA === "" ? null : enRespuestaA,
      }),
    });

    const data = await response.json();
    console.log(data);
  };
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const btnRef = useRef();
  
  const handleLikedClick = () =>{
    const [nombre, setNombre] = useState([]);
    const [comentario, setComentario] = useState("0");

    const fetchData = async () => {
      // Query : idItem
      const response = await fetch("/api/searchIdItem?idApp=" + info.name);
      const data = await response.json();
      console.log(data);
      setNombre(data);
    };
    fetchData();
    if(nombre.length == 0){
      sendRequest();

    }else{

    }

    const [likes, setLikes] = useLocalStorage(info.name, [comentario, false]);
    let aux;
    
    if(likes[1]){
      aux = Number(likes[0]) - 1;
    }else{
      aux = Number(likes[0]) + 1;
    }
    setLikes([aux, !likes[1]]);

    return(
      <Button
        colorScheme={likes[1] ? "teal" : "gray"}
        onClick={handleLikedClick}>
          Like
      </Button>
    )
    
  }

  return (
    <>
      <Button
        rightIcon={<ArrowForwardIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}>
        Mas informacion
      </Button>

      <Button onClick={handleLikedClick}>
        likes
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
            <CollapseEx info={info.episode} />
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
export { DrawerInfo }