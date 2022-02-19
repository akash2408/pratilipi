import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFlashMessage } from '../../Actions/flashMessages';
import { setLoggedIn } from '../../Actions/isLoggedIn';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { server_url } from '../../Actions/types';

function Login(){
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const postData = () => {
		fetch(`${server_url}/login`,{
			method : 'post',
			headers : {
				"Content-Type":"application/json"
			},
			body : JSON.stringify({
				userInfo : {
					email : user.email,
					password : user.password
				}
			})
		})
		.then(async (response) => {
			const status = await response.status;
			if(response.status == 400){	
				const data = await response.json();		
				dispatch(addFlashMessage({ type : 'danger', text: data.msg}));	
			}
			else{
				const data = await response.json();
				console.log(data);
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				dispatch(addFlashMessage({ type : 'success', text: data.msg}));
				dispatch(setLoggedIn(true));
				navigate('/home');
			}
		})
        .catch((error) => {
            console.error('There was an error!', error);
        });
	}

	const [user,setUser] = useState({
		email : "",
		password :  ""
	});

	const [error,setError] = useState({
		email : "",
		password :  ""
	});

	const inputEvent = (event) => {

		const {name,value} = event.target;
		setUser((preValue) =>{
			return {
				...preValue,
				[name]: value
			}
		}) 
	
	}

	const onSubmits = (event) => {
		event.preventDefault();
		var emailField = document.getElementById('email');
		var passwordField = document.getElementById('password');
		var validEmail = true;
		var validPass = true;
		if(validator.isEmpty(user.email)){
			validEmail = false;
			setError((preValue) =>{
				return {
					...preValue,
					['email']: 'Email Cannot Be Empty'
				}
			}) 
		}
		else if(validator.isEmail(user.email) == false){
			validEmail = false;
			setError((preValue) =>{
				return {
					...preValue,
					['email']: 'Email Is Invalid'
				}
			}) 
		}
		if(validator.isEmpty(user.password)){
			validPass = false;
			setError((preValue) =>{
				return {
					...preValue,
					['password']: 'Password Cannot Be Empty'
				}
			})
		}
		else if(validator.isStrongPassword(user.password,{minLength: 10}) == 0){
			validPass = false;
			setError((preValue) =>{
				return {
					...preValue,
					['password']: `Password must have : \na minimum of 1 upper case letter [A-Z]\na minimum of 1 lower case letter [a-z]\na minimum of 1 numeric character [0-9]\na minimum of 1 special character\npassword must be at least 10 characters in length`
				}
			})			
		}
		if(validEmail == false){
			emailField.classList.add("is-invalid");
		}
		else{
			emailField.classList.remove("is-invalid");
		}

		if(validPass == false){
			passwordField.classList.add("is-invalid");
		}
		else{
			passwordField.classList.remove("is-invalid");
		}

		if(validEmail == true && validPass == true){
			postData();
		}

	}
	return (
	  <div className ="container mt-5">
	    <div className ="row">
	      <div className ="col"></div>
	      <div className ="col-sm-7 col-md-6 col-lg-5">
	        <div className ="card shadow border-0">
	          <div className ="card-body">
	            <h1 className ="text-center">Login</h1>
	            <form className ="needs-validation" onSubmit = { onSubmits } noValidate>
	              <div className ="form-group">
	                <label className ="form-label">Username</label>
	                <input type="text" name="email" value = {user.email} onChange = {inputEvent} className ="form-control" id="email" placeholder="Username" required/>
	                <div className ="invalid-feedback">
	                  {error["email"]}
	                </div>
	              </div>
	              <div className ="form-group">
	                <label className ="form-label">Password</label>
	                <input type="password" name="password" value = {user.password} onChange = {inputEvent} className ="form-control" id="password" placeholder="Password" required/>
	                <div className ="invalid-feedback" style = { {whiteSpace:'pre' }}>
	                  {error["password"]}
	                </div>
	              </div>
	              <button type="submit" className ="btn btn-danger btn-block">Login</button>
	            </form>
	            <div className ="mt-2 text-center">
	              Don't have an account?
	              <Link to ="/signup"> Sign Up</Link>
	            </div>
	          </div>
	        </div>

	      </div>
	      <div className ="col"> </div>
	    </div>
	  </div>
	);
}

export default Login;