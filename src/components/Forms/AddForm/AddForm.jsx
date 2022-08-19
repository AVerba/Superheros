import styles from './AddForm.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const AddForm = props => {
  return (
    <Modal {...props} size="lg" aria-labelledby="add-hero-form" centered>
      <Modal.Header closeButton>
        <Modal.Title id="add-hero-form">
          Add info about your favorite hero
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="name" controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control type="text" placeholder="name" />
          </Form.Group>

          <Form.Group className="nickname" controlId="nickname">
            <Form.Label>Nickname :</Form.Label>
            <Form.Control type="text" placeholder="nickname" />
          </Form.Group>

          <Form.Group className="superpowers" controlId="superpowers">
            <Form.Label>Superpowers</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group className="CatchPhrase" controlId="CatchPhrase">
            <Form.Label>Catch phrase</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group controlId="formFile" className="formFile">
            <Form.Label>Choose an image to upload</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};
