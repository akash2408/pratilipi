import { server_url } from './types';
import { useSelector , useDispatch} from 'react-redux';
import { addFlashMessage } from '../Actions/flashMessages';
import refresh from '../Actions/refreshAction';

export function likeStory(id){
    return dispatch => {
      const token = localStorage.getItem('accessToken');
        return fetch(`${server_url}/story/like`,{
          method : 'put',
          headers : {
            "Content-Type":"application/json",
            "authorization" : `Bearer ${ token }`
          },
          body : JSON.stringify({
            story_id : id
          })
        })
        .then(async (response) => {
          const status = await response.status;
          if(response.status == 400){ 
            const data = await response.json();   
            if(data.msg == 'Access token expired'){
              return dispatch(refresh())
              .then(()=>{ 
                return likeStory(id); 
              })
              .catch((error) => {
                  console.error('There was an error!', error);
              });
            }   
          }
          else{
            const data = await response.json();
            dispatch(addFlashMessage({ type : 'success', text: data.msg}));
            return data.story;

          }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
      }
  }

export function dislikeStory(id){
  return dispatch => {
  const token = localStorage.getItem('accessToken');
      return fetch(`${server_url}/story/dislike`,{
        method : 'put',
        headers : {
          "Content-Type":"application/json",
          "authorization" : `Bearer ${ token }`
        },
        body : JSON.stringify({
          story_id : id
        })
      })
      .then(async (response) => {
        const status = await response.status;
        if(response.status == 400){ 
          const data = await response.json();   
            if(data.msg == 'Access token expired'){
              return dispatch(refresh())
              .then(()=>{ 
                return dislikeStory(id); 
              })
              .catch((error) => {
                  console.error('There was an error!', error);
              });
            }  
        }
        else{
          const data = await response.json();
          dispatch(addFlashMessage({ type : 'success', text: data.msg}));
          return data.story;
        }
      })
      .catch((error) => {
          console.error('There was an error!', error);
      });
    }
}
