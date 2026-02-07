import { useEffect } from "react";
import MainPage from "./Pages/MainPage";

function App() {
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  return (
    <MainPage />
  );
}

export default App;
