import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import './Register.css';
import Axios from 'axios';

export default function Register() {

  const { register, handleSubmit, errors, clearErrors, setError, getValues } = useForm();
  const onSubmit = data => {
    const first = getValues("password");
    const second = getValues("password2");
    console.log(first, second);
    console.log(data);
    if(first !== second) {
        setError("password2", {
            type: "manual",
            message: "Passwords dont match."
        });
    } else {
        // ....
        console.log('success');
        delete data.password2;
        Axios.post('/users/register', data)
          .then((res) => console.log(res.data))
            .catch((err) => {})
    }
  }

  const [pass, setPass] = useState('');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    minLength: {
                        value: 3,
                        message: "Minimum of characters is 3.",
                    },
                    maxLength: {
                        value: 50,
                        message: "Maximum of characters is 50."    
                    }
                })} />
                {errors.firstName && <span> This field is required </span>}
            </div>

            <div className="">
                <label htmlFor="secondName">Second Name</label>
                <input name="secondName" ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    minLength: {
                        value: 3,
                        message: "Minimum of characters is 3.",
                    },
                    maxLength: {
                        value: 50,
                        message: "Maximum of characters is 50."    
                    }
                })} />
                {errors.secondName && <span> This field is required </span>}
            </div>

            <div className="">
                <label htmlFor="email">Email</label>
                <input name="email" tyoe="email" ref={register({
                    required: {
                        value: true,
                        message: 'This field is required.'
                    },
                    pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                        message: 'Enter a valid email.'
                    }
                })} />
                {errors.email && <span> {errors.email.message} </span>}
            </div>

            <div className="">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    minLength: {
                        value: 5,
                        message: "Enter a password of at least 5 characters.",
                    },
                    maxLength: {
                        value: 30,
                        message: "Enter a password of up to 30 characters."    
                    }
                })}
                onChange={(e) => {setPass(e.target.value);console.log(e.target.value)}}
                />
                {errors.password && <span> {errors.password.message} </span>}
            </div>

            <div className="">
                <label htmlFor="password2">Repeat password</label>
                <input name="password2" type="password" ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    minLength: {
                        value: 5,
                        message: "Enter a password of at least 5 characters.",
                    },
                    maxLength: {
                        value: 30,
                        message: "Enter a password of up to 30 characters."    
                    }
                })}
                onChange={(e) => {
                    const value = e.target.value;
                    console.log(value, pass)
                    if(value === pass) return clearErrors('password2');
                    // setError('password2', 'notMatch', 'Passwords dont match.')
                    setError("password2", {
                        type: "manual",
                        message: "Passwords dont match."
                      });
                }}
                />
                {errors.password2 && <span> {errors.password2.message} </span>}
            </div>
            
            
            <input type="submit" className="submit-button" />
        </form>
    );
}
