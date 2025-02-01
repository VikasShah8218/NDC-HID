import React , { useEffect } from "react";
import { initializeWebSocket } from "./wsConnection";
import MainApp from "./MainApp"
import { Flip ,ToastContainer } from "react-toastify";

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
      <ToastContainer
      position="bottom-right" 
      autoClose={5000}
      limit={5}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Flip}
      />
    </>
  )
}

export default App
