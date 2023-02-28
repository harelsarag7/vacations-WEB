import "./Register.scss";
import { useForm } from "react-hook-form";
import { userModel } from "../../../../../Models/userModel";
// import { authFunctions } from "../../../../../Services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import img from "../../Auth/Login/vacation.jpg"
import logoText from "../../Auth/Login/logo-vacations-text.jpg"
import { login } from "../../../../../App/authSlice";
import { authFunctions } from "../../../../../Services/auth";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register,reset, handleSubmit, formState: { errors } } = useForm<userModel>();
  const [wrong, setWrong] = useState<string>("");
  const dispatch = useDispatch();

  function registerFunction( user : userModel){

     authFunctions.register( user ).then( (res: string) => {

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
        <div className="Register_Container">
        <div className="Register">
          <div className="vacation_image_register">
              <img src={img} alt="" />
          </div>
          <div className="form_container">
            <form onSubmit={ handleSubmit(registerFunction)}>
              <div className="logo_register_form"><img src={logoText} alt="" /></div>
              <p className="signUp_text_form">Sign up for FREE</p>

                <input className={errors.firstName ? "invalid_aria" : "valid_aria"} placeholder="First name" type="text"  {...register("firstName", { required: true })} />
                <div className="errors_div">
                {errors.firstName && errors.firstName.type === "required" && (<span role="alert">First Name is required</span>)}
                </div>
                  
              
                <input className={errors.lastName ? "invalid_aria" : "valid_aria"} placeholder="Last name" type="text" {...register("lastName", { required: true })} />
                <div className="errors_div">
                {errors.lastName && errors.lastName.type === "required" && (<span role="alert">Last Name is required</span>)}
                </div>
                
                <input className={errors.email || wrong !== "" ? "invalid_aria" : "valid_aria"} placeholder="Email address" type="email" {...register("email", { required: true, maxLength: 30 })}/>
                <div className="errors_div">
                {errors.email && errors.email.type === "required" && <span>Email is required</span>}
                {wrong ? <span> This email is already taken </span> :<></>}
                </div>

                <input className={errors.password ? "invalid_aria" : "valid_aria"} placeholder="Password" type="password" {...register("password", { required: true, minLength: 4 })} />
                <div className="errors_div">
                {errors.password && errors.password.type === "required" && <span>Password is Required.</span>}
                {errors.password && errors.password.type === "minLength" && <span>Password min 4 letters.</span>}
                </div>



                <button type="submit" >REGISTER</button>

              <Link className="link_to_register_in_register_form" to={"/login"}>Already a member? login</Link>
              <p className="terms_register_form">Terms of use. Privacy policy</p>
            
            </form>
          </div>
        </div>
    </div>
    );
}



export default Register;
