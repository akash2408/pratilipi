import { useState , useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { addFlashMessage } from '../../Actions/flashMessages';
import StoryCardList from '../../Components/StoryCardList';
import { server_url } from '../../Actions/types';
import refresh from '../../Actions/refreshAction';
import { useSearchParams } from "react-router-dom";
import { Link, NavLink , useNavigate} from 'react-router-dom';

function Home(){
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const [storyData, setStoryData] = useState([]);
	const [userLikeList, setUserLikeList] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy");
	const orderBy = searchParams.get("orderBy");
	useEffect(()=>{
		setStoryData([]);
		setUserLikeList([]);
		Promise.all([fetchData(),fetchUserLikeList()]).then((result)=>{
			setStoryData(result[0]);
			setUserLikeList(result[1]);
		})
	},[sortBy,orderBy])

	async function fetchData() {
		return fetch(`${server_url}/story?sortBy=${sortBy}&orderBy=${orderBy}`,{
			method : 'get',
			headers : {
				"Content-Type":"application/json"
			},
		})
		.then(async (response) => {
			const status = await response.status;
			if(response.status == 400){	
				const data = await response.json();
				dispatch(addFlashMessage({ type : 'danger', text: data.msg}));	
			}
			else{
				const data = await response.json();
				return data.storyList;
			}
		})
        .catch((error) => {
            console.error('There was an error!', error);
        });
	}

	async function fetchUserLikeList(){

		const token = localStorage.getItem('accessToken');

		if( isLoggedIn ){
			return fetch(`${server_url}/user/likes`,{
				method : 'get',
				headers : {
					"Content-Type":"application/json",
					"authorization" : `Bearer ${ token }`
				},
			})
			.then(async (response) => {
				const status = await response.status;
				if(response.status == 400){	
					const data = await response.json();
					if(data.msg == 'Access token expired'){
						return dispatch(refresh())
						.then(()=>{	
							return fetchUserLikeList() 
						})
				        .catch((error) => {
				            console.error('There was an error!', error);
				        });
					}	
				}
				else{
					const data = await response.json();
					return data.userLikedStoryList;
				}
			})
	        .catch((error) => {
	            console.error('There was an error!', error);
	        });
		}
		else{
			return [];
		}
	}

	return (
	  <>
	  <nav id="sortNav" className ="navbar navbar-expand navbar-light bg-white shadow-sm">
	    <div className ="container">
		  <div className ="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul className ="navbar-nav mr-auto">
		      <li className ="nav-item dropdown">
		        <div className ="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
		          Sort By
		        </div>
		        <div className ="dropdown-menu" >
		        	<Link to ="/home?sortBy=likes&orderBy=asc" className ="dropdown-item">Likes - By Asc</Link>
		        	<Link to ="/home?sortBy=likes&orderBy=desc" className ="dropdown-item">Likes - By Desc</Link>
		        </div>
		      </li>
		    </ul>
		  </div>
	    </div>
	  </nav>
	  <StoryCardList storyList = { storyData } userLikeList = {userLikeList} />
	  </>
	);
}

export default Home;