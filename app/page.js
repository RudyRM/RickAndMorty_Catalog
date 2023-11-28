"use client";

// Importe Elementos Next
import Image from "next/image";
import Script from "next/script";
import { useLocalStorage } from "./useLocalStorage";
import { Mostrar } from "./Mostrar";

// Importe Funciones React
import { useRef, useEffect, useState } from "react";

// Importe Elementos Chakra
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Checkbox,
  CheckboxGroup,
  CircularProgress,
  Collapse,
  Button,
  ButtonGroup,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

// Importe Iconos Chakra
import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

export default function Main() {
  // useState cambia los valores de las variables en tiempo de ejecución
  const [pagina, setPagina] = useState(
    "https://rickandmortyapi.com/api/character"
  );
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useLocalStorage("likes", "0");
  
  console.log(likes);
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pagina, { method: "GET" });
      const data = await response.json();

      setDatos(data);
      setLoading(false);
    };
    fetchData();
  }, [pagina]);

  const CambioPagina = async (event) => {
    const boton = event.target;

    setLoading(true);

    if (boton.id.includes("boton-primera-pag"))
      setPagina("https://rickandmortyapi.com/api/character?page=1");
    else if (boton.id.includes("boton-ultima-pag"))
      setPagina("https://rickandmortyapi.com/api/character?page=42");
    else if (boton.id.includes("boton-siguiente-pag"))
      setPagina(datos.info.next);
    else if (boton.id.includes("boton-anterior-pag"))
      setPagina(datos.info.prev);
  };

  return (
    <div className="center">
      {loading ? (
        <div className="pantalla-carga">
          <CircularProgress
            isIndeterminate
            color="teal.700"
            thickness="15px"
            size="15vh"
          />
        </div>
      ) : (
        <div>
          <div className="logo">
            <img src={"/rm_logo.png"} />
          </div>
          <div className="boton-filtro">
            <ModalFiltros />
          </div>
          <div className="contenedor-botones">
            <ButtonGroup spacing="2vw">
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-primera-pag"
                leftIcon={<ArrowLeftIcon />}
              ></Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-anterior-pag"
              >
                Página Anterior
              </Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-siguiente-pag"
              >
                Página siguiente
              </Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-ultima-pag"
                rightIcon={<ArrowRightIcon />}
              ></Button>
            </ButtonGroup>
          </div>
          <SimpleGrid columns={{ base: 2, lg: 4 }} className="grilla-cartas">
            {datos.results.map((info, index) => (
              <Mostrar key={index} info={info} />
            ))}
          </SimpleGrid>
          <div>
            <ButtonGroup spacing="2vw" className="contenedor-botones">
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-primera-pag2"
                leftIcon={<ArrowLeftIcon />}
              ></Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-anterior-pag2"
              >
                Página Anterior
              </Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-siguiente-pag2"
              >
                Página siguiente
              </Button>
              <Button
                className="boton-avance"
                onClick={CambioPagina}
                id="boton-ultima-pag2"
                rightIcon={<ArrowRightIcon />}
              ></Button>
            </ButtonGroup>
          </div>
          <Text className="texto-company">
            Copyright © 2023 MERF Company. Chile.
          </Text>
          <Script>
            if ({datos.info.prev == null})
            document.getElementById('boton-primera-pag').style.display = 'none';
            if ({datos.info.prev == null})
            document.getElementById('boton-anterior-pag').style.display =
            'none'; if ({datos.info.next == null})
            document.getElementById('boton-siguiente-pag').style.display =
            'none'; if ({datos.info.next == null})
            document.getElementById('boton-ultima-pag').style.display = 'none';
            if ({datos.info.prev == null})
            document.getElementById('boton-primera-pag2').style.display =
            'none'; if ({datos.info.prev == null})
            document.getElementById('boton-anterior-pag2').style.display =
            'none'; if ({datos.info.next == null})
            document.getElementById('boton-siguiente-pag2').style.display =
            'none'; if ({datos.info.next == null})
            document.getElementById('boton-ultima-pag2').style.display = 'none';
          </Script>
        </div>
      )}
    </div>
  );
}

function ModalFiltros() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} className="boton-avance">
        Filtros
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Genero:
            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 4]} direction={["column", "row"]}>
                <Checkbox value="male">Male</Checkbox>
                <Checkbox value="female">Female</Checkbox>
                <Checkbox value="genderless">Genderless</Checkbox>
                <Checkbox value="unknown">Unknown</Checkbox>
              </Stack>
              Status:
            </CheckboxGroup>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 3]} direction={["column", "row"]}>
                <Checkbox value="alive">Alive</Checkbox>
                <Checkbox value="dead">Dead</Checkbox>
                <Checkbox value="unknown">Unknown</Checkbox>
              </Stack>
            </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button>Aplicar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
