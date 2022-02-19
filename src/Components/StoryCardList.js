import MyVerticallyCenteredModal from "../Components/Modal";
import { useState } from 'react';
import { server_url } from '../Actions/types';
import { useSelector ,useDispatch } from 'react-redux';
import { likeStory ,  dislikeStory } from '../Actions/likeDislikeEventActions';
import { addFlashMessage } from '../Actions/flashMessages';

function StoryCard(props) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);

	const { _id, title, content, likes , date, isLiked } = props;

	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(false);
	const [storyData, setStoryData] = useState(props);

	function showModalEvent(){
		setShowModal(true);
		setModalData(storyData);
	}

	const likeStoryEvent =  () =>{
		if(isLoggedIn){
			dispatch(likeStory(_id))
			.then((res)=>{	
				if(res){
					setModalData({
		              ...res,
		              isLiked: true,
		              });
		            setStoryData({
		              ...res,
		              isLiked: true,
		              })
				}
			})
	        .catch((error) => {
	            console.error('There was an error!', error);
	        });
		}
	    else{
	      dispatch(addFlashMessage({ type : 'danger', text: 'You Need To Login First'})); 
	    }
	}
	const dislikeStoryEvent =  () =>{
		if(isLoggedIn){
			dispatch(dislikeStory(_id))
			.then((res)=>{	
				if(res){
					setModalData({
		              ...res,
		              isLiked: false,
		              });
		            setStoryData({
		              ...res,
		              isLiked: false,
		              })
				}
			})
	        .catch((error) => {
	            console.error('There was an error!', error);
	        });	
		}
	    else{
	      dispatch(addFlashMessage({ type : 'danger', text: 'You Need To Login First'})); 
	    }	
	}
	return (
	<div className ="col-sm-12 col-md-6 col-lg-4" key = { storyData._id }>
	    <div className="card indexCards shadow border-0 mt-4">
		  <ul className="list-group list-group-flush">
		    <li className="list-group-item" onClick = { showModalEvent } >
		    	<h5 className="card-title text-center">{storyData.title}</h5>
		  	</li>
		    <li className="list-group-item">
		    	<i className ="bi bi-hand-thumbs-up"><span className= "ml-1">{storyData.likes}</span></i>
		    	{ storyData.isLiked ? 
		    		(<button className ="mt-3 btn btn-block btn-danger"  onClick = { dislikeStoryEvent } ><i className ="bi bi-hand-thumbs-down"><span className = "ml-1">Dislike</span></i> </button>):
		    		(<button className ="mt-3 btn btn-block btn-primary" onClick = { likeStoryEvent }><i className ="bi bi-hand-thumbs-up"><span className = "ml-1">Like</span></i> </button>)

		    	}
		    </li>
		  </ul>
		</div>
	  <MyVerticallyCenteredModal 
	  	dislikeEvent = { dislikeStoryEvent }
	  	likeEvent = { likeStoryEvent }
	  	data = {modalData}
	    show={showModal}
        onHide={() => setShowModal(false)}
        />
	</div>
	);
}

function StoryCardList(props) {
	const storyData = props.storyList;
	const userLikeList = props.userLikeList;
	return (
	  <>
	  <div className= "container">
		  <div className="row">
		  	{ 
		  		storyData.map((val) => { 
		  			if( userLikeList.some(e => e.story === val._id ) ){
		  				val.isLiked = true;
		  			}
		  			else{
		  				val.isLiked = false;
		  			}
		  			return StoryCard(val)
		  		})
		    }		  
		  </div>
	  </div>
	  </>
	);
}

export default StoryCardList;