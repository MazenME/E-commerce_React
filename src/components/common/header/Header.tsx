import { NavLink } from "react-router-dom";
import HeaderCart from "../../e-commerce/HeaderCart/HeaderCart";

const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium cursor-pointer transition-colors duration-200 ${
      isActive ? "text-cyan-400" : "hover:text-cyan-400"
    }`;

  return (
    <header className="flex items-center justify-between bg-gray-800 py-2 px-3 text-white">
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
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={linkClass}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={linkClass}>
                Categories
              </NavLink>
            </li>
            <HeaderCart />
          </ul>
          <div className="flex items-center justify-center gap-4 ">
            <ul className="flex items-center justify-center gap-4">
              <li>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
