import { FaRegUser, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <nav className="h-[8vh] shadow-lg flex justify-between items-center px-6">
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-teal-500 m-0">GoalSetter</h3>
        <ul className="flex gap-4 md:gap-6 items-center">
          <li>
            <Link to="/login" className="flex gap-1 md:gap-2 items-center font-semibold">
              <FaUser /> Login{" "}
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex gap-1 md:gap-2 font-semibold items-center">
              <FaRegUser /> Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
