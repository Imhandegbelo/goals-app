import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // if successful or user is found
    // navigate to dashboard
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [message, isError, isSuccess, isLoading, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  const handleChange = (e) => {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="flex flex-col md:flex-row">
      <div className="font-poppins md:w-5/12 bg-teal-500 flex justify-center items-center h-[30vh] md:h-[92vh]">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="md:mb-20 mt-4 w-10/12 mx-auto">
            To keep connected with your goals please login with personal info
          </p>
          <Link
            to="/register"
            className="text-lg hidden md:block w-3/5 mx-auto py-3 border border-white rounded-l-full rounded-r-full hover:bg-white hover:text-teal-500 font-bold"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="md:w-7/12 flex justify-center pt-16 md:pt-0 md:items-center relative">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-11/12 md:w-3/5 text-center">
            <h1 className="font-bold text-4xl text-teal-500 tracking-[2px]">
              Login
            </h1>
            <p className="text-teal-900 mb-10">Login to start setting goals</p>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <input
                  title="Email"
                  type="email"
                  autoComplete="false"
                  className="w-full bg-teal-50 py-2 px-4 text-xl"
                  value={email}
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <input
                  title="Password"
                  type="password"
                  autoComplete="false"
                  className="w-full bg-teal-50 py-2 px-4 text-xl"
                  value={password}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-10 py-3">
                <button className="flex gap-4 mx-auto items-center text-lg text-white py-3 px-20 bg-teal-500 border border-white rounded-l-full rounded-r-full hover:bg-teal-400 font-bold">
                  <FaUser />
                  {isLoading? (
                    <div className="bg-white rounded-full h-10 w-10">
                      <div className="border-b border-teal-400 animate-spin h-full w-full"></div>
                    </div>
                  ):
                  "Login"
                  }
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

function CustomeLink({ path, text, primary }) {
  return <Link to={path}>{text}</Link>;
}
