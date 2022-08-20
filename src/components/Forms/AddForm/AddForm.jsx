import styles from './AddForm.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import heroesAPI from '../../../services/servicesApi';

export const AddForm = props => {
  const initState = {
    name: '',
    nicklname: '',
    description: '',
    superpowers: '',
    catchPhrase: '',
  };
  const [imageURL, setImageURL] = useState('');
  const [initialValues, setInitialValues] = useState(initState);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must not exceed 10 characters'),
    nicklname: Yup.string(),
    description: Yup.string(),
    superpowers: Yup.string(),
    catchPhrase: Yup.string(),
    imageURL: Yup.string(),
  });
  const dataValue = new FormData();

  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, e) => {
    const { onHide } = props;
    const { name, nicklname, description, catchPhrase, superpowers } = data;
    dataValue.append('name', name);
    dataValue.append('nicklname', nicklname);
    dataValue.append('description', description);
    dataValue.append('superpowers', superpowers);
    dataValue.append('catchPhrase', catchPhrase);
    dataValue.append('imageURL', imageURL);

    heroesAPI.addHero(dataValue);
    onHide();
  };
  const onError = error => {
    console.log('ERROR:::', error);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="add-hero-form" centered>
      <Modal.Header closeButton>
        <Modal.Title id="add-hero-form">
          Add info about your favorite hero
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          encType="multipart/form-data"
          method="POST"
        >
          <Form.Group className="name" controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              {...register('name')}
            />
          </Form.Group>

          <Form.Group className="nickname" controlId="nickname">
            <Form.Label>Nickname :</Form.Label>
            <Form.Control
              type="text"
              placeholder="nickname"
              {...register('nickname')}
            />
          </Form.Group>

          <Form.Group className="description" controlId="description">
            <Form.Label>Superpowers</Form.Label>
            <Form.Control as="textarea" rows={3} {...register('description')} />
          </Form.Group>

          <Form.Group className="superpowers" controlId="superpowers">
            <Form.Label>Superpowers</Form.Label>
            <Form.Control as="textarea" rows={3} {...register('superpowers')} />
          </Form.Group>

          <Form.Group className="CatchPhrase" controlId="CatchPhrase">
            <Form.Label>Catch phrase</Form.Label>
            <Form.Control as="textarea" rows={3} {...register('catchPhrase')} />
          </Form.Group>

          <Form.Group controlId="formFile" className="formFile">
            <Form.Label>Choose an image to upload</Form.Label>
            <Form.Control
              type="file"
              name="imageURL"
              multiple
              onChange={e => {
                setImageURL(e.target.files[0]);
              }}
            />
          </Form.Group>
          <Modal.Footer>
            <Button type="submit">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
