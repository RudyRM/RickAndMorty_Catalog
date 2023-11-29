"use client";

// Importe Elementos Next
import Image from "next/image";
import Script from "next/script";

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

  const CambioPagina = async (event) => {
    const boton = event.target;

    var data = datos.info;
    var paginas = datos.info.pages;
    var nombre = document.getElementById('query').value;

    await setLoading(true);

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
            <InputGroup className="center-barra">
              <Input id='query' value={inputValue}
        onChange={handleInputChange} className='barra-busqueda' placeholder='Búsqueda' size='lg' />
              <InputRightElement width='4.5rem'>
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

function Mostrar({ info }) {
  return (
    <Card className="carta" mb={2} size="sm">
      <CardHeader>{info.name}</CardHeader>
      <CardBody>
        <Image
          alt="foto-carta"
          className="imagen-personaje"
          href={
            info.name == "Rick Sanchez"
              ? ""
              : "https://www.youtube.com/watch?v=x4LqqxYQhtQ"
          }
          priority
          style={{ width: "100%", height: "auto", borderRadius: "4%" }}
          src={info.image}
          width={"100"}
          height={"100"}
        />
      </CardBody>
      <CardFooter>
        <InformacionDrawer info={info} />
      </CardFooter>
    </Card>
  );
}

function InformacionDrawer({ info }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Guarda la referencia del botón para volver a activarlo
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

  return (
    <>
      <Button
        className="boton-info"
        rightIcon={<ArrowForwardIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Más información
      </Button>
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

function DespliegueEpisodios({ info }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button
        className="boton-episodios"
        onClick={onToggle}
        marginTop={2}
        leftIcon={<ArrowDownIcon />}
        rightIcon={<ArrowDownIcon />}
      >
        Episodios
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md">
          <UnorderedList>
            <Text as="b">Episodio / Al aire / Nombre de episodio</Text>
            <Text as="div">
              {" "}
              <br />{" "}
            </Text>
            {/* salto de linea */}
            {info.map((informacion, index) => (
              <MostrarEpisodios key={index} info={informacion} />
            ))}
          </UnorderedList>
        </Box>
      </Collapse>
    </>
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

function MostrarEpisodios({ info }) {
  const [episodios, setEpisodios] = useState("");

  // useEffect se ejecuta cada vez que el valor de episodios cambie
  useEffect(() => {
    // Que la función sea async permite utilizar await
    const CambioEpisodios = async () => {
      const response = await fetch(info, { method: "GET" });
      const data = await response.json();
      setEpisodios(data);
    };
    CambioEpisodios();
  }, [episodios]);

  return (
    <ListItem>
      {episodios.episode} ( {episodios.air_date} ); {episodios.name}
    </ListItem>
  );
}
