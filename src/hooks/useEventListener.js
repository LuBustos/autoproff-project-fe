import { useEffect, useState } from "react";

function useEventListener() {
  const [keyPressed, setKeyPressed] = useState(null);

  useEffect(() => {
    const listener = (event) => {
      setKeyPressed(event);
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return keyPressed;
}

export default useEventListener;
