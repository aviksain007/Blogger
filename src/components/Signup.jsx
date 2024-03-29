import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loading from "./Loading.jsx";
import conf from "../conf/conf.js";
import authLogo from "../assets/authLogo.png";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [demoLoding, setDemoloding] = useState(false);

  const create = async (data) => {
    setError("");
    try {
      setLoading(true);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handelDemoLogin = async () => {
    const userData = {
      email: conf.demoLoginEmail,
      password: conf.demoLoginPassword,
    };

    try {
      setDemoloding(true);
      const session = await authService.login(userData);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      } 
    } catch (error) {
      setError(error.message);
    } finally {
      setDemoloding(false);
    }
    
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-slate-700 rounded-xl p-10 `}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <div className="text-center	">
              <img src={authLogo} alt="Logo" className="w-24 " />
            </div>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-white">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 ">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
              className="bg-slate-300 border-none focus:bg-white focus:text-black text-black"
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="bg-slate-300 border-none focus:bg-white focus:text-black text-black"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
              className="bg-slate-300 border-none focus:bg-white text-black"
            />
            <Button type="submit" className="flex justify-center w-full hover:opacity-70">
              {loading ? <Loading /> : "Create Account"}
            </Button>
          </div>
        </form>
        <button
          onClick={handelDemoLogin}
          className="flex justify-center w-full mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {demoLoding ? <Loading /> : "Demo Login"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
