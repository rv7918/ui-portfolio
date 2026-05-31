import { Link } from "react-router-dom";
import logo from "../assets/d_logo.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#faf9f7] sticky top-0 z-50 border-b border-[#e8e6e3]">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          to="/home"
          className="font-display text-2xl font-bold text-[#1a1a1a] tracking-tight hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <ul className="flex items-center gap-8 sm:gap-10">
          <li>
            <Link to="/home" className="font-sans text-sm font-normal text-[#1a1a1a] hover:opacity-70 transition-opacity">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="font-sans text-sm font-normal text-[#1a1a1a] hover:opacity-70 transition-opacity">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
