import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./features/Auth/SignIn";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./features/Auth/ProtectedRoute";
import SignUp from "./features/Auth/SignUp";
import ChatWindow from "./components/ChatWindow";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Navigate replace to="chat" />} />
            <Route path="chat" element={<ChatWindow />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
