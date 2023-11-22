"use client";

import { Button } from "@chakra-ui/react";
import { useLocalStorage } from "./useLocalStorage";

const handleLikedClick = () => {
    
}

function handleLikedClick({info}){
    const [likes, setLikes] = useLocalStorage("likes", ["0", false]);
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
  export {handleLikedClick};