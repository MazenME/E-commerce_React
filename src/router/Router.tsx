import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import ErrorPage from "@/pages/Error";

const HomePage = lazy(() => import("@/pages/Home"));
const Categories = lazy(() => import("@/pages/Categories"));
const Products = lazy(() => import("@/pages/Products"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Cart = lazy(() => import("@/pages/Cart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products", 
        element: <Products />,
      },
      {
        path: "cart", 
        element: <Cart />,
      },
      {
        path: "products/:prefix", 
        element: <Products />,
      },
      {
        path: "categories", 
        element: <Categories />,
      },
      {
        path: "categories/:prefix", 
        element: <Categories />,
        loader: ({ params }) => {
          if (!/^[A-Za-z]+$/.test(params.prefix || "")) {
            throw new Response("Invalid prefix", { statusText: "category not found", status: 404 });
          }
          return true;
        },
      },
      {
        path: "login", 
        element: <Login />,
      },
      {
        path: "register", 
        element: <Register />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
