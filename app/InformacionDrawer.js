"use client";

import { useRef, useState, useEffect, React } from "react";
import { DespliegueEpisodios } from "./DespliegueEpisodios";
import { useLocalStorage } from "./useLocalStorage";
import { actualizarComentario } from "./api/patch/route";

import Image from "next/image";


// Importe Elementos Chakra
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";

// Importe Iconos Chakra
import {
  ArrowForwardIcon,
} from "@chakra-ui/icons";

function InformacionDrawer({ info }) {
  const [aux, setAux] = useState(0);
  const [datos, setDatos] = useState({});
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState([]);
  const [likes, setLikes] = useLocalStorage(info.name, ["0", false, ""]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  var fechaObjeto = new Date(info.created);

  var ano = fechaObjeto.getFullYear();
  var mes = fechaObjeto.getMonth() + 1;
  var dia = fechaObjeto.getDate();

  var fechaFormato = ano + "-" + refactorizar(mes) + "-" + refactorizar(dia);

  function refactorizar(numero) {
    if (numero < 10) return "0" + numero;
    return numero;
  }

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
      console.log("entro al if del fetch data " + nombre[0]._id);
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
      <div >
      <Button
        className="boton-like" classonClick={handleLikedClick} colorScheme={likes[1] ? "teal" : "gray"} style={{ marginRight: '10px' }}>
         
      {likes[0]} likes
      </Button>
      <Button
        className="boton-info"
        rightIcon={<ArrowForwardIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Información
      </Button>

      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerContent className="carta">
          <DrawerHeader className="info-header">Información:</DrawerHeader>
          <DrawerBody className="info">
            <SimpleGrid columns={{ base: 2 }}>
              <Image
                alt="foto-info"
                className="imagen-personaje"
                priority
                style={{ width: "90%", height: "auto", borderRadius: "4%" }}
                src={info.image}
                width={"100"}
                height={"100"}
              />
              <p>
                Nombre: {info.name} <br></br>
                Estatus: {info.status} <br></br>
                Especie: {info.species} <br></br>
                Tipo: {info.type} <br></br>
                Género: {info.gender} <br></br>
                Orígen: {info.origin.name} <br></br>
                Localización: {info.location.name} <br></br>
                Creación: {fechaFormato} <br></br>
                <></>
              </p>
            </SimpleGrid>
            <DespliegueEpisodios info={info.episode} />
          </DrawerBody>
          <DrawerFooter>
            <Button
              className="boton-cerrar"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export { InformacionDrawer }