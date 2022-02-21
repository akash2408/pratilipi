import { Alert  } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { deleteFlashMessage } from '../Actions/flashMessages';

function FlashMessage(props){
  	const { id, type, text } = props.message;
  	const dispatch = useDispatch();
   	const [show, setShow] = useState(true);
  	const [alertTimeout, setAlert] = useState(null);

  	useEffect(() => {
		setAlert(
			setTimeout(()=>{
				dispatch(deleteFlashMessage(id));
			}, 3000)
		);

  	},[])

  	const destroyFlashEvent = () =>{
  		clearTimeout(alertTimeout)
  		dispatch(deleteFlashMessage(id));
  	}

	return (
		<Alert show = { show } className = "m-2" variant={type}>
		    <button onClick = { destroyFlashEvent } type = "button"className = "close" data-dismiss = "alert" aria-hidden = "true">
		      &times;
		    </button>
		    {text}
		</Alert>
	);
}

function FlashMessagesList(props){
	const hoverEffect = {
		position: "fixed",
		width : "50%",
	    zIndex: 9999,
	}
	const messages = props.messages;
	return (
		<div style = {hoverEffect}>
		{
			messages.map(message =>
			      <FlashMessage key = { message.id } message={message} />
				)
		}
		</div>
	)

}

export default FlashMessagesList;
