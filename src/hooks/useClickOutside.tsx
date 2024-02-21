import { useEffect } from "react";

function useClickOutside(ref : any, func : Function) {
    useEffect(() => {

      function handleClickOutside(event: { target: any; }) {
        if (ref.current && !ref.current.contains(event.target)) {
            if(func){
                func();
            }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, func]);
}

export default useClickOutside;