import { FaRegUser, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  
  return (
    <div>
      <nav className="h-[8vh] shadow-lg flex justify-between items-center px-6">
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-teal-500 m-0">
          GoalSetter
        </h3>
        <ul className="flex gap-4 md:gap-6 items-center">
          {user ? (
            <>
              <button
                className="flex gap-1 md:gap-2 items-center font-semibold"
                onClick={onLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex gap-1 md:gap-2 items-center font-semibold"
                >
                  <FaUser /> Login{" "}
                </Link>
              </li>{" "}
              <Link
                to="/register"
                className="flex gap-1 md:gap-2 font-semibold items-center"
              >
                <FaRegUser /> Register
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
