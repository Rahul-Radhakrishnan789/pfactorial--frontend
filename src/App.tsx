import { ToastContainer } from "react-toastify";
import { router } from "./Routes/routes";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
          <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <RouterProvider router={router} />
    </>
  )
}

export default App