import { useState} from 'react';

function Upload(){

	const [file,setFile] = useState(null);

  	const onFormSubmit = (event) => {
    	event.preventDefault();
      	const formData = new FormData();
      	formData.append('myfile',this.state.file);
  	}

  	const onChange = (e) => {
  		setFile(e.target.files);
  	}

	return(
	  <div className ="container mt-5">
	    <div className ="row">
	    	<div className ="col"></div>
	      	<div className ="col-sm-7 col-md-6 col-lg-5">
	        	<div className ="card shadow border-0">
	          		<div className ="card-body">
	            		<h1 className ="text-center">File Uploa</h1>
				      	<form onSubmit = { onFormSubmit }>
				          	<input type="file" className="custom-file-input" name="myImage" onChange= { onChange } />
				          	{console.log(file)}
				          	<button className="upload-button" type="submit">Upload</button>
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