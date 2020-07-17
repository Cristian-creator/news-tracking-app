import React, { Component } from 'react'
import './Navbar.css';
import ModalComponent from '../modal/Modal';
import Register from '../register-login/register/Register';
import Login from '../register-login/login/Login';

// redux
import { connect } from 'react-redux';
import { userDisconnect } from '../../store/actions/user/user-actions';

// tostify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();


class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            registerOpen: false,
            loginOpen: false
        }
    }

    toggleOff = () => this.setState({ registerOpen: false, loginOpen: false });

    notify = () => {
        // toast('Basic notification');
        
        toast.error("Disconnected!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    
    }
    
    disconnect = () => {
        localStorage.removeItem('token');
        this.props.userDisconnect();
        // setTimeout(() => {
            this.notify();
        // }, 100);
    }
    

    
    render() {
        const { registerOpen, loginOpen } = this.state;
        const { firstName, secondName } = this.props.userData;
        const utils = !firstName ? (
        <>
            <p onClick={() => this.setState({ registerOpen: true, wrapperClass: "wrapper show" })}> Register </p>
            <p onClick={() => this.setState({ loginOpen: true, wrapperClass: "wrapper show" })}> Login </p>
        </>
        ) : (
        <>
            <p> { firstName } { secondName } </p>
            <p onClick={() => this.disconnect()}> Disconnect </p>
        </>
        );

        return (
            <div className="navbar">
                <div className="">
                    <h1> {`<News Tracking/>`} </h1>
                </div>
                <div className="utils">
                    {   utils   }
                </div>

                <ModalComponent title={"Register"} content={<Register />} show={registerOpen} onHide={() => this.setState({ registerOpen: false })} />
                <ModalComponent title={"Login"} content={<Login toggleOff={this.toggleOff} />} show={loginOpen} onHide={() => this.setState({ loginOpen: false })} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.user.data
});

export default connect(mapStateToProps, { userDisconnect })(Navbar);