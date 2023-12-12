import { useState } from "react";
import { FaUber } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormDate] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const {username, email, password, password2} = formData

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="flex">
      <div className="font-poppins w-5/12 bg-teal-500 flex justify-center items-center h-[92vh]">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="mb-20 mt-4">
            To keep connected with your goals please login with personal info
          </p>
          <Link
            to="/login"
            className="text-lg py-3 px-20 border border-white rounded-l-full rounded-r-full hover:bg-white hover:text-teal-500 font-bold"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-7/12 flex justify-center items-center">
        <div className="w-3/5 text-center">
          <h1 className="font-bold text-4xl text-teal-500 mb-10 underline">
            Create Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <input
                title="Name"
                type="text"
                className="w-full bg-teal-50 py-2 px-4 text-xl"
                value={username}
                name="username"
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
                <FaUber /> Register
                
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
