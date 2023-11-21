"use client";

import { useRef, useState } from "react";
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
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useLocalStorage("likes", ["0", false]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleLikedClick = () => {
    let aux;
    if(likes[1]){
      aux = Number(likes[0]) - 1;
    }else{
      aux = Number(likes[0]) + 1;
    }
    setLikes([aux, !likes[1]]);
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

      <Button
        colorScheme={likes[1] ? "teal" : "gray"}
        onClick={handleLikedClick}>
          Likes
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