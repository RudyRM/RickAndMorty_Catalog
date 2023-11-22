"use client"

import { DrawerInfo } from "./drawerInfo";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@chakra-ui/react";

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
  export {Mostrar};