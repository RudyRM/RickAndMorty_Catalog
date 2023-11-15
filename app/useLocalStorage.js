"use client";
// # https://stackoverflow.com/questions/72961647/how-to-implement-a-uselocalstorage-hook-in-next-js
import { useEffect, useRef, useState } from "react";

function useLocalStorage(key, defaultValue) {
  const isMounted = useRef(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };