import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/home" className="text-lg text-white">
          design & <strong>develop</strong>
        </Link>
        <ul className="flex items-center">
          <li className="mr-4">
            <Link to="/home">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>    
  );
};

export default Navbar