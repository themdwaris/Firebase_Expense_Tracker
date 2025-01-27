import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../fbConfig";
import FirebaseCrud from "./FirebaseCrud";

const UserAuth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const errorConfig = {
    name: [{ required: true, msg: "Name is required" }],
    email: [{ required: true, msg: "Email is required" }],
    password: [{ required: true, msg: "Password is required" }],
  };
  const provider = new GoogleAuthProvider();

  const validateForm = (form) => {
    const errorMessage = {};
    Object.entries(form).forEach(([key, value]) => {
      errorConfig[key].forEach((rule) => {
        if (rule.required && value.trim() === "") {
          errorMessage[key] = rule.msg;
        }
      });
    });
    setErrors(errorMessage);
    return errorMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validForm = validateForm(formData);
    if (Object.entries(validForm).length) return;

    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });
      // console.log(user);
      setIsLogin(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    setFormData({ name: "", email: "", password: "" });
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(user);
      setFormData({ name: "", email: "", password: "" });
      // console.log(user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      // console.log(user);
      console.log("signed in");
    } catch (error) {
      console.log("Login with Google Error", user);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("signed out");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-3xl text-center pt-24">Loading...</div>
      ) : user ? (
        <FirebaseCrud user={user} isLoading={isLoading} logout={logout} />
      ) :   (
        <div className="w-full">
          <h1 className="text-center py-10 text-5xl md:text-6xl font-semibold">
            {isLogin ? "Sign In" : "Sign Up"}
            {isLogin ? (
              <p className="text-[18px] font-normal mt-8">
                Don't have an account?
                <span
                  className="underline cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  &nbsp;Sign up
                </span>
              </p>
            ) : (
              <p className="text-[18px] font-normal mt-8">
                Already have an account?
                <span
                  className="underline cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  &nbsp;Login
                </span>
              </p>
            )}
          </h1>
          <div className="w-full flex justify-center ">
            <button
              className="w-full max-w-[400px] flex items-center justify-center h-[50px] mb-5 rounded-full bg-slate-800 transition-transform hover:bg-slate-950 active:scale-90 cursor-pointer hover:bg-white/30"
              onClick={loginWithGoogle}
            >
              <span className="text-xl pt-1 pr-2">
                <ion-icon name="logo-google"></ion-icon>
              </span>
              &nbsp;Login with Google
            </button>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto flex flex-col gap-4"
          >
            {!isLogin && (
              <div >
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInput}
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-3 pb-8 bg-transparent outline-none text-xl text-white border-b focus:border-green-500 focus:border-b-2"
                />
                <p className="text-red-400 mt-2">{errors.name}</p>
              </div>
            )}

            <div >
              <input
                type="email"
                value={formData.email}
                onChange={handleInput}
                name="email"
                placeholder="Enter email"
                className="w-full p-3 pb-8 bg-transparent outline-none text-xl text-white border-b focus:border-green-500 focus:border-b-2"
              />
              <p className="text-red-400 mt-2">{errors.email}</p>
            </div>

            <div >
              <input
                type="password"
                value={formData.password}
                onChange={handleInput}
                name="password"
                placeholder="Enter password"
                className="w-full p-3 pb-8 bg-transparent outline-none text-xl text-white border-b focus:border-green-600 focus:border-b-2"
              />
              <p className="text-red-400 mt-2">{errors.password}</p>
            </div>
            {isLogin ? (
              <button
                className="w-full p-3 rounded-full bg-green-600 transition-transform  text-white cursor-pointer text-xl mt-8 active:scale-90 hover:bg-green-700"
                onClick={handleSignIn}
              >
                Login
              </button>
            ) : (
              <button
                className="w-full p-3 rounded-full bg-green-600 text-white cursor-pointer text-xl mt-8 transition-transform active:scale-90 hover:bg-green-700"
                type="submit"
              >
                Signup
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default UserAuth;
