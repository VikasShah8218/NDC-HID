import React , { useEffect } from "react";
import { initializeWebSocket } from "./wsConnection";
import MainApp from "./MainApp"

const App: React.FC = () => {
  useEffect(() => {
    const ws:any = initializeWebSocket();
    return () => {
      ws.close();
    };
  }, []);
  return (
    <>
      <MainApp />
    </>
  )
}

export default App
