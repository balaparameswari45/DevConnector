import React, { Component } from "react";
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from './actions/authActions';



//check for token
if (localStorage.jwtToken){
	//set auth token header
	setAuthToken(localStorage.jwtToken);

//Decode token and get user

const decoded = jwt_decode(localStorage.jwtToken);

//set user in redux
store.dispatch(setCurrentUser(decoded));

//check for expired token
const  currentTime = Date.now() /1000;
if(decoded.exp < currentTime){
	//logout user
  store.dispatch(logoutUser());
	//redirect to login
	window.location.href = '/login';
}
}


class App extends Component {
	render() {
	return(
		<Provider store= { store }>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/Login" component={Login} />
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
	}
	}


export default App;
