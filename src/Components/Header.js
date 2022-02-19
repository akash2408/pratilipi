import { useState } from 'react';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { setLoggedIn } from '../Actions/isLoggedIn';
import { addFlashMessage} from '../Actions/flashMessages';
import { useSelector , useDispatch} from 'react-redux';

function Header(){
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(setLoggedIn(false));
		dispatch(addFlashMessage({ type : 'success', text: 'Logged Out Successfully'}));
		navigate('/login');
	}
	return(
		<nav className ="navbar navbar-expand-lg navbar-dark bg-danger">
		<div className = "container">
		  <Link to ="/home" className = "navbar-brand" style = {{ fontSize: "26px" }}>Home</Link>
		  <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
		    <span className ="navbar-toggler-icon"></span>
		  </button>

		  <div className ="collapse navbar-collapse" id="navbarToggler">
		    <ul className ="navbar-nav ml-auto mt-2 mt-lg-0">
		      { isLoggedIn ?(
		      	  <>
			      <li className ="nav-item">
			        <a className ="active nav-link" href = "#" onClick = {logOut} >Logout</a>
			      </li>
			      </>
			    ):
			    (
		      	  <>
			      <li className ="nav-item">
			        <NavLink className={({ isActive }) =>
	              		isActive ? 'active' : undefined } 
	            	to ="/login" className ="nav-link">Login</NavLink>
			      </li>
			      <li className ="nav-item ">
			        <NavLink className={({ isActive }) =>
	              		isActive ? 'active' : undefined } 
			        to ="/signup" className ="nav-link">Sign Up</NavLink>
			      </li>
			      </>
			    )

		      }
		    </ul>
		    <div>
		    </div>
		  </div>
		  </div>
		</nav>
    );
}

export default Header;