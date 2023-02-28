import "./Login.scss";
import { useForm } from "react-hook-form";
import { userModel } from "../../../../../Models/userModel";
import { authFunctions } from "../../../../../Services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../../../../App/authSlice";
import img from "../Login/vacation.jpg"
import logoText from "../Login/logo-vacations-text.jpg"

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register,reset, handleSubmit, formState: { errors } } = useForm< userModel>();
  const [wrong, setWrong] = useState<string>("") 
  const dispatch = useDispatch();

  function loginFunction( { email, password }: userModel){

    authFunctions.login( email, password ).then( (res: string) => {

     if(res === "") {
       setWrong("Wrong Email or Password")
       return 
     }
     dispatch(login(res));
       navigate(`/`);
       
       // setOpen(false);
   })
}

    return (
      <div className="Login_Container">

        <div className="Login">
          <div className="vacation_image_login">
              <img src={img} alt="" />
          </div>
          <div className="form_container">
            <form onSubmit={ handleSubmit(loginFunction)}>
              <div className="logo_login_form"><img src={logoText} alt="" /></div>
              <p className="signIn_text_form">Sign into your account</p>

                <input className={errors.email ? "invalid_aria" : "valid_aria"} placeholder="Email address" type="email" {...register("email", { required: true })}/>
                <div className="errors_div">
                {errors.email && errors.email.type === "required" && (<span role="alert">Email is required</span>)}
                </div>

                <input className={errors.password ? "invalid_aria" : "valid_aria"} placeholder="Password" type="password" {...register("password", { required: true, minLength: 4  })} />
                <div className="errors_div">
                {errors.password && errors.password.type === "required" && (<span role="alert">Password is required</span>)}
                {errors.password && errors.password.type === "minLength" && <span>Password min 4 letters.</span>}
                </div>
                
                <button type="submit" >LOGIN</button>

              <Link className="link_to_register_in_login_form" to={"/register"}>Don't have an account? Register here</Link>
              <p className="terms_login_form">Terms of use. Privacy policy</p>
            
            </form>
          </div>
        </div>
     </div>
    );
}



export default Login;
