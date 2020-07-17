// import React from 'react'
// import './Modal.css'

// export default function Modal({ title, content }) {
//     return (
//         <div className="modal">
//             <header>
//                 <h3> {title} </h3>
//                 <i class="fas fa-times"></i>
//             </header>
//             { content }
//         </div>
//     )
// }

import { Modal, Button } from 'react-bootstrap';
import React from 'react'


export default function ModalComponent(props) {
    return (
      <>
        <style type="text/css">
        {`
        .modal-header {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
        }
        .modal-header button {
          color: white;
          font-size: 2rem;
        }
        
        `}
      </style>
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            { props.title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { props.content }
        </Modal.Body>
        <Modal.Footer>
            {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
    );
}