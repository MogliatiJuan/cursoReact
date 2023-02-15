import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import CustomProvider from "./components/CustomProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.scss";

const App = () => {
  return (
    <CustomProvider>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
      <ToastContainer 
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        />
    </CustomProvider>
  );
};

export default App;
