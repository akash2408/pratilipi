import { server_url } from './types';
import { addFlashMessage } from './flashMessages';

export default function refresh()  {
	return dispatch => {
		const refreshToken = localStorage.getItem('refreshToken');
		return fetch(`${server_url}/refresh`,{
			method : 'post',
			headers : {
				"Content-Type":"application/json"
			},
			body : JSON.stringify({
				token : refreshToken
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
				localStorage.setItem('accessToken', data.accessToken);
			}
		})
	    .catch((error) => {
	        console.error('There was an error!', error);
	    });
	  }
}