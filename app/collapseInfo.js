"use client";

import { MostrarEpisodios } from "./mostrarEpisodios";

import {
    UnorderedList,
    Button,
    Box,
    useDisclosure,
    Collapse,
    Text,
  } from "@chakra-ui/react";

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
  export { CollapseEx };