"use client";

import { useRef, useState, useEffect, React } from "react";
import { CollapseEx } from "./collapseInfo";
import { useLocalStorage } from "./useLocalStorage";
import { actualizarComentario } from "./api/patch/route";


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
  const [aux, setAux] = useState(0);
  const [datos, setDatos] = useState({});
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState([]);
  const [likes, setLikes] = useLocalStorage(info.name, ["0", false, ""]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  const sendRequest = async ({ nuevoComentario }) => {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        usuario: " ",
        idApp: "ram",
        idItem: info.name,
        comentario: nuevoComentario,
        timestamp: Date.now(),
        enRespuestaA: null,
      }),
    });
    const data = await response.json();
    console.log("se posteo " + data._id);
    setId(data._id);
  };

  const sendDeleteAction = async () => {
    const response = await fetch(`/api/ejemplo-5/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    setComentario(data);
  };



  useEffect(() => {
    const fetchData = async () => {
      // Query : idItem
      const response = await fetch("/api/searchIdItem?idItem=" + info.name);
      const data = await response.json();

      setNombre(data);
    };
    fetchData();
    console.log("entra al useEffect");
    if (nombre.length != 0) {
      setId(nombre[0]._id);
      setLikes([nombre[0].comentario, false, nombre[0]._id]);
      setAux(Number(nombre[0].comentario));
      console.log("entro al if del fetch data "+ nombre[0]._id);
    }
  }, []);



  const handleLikedClick = async () => {
    console.log("aux " + aux);
    const nuevoAux = likes[1] ? aux - 1 : aux + 1;
    setAux(nuevoAux);
    console.log("nuevo aux " + nuevoAux);

    const nuevoComentario = nuevoAux.toString();

    // actualiza el comentario antiguo si existe
    if (likes[1]) {
      await actualizarComentario(id, nuevoComentario);
    } else {
      if (id == "") {
        await sendRequest({ nuevoComentario });
      } else {
        await actualizarComentario(id, nuevoComentario);
      }
    }

    const nuevoLikes = [nuevoComentario, !likes[1], id];
    setLikes(nuevoLikes);
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

      <Button onClick={handleLikedClick} colorScheme={likes[1] ? "teal" : "gray"}>
        likes
      </Button>
      {likes[0]}

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