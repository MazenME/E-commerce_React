import { NavLink } from "react-router-dom";
import HeaderCart from "../../e-commerce/HeaderCart/HeaderCart";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-800 py-2 px-3  text-white">
      <nav className="flex items-center justify-between w-full m-3">
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">
            Our{" "}
            <span className="bg-cyan-700 text-white px-2 py-1 rounded">
              Ecom
            </span>
          </h1>
        </div>

        <div className="w-1/3 flex items-center justify-between gap-4">
          <ul className="flex items-center justify-center gap-4">
            <li className="text-lg font-medium cursor-pointer"><NavLink className={({isActive}) => isActive ? "font-bold text-cyan-700" : ""} to="/">Home</NavLink></li>
            <li className="text-lg font-medium cursor-pointer"><NavLink className={({isActive}) => isActive ? "font-bold text-cyan-700" : ""} to="/products">Products</NavLink></li>
            <li className="text-lg font-medium cursor-pointer"><NavLink className={({isActive}) => isActive ? "font-bold text-cyan-700" : ""} to="/categories">Categories</NavLink></li>
            <HeaderCart />
          </ul>
          <div className="flex items-center justify-center gap-4 ">
            <ul className="flex items-center justify-center gap-4">
              <li className="text-lg font-medium cursor-pointer"> <NavLink className={({isActive}) => isActive ? "font-bold text-cyan-700" : ""} to="/login">Login</NavLink></li>
              <li className="text-lg font-medium cursor-pointer"><NavLink className={({isActive}) => isActive ? "font-bold text-cyan-700" : ""} to="/register">Register</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
