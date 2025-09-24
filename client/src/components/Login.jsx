import React from "react";
import { useAppContext } from "../context/AppContext";
import "../css/Login.css";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        `/user/${state}`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="login-overlay" onClick={() => setShowUserLogin(false)}>
      <form
        className="login-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
      >
        <p className="login-title">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="form-group">
            <p>Name</p>
            <input
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <p>Email</p>
          <input
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "register" ? (
          <p className="login-toggle">
            Already have an account?{" "}
            <span onClick={() => setState("login")}>click here</span>
          </p>
        ) : (
          <p className="login-toggle">
            Create an account?{" "}
            <span onClick={() => setState("register")}>click here</span>
          </p>
        )}

        <button type="submit" className="login-button">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
