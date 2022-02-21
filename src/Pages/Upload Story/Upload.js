import { useState} from 'react';
import { server_url } from '../../Actions/types';
import { useDispatch } from 'react-redux';
import { addFlashMessage } from '../../Actions/flashMessages';

function Upload(){

	const dispatch = useDispatch();
	const [file,setFile] = useState(null);
	const [error,setError] = useState({
		file : "",
	});


	const postData = () => {
      	var formData = new FormData();
      	formData.append('storyData',file);

		fetch(`${ server_url }/story/create`,{
			method : 'post',
			body : formData
		})
		.then(async (response) => {
			const status = await response.status;
			if(response.status == 400){	
				const data = await response.json();		
				dispatch(addFlashMessage({ type : 'danger', text: data.msg}));	
			}
			else{
				const data = await response.json();
				dispatch(addFlashMessage({ type : 'success', text: data.msg}));
			}
		})
        .catch((error) => {
            console.error('There was an error!', error);
        });
	}
  	const onFormSubmit = (event) => {
    	event.preventDefault();
		var fileField = document.getElementById('file');
		if(file == undefined){
			fileField.classList.add("is-invalid");
			setError((preValue) =>{
				return { file : 'No File Exist'
				}
			})
		}
		else{
			fileField.classList.remove("is-invalid");
			postData();
		}
  	}

  	const onChange = (e) => {
  		setFile(e.target.files[0]);
  	}

	return(
	  <div className ="container mt-5">
	    <div className ="row">
	    	<div className ="col"></div>
	      	<div className ="col-sm-7 col-md-6 col-lg-5">
	        	<div className ="card shadow border-0">
	          		<div className ="card-body">
	            		<h1 className ="text-center">File Upload</h1>
				      	<form onSubmit = { onFormSubmit }>
					      	<div className ="form-group">
					          	<input type="file" className="form-control-file" name = "file" id="file" onChange= { onChange } />
					         	<div className ="invalid-feedback" style = { {whiteSpace:'pre' }}>
	                  				{error["file"]}
	                			</div>
					        </div>
				          	<button type="submit" className ="btn btn-danger btn-block">Upload</button>
				      	</form>
				    </div>
				</div>
			</div>
			<div className ="col"></div>
		</div>
	</div>
	);
}

export default Upload;