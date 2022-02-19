import { Modal , Button } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  var { data , dislikeEvent , likeEvent, ...props } = props;
  const date = new Date( data.date ).toLocaleDateString();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable = 'true'
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Title : { data.title }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          { data.content }
        </p>
      </Modal.Body>
	    <div className="list-group-item">
	    	<div className = "ml-2 mr-2 row justify-content-between">
	    	<i className ="bi bi-hand-thumbs-up"><span className= "ml-1">{data.likes}</span></i>
	  		<div>Date Published : { date }</div>
	    	</div>
          { data.isLiked ? 
            (<button className ="mt-3 btn btn-block btn-danger"  onClick = { dislikeEvent } ><i className ="bi bi-hand-thumbs-down"><span className = "ml-1">Dislike</span></i> </button>):
            (<button className ="mt-3 btn btn-block btn-primary" onClick = { likeEvent }><i className ="bi bi-hand-thumbs-up"><span className = "ml-1">Like</span></i> </button>)

          }
	    </div >
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
