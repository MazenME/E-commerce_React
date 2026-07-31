import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import HomePage from "@/pages/Home";
import Categories from "@/pages/Categories";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ErrorPage from "@/pages/Error";
import Products from "@/pages/Products";

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
