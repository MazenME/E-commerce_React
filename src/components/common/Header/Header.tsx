import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HeaderCart from "@/components/e-commerce/HeaderCart/HeaderCart";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-lg font-medium cursor-pointer transition-colors duration-200 ${
    isActive ? "text-cyan-400" : "hover:text-cyan-400"
  }`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white w-full shadow-md relative z-50">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold">
            Our{" "}
            <span className="bg-cyan-700 text-white px-2 py-1 rounded">
              Ecom
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
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
          </ul>
          <HeaderCart />

          <div className="h-6 w-[1px] bg-gray-700" />

          <ul className="flex items-center gap-6">
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

        {/* Mobile Header Actions (Cart + Hamburger Toggle) */}
        <div className="flex md:hidden items-center gap-4">
          <HeaderCart />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer text-gray-300 hover:text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          md:hidden bg-gray-900 border-b border-gray-800 transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? "max-h-[350px] opacity-100 py-4 px-6" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        <ul className="flex flex-col gap-4 text-left">
          <li>
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </NavLink>
          </li>
          <li className="h-[1px] bg-gray-800 my-1" />
          <li>
            <NavLink
              to="/login"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
