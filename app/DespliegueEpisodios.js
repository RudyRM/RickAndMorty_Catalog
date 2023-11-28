"use client";

import { MostrarEpisodios } from "./mostrarEpisodios";

// Importe Elementos Chakra
import {
  Collapse,
  Button,
  Box,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

// Importe Iconos Chakra
import {
  ArrowDownIcon,
} from "@chakra-ui/icons";

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
export { DespliegueEpisodios };