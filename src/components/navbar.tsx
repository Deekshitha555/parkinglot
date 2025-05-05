// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center rounded-xl">
      <ul className="flex space-x-6">
        <li><Link href="/" className="text-white">Home</Link></li>
        <li><Link href="/park" className="text-white">Parking</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
