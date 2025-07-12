import { useEffect } from "react";

const RegisterMiddleware = () => {
  useEffect(() => {
    console.log("RegisterMiddleware mounted");
    window.addEventListener("message", (event) => {
      if (event.data.type === "FROM_PAGE") {
        console.log("funciona <- extensao");
        console.log(event.data);
        console.log("perfil_calmind", event.data.perfil);
        console.log(event.data.perfil);
        chrome.runtime.sendMessage({
          type: "SAVE_TOKEN",
          profile: event.data.perfil,
        });
      }
    });
  }, []);
  return <div></div>;
};

export default RegisterMiddleware;
