const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-white mt-auto p-8">
      <div className="text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Architecture Systems. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
