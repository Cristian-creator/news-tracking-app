import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Axios from 'axios';

//  --- redux
import { connect } from 'react-redux';
import { decodeTheJWT } from '../../../store/actions/user/user-actions';

function Login({ decodeTheJWT, toggleOff }) {

  const { register, handleSubmit, errors} = useForm();
  const onSubmit = data => {
    console.log(data);
    Axios.post('/users/login', data)
      .then((res) => {
          console.log(res.data);
          const { success, token } = res.data;
          if(success) {
            localStorage.setItem('token', token);
            decodeTheJWT(token);
            toggleOff();
          }
      })
      .catch((err) => {});
  }

  const [pass, setPass] = useState('');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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
                    }
                })} />
                {errors.password && <span> {errors.password.message} </span>}
            </div>
            
            <input type="submit" className="submit-button" />
        </form>
    );
}

export default connect(null, { decodeTheJWT })(Login);