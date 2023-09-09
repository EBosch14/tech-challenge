import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex flex-row justify-between items-center text-xl font-bold">
        <li className=" bg-cyan-400 hover:bg-cyan-500">
          <Link
            className="inline-block text-gray-900 hover:no-underline p-5"
            to="/">
            Complete a new form
          </Link>
        </li>
        <li className="bg-cyan-400 hover:bg-cyan-500">
          <Link
            className="inline-block text-gray-900 hover:no-underline p-5"
            to="/answers">
            Completed forms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
