"use client";

// Importe Elementos Next
import Image from "next/image";
import Script from "next/script";
import { useLocalStorage } from "./useLocalStorage";
import { Mostrar } from "./Mostrar";

// Importe Funciones React
import { useRef, useEffect, useState } from "react";
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'  

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
  Radio,
  RadioGroup,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

// Importe Iconos Chakra
import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Search2Icon
} from "@chakra-ui/icons";

export default function Main() {
  // useState cambia los valores de las variables en tiempo de ejecución
  const [pagina, setPagina] = useState(
    "https://rickandmortyapi.com/api/character"
  );
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [likes, setLikes] = useLocalStorage("likes", "0");
  
  console.log(likes);
  
  useEffect(() => {
    console.log("Entró al use effect")
    const fetchData = async () => {
      const response = await fetch(pagina, { method: "GET" });
      const data = await response.json();

      await setDatos(data);
      setLoading(false);
    };
    fetchData();
    console.log("Salió al use effect")
  }, [pagina]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedGender, setSelectedGender] = useState("");

  // Function to handle radio button change
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    console.log("Selected gender:", gender);
  };

  const [selectedStatus, setSelectedStatus] = useState("");

  // Function to handle radio button change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log("Selected status:", status);
  };

  const [selectedSpecies, setSelectedSpecies] = useState("");

  // Function to handle radio button change
  const handleSpeciesChange = (species) => {
    setSelectedSpecies(species);
    console.log("Selected status:", species);
  };

  const CambioPagina = async (event) => {
    const boton = event.target;

    var data = datos.info;
    var paginas = datos.info.pages;
    var nombre = document.getElementById('query').value;

    setLoading(true);

    if (boton.id.includes("boton-primera-pag"))
      setPagina("https://rickandmortyapi.com/api/character?page=1&name=" + nombre);
    else if (boton.id.includes("boton-ultima-pag"))
      setPagina("https://rickandmortyapi.com/api/character?page=" + paginas + "&name=" + nombre);
    else if (boton.id.includes("boton-siguiente-pag"))
      setPagina(data.next);
    else if (boton.id.includes("boton-anterior-pag"))
      setPagina(data.prev);
    else if (boton.id.includes("boton-busqueda"))
      setPagina("https://rickandmortyapi.com/api/character/?name=" + nombre);
    else if (boton.id.includes("boton-filtros")){
      setPagina("https://rickandmortyapi.com/api/character/?gender=" + selectedGender + "&status=" + selectedStatus + "&species=" + selectedSpecies);
      onClose();
    }

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
          <Button onClick={onOpen} className="boton-avance">
        Filtros
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} className="modal">
        <ModalOverlay />
        <ModalContent className="modal">
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Genero:
            <RadioGroup onChange={handleGenderChange} value={selectedGender}>
              <Stack direction="row">
                <Radio value="">All</Radio>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="genderless">Genderless</Radio>
                <Radio value="unknown">Unknown</Radio>
              </Stack>
            </RadioGroup>
            Status:
            <RadioGroup onChange={handleStatusChange} value={selectedStatus}>
              <Stack direction="row">
                <Radio value="">All</Radio>
                <Radio value="alive">Alive</Radio>
                <Radio value="dead">Dead</Radio>
                <Radio value="unknown">Unknown</Radio>
              </Stack>
            </RadioGroup>
            Species:
            <RadioGroup onChange={handleSpeciesChange} value={selectedSpecies}>
              <Stack direction="row">
                <Radio value="">All</Radio>
                <Radio value="human">Human</Radio>
                <Radio value="humanoid">Humanoid</Radio>
                <Radio value="alien">Alien</Radio>
                <Radio value="robot">Robot</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="cyan" onClick={CambioPagina} id="boton-filtros">Aplicar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </div>
            <InputGroup className="center-barra">
              <Input id='query' value={inputValue}
        onChange={handleInputChange} className='barra-busqueda' placeholder='Búsqueda' size='lg' />
              <InputRightElement>
                <Button id='boton-busqueda' className="boton-busqueda"size='md' onClick={CambioPagina}>
                  <Search2Icon color={'white'}></Search2Icon>
                </Button>
              </InputRightElement>
            </InputGroup>
          <div>
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

