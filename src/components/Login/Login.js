import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/Login.jpg";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext/UserContext";

export default function Login() {
  const [user,setUser] = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({ email: "" });
  const navigate = useNavigate();


  const onSubmit = (data) => {

    const signInURL = "http://127.0.0.1:13020/user/signin"

    axios.post(signInURL,data)
    .then((response) => {
      console.log(response.data)
      
      if(response.data.length == 0){
        navigate("/error")  
        return;
      }else{
        setUser(response.data)

        
        if (data.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      }
      
    })
    .catch((err) => {
      console.log(err)
      navigate('/error')
    })


    
  };

  return (
    <div className="wrapper signIn">
      <div className="illustration">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="form">
        <div className="heading">LOGIN</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit">SUBMIT</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}