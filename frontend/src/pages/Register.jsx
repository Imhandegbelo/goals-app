import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../component/Spinner";

export default function Register() {
  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // If registration was successful, or the user is already logged in
    // navigate to Dashboard
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // check that both passwords match
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  const handleChange = (e) => {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main className="flex flex-col md:flex-row">
      <div className="font-poppins md:w-5/12 bg-teal-500 flex justify-center items-center h-[30vh] md:h-[92vh]">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="md:mb-20 mt-4 w-4/5 mx-auto">
            To keep connected with your goals please login with personal info
          </p>
          <Link
            to="/login"
            className="text-lg hidden md:block w-3/5 mx-auto py-3 border border-white rounded-l-full rounded-r-full hover:bg-white hover:text-teal-500 font-bold"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="md:w-7/12 flex justify-center mt-10 md:mt-0 md:items-center">
        <div className="w-11/12 md:w-3/5 text-center">
          <h1 className="font-bold text-3xl text-4xl text-teal-500 mb-10">
            Create Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <input
                title="Name"
                type="text"
                className="w-full bg-teal-50 py-2 px-4 text-xl"
                value={name}
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <input
                title="Email"
                type="email"
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
                className="w-full bg-teal-50 py-2 px-4 text-xl"
                value={password}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <input
                title="Confirm password"
                type="password"
                className="w-full bg-teal-50 py-2 px-4 text-xl"
                value={password2}
                name="password2"
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </div>
            <div className="mt-10 py-3">
              <button className=" flex gap-4 items-center mx-auto text-lg text-white py-3 px-20 bg-teal-500 border border-white rounded-l-full rounded-r-full hover:bg-teal-400 font-bold">
                <FaUserEdit /> Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function CustomeLink({ path, text, primary }) {
  return <Link to={path}>{text}</Link>;
}
