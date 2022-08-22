import styles from './EditForm.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  useGetHeroesQuery,
  useCreateHeroMutation,
} from '../../../redux/heroes/heroesApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const EditForm = props => {
  const dataValue = new FormData();
  const initState = {
    name: '',
    nickname: '',
    description: '',
    superpowers: '',
    catchPhrase: '',
  };

  const [initialValues, setInitialValues] = useState(initState);
  const [isDisabled, setIsDisabled] = useState(true);
  const { data: heroes, refetch } = useGetHeroesQuery();
  const [createHero, { isLoading: isUpdating, isSuccess: successfullyAdded }] =
    useCreateHeroMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must not exceed 10 characters'),
    nickname: Yup.string(),
    description: Yup.string(),
    superpowers: Yup.string(),
    catchPhrase: Yup.string(),
    imageURL: Yup.string(),
  });

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
  const disabledStatus = e => {
    const name = e.currentTarget.childNodes[1].value;
    const heroFinder = heroes.find(
      contact =>
        contact.name.toLowerCase() ===
        name.toLowerCase().replace(/ +/g, ' ').trim()
    );
    if (heroFinder) {
      setIsDisabled(true);
      return Notify.warning(`${name} is already in heroes list.`);
    }
    setIsDisabled(false);
  };

  const onSubmit = (data, e) => {
    const { onHide } = props;
    const { name, nickname, description, catchPhrase, superpowers } = data;
    dataValue.append('name', name);
    dataValue.append('nickname', nickname);
    dataValue.append('description', description);
    dataValue.append('superpowers', superpowers);
    dataValue.append('catchPhrase', catchPhrase);
    dataValue.append('imageURL', imageURL);

    createHero(dataValue);
    onHide();
  };
  const onError = error => {
    console.log('ERROR:::', error);
  };
  useEffect(() => {
    if (successfullyAdded) {
      Notify.success(`Contact added successfully`);
    }
    refetch();
  }, [successfullyAdded]);

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
          <Form.Group
            className="name"
            controlId="name"
            onChange={e => {
              disabledStatus(e);
            }}
          >
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              {...register('name')}
            />
            {errors.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
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
            <Form.Label>Description</Form.Label>
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
          <Modal.Footer>
            <Button type="submit" disabled={isDisabled}>
              {isUpdating ? <>Adding...</> : <>Add hero</>}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
