import "@/styles/globals.css";
import "@/styles/dash_global.css";

import { AuthProvider } from "../../context/AuthContext";
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}
