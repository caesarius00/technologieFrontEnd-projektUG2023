import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { PickUpContext } from '../contexts/PickUpContext';
import * as yup from 'yup';

const PickUp = () => {
  const { setPickUp, clearPickUp } = useContext(PickUpContext);
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState('');

  const initialValues = {
    tableNumber: '',
    postalCode: '',
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    phoneNumber: '',
  };

  const handleDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
  };

  const handlePickUpSubmit = (values) => {
    console.log('Form submitted (PickUp):', values);
    setPickUp((prevValues) => ({ ...prevValues, ...values }));
    navigate('/payment');
  };

  const handleDeliverySubmit = (values) => {
    console.log('Form submitted (Delivery):', values);
    setPickUp((prevValues) => ({ ...prevValues, ...values }));
    navigate('/payment');
  };

  const pickUpValidationSchema = yup.object({
    tableNumber: yup
      .number()
      .typeError('Numer stolika musi być liczbą')
      .min(1, 'Numer stolika musi być większy od 0')
      .max(100, 'Numer stolika musi być mniejszy od 100')
      .required('Wprowadź numer stolika'),
  });

  const deliveryValidationSchema = yup.object({
    postalCode: yup
      .string()
      .matches(/^[0-9]{2}-[0-9]{3}$/, 'Kod pocztowy musi być w formacie XX-XXX')
      .required('Wprowadź kod pocztowy'),
    city: yup
      .string()
      .matches(/^[a-zA-Z]+$/, 'Miasto musi składać się z liter')
      .required('Wprowadź miasto'),
    street: yup
      .string()
      .matches(/^[a-zA-Z]+$/, 'Ulica musi składać się z liter')
      .required('Wprowadź ulicę'),
    houseNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Numer domu musi składać się z cyfr')
      .required('Wprowadź numer domu'),
    apartmentNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Numer mieszkania musi składać się z cyfr'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{9}$/, 'Numer telefonu musi składać się z 9 cyfr')
      .required('Wprowadź numer telefonu'),
  });

  return (
    <div className='container'>
      <div className='left-button-container'>
        <Link to='/products'>
          <button className='button-no' onClick={clearPickUp}>Wróć</button>
        </Link>
      </div>
      <div className='site-box'>
        <h1>Formularz zamówienia</h1>
        <div className='radio-group'>
          <label className='radio-label'>
            <input
              type='radio'
              name='deliveryType'
              value='dostawa'
              className='radio-input'
              checked={deliveryType === 'dostawa'}
              onChange={handleDeliveryTypeChange}
            />
            Dostawa
          </label>
          <label className='radio-label'>
            <input
              type='radio'
              name='deliveryType'
              value='stolik'
              className='radio-input'
              checked={deliveryType === 'stolik'}
              onChange={handleDeliveryTypeChange}
            />
            Do stolika
          </label>
          <label className='radio-label'>
            <input
              type='radio'
              name='deliveryType'
              value='odbior'
              className='radio-input'
              checked={deliveryType === 'odbior'}
              onChange={handleDeliveryTypeChange}
            />
            Odbiór osobisty
          </label>
        </div>
        <br />
        {deliveryType === 'stolik' && (
          <Formik initialValues={initialValues} onSubmit={handlePickUpSubmit} validationSchema={pickUpValidationSchema}>
            {({ values, handleChange }) => (
              <Form>
                <div className='spread'>
                  <div className='form-row'>
                    <label className='form-label'>
                      Numer stolika:
                      <Field type='number' name='tableNumber' onChange={handleChange} />
                      <ErrorMessage name='tableNumber' component='div' className='error-message' />
                    </label>
                  </div>
                </div>
                <div className='right-button-container'>
                  <button type='submit'>Zamów</button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {deliveryType === 'dostawa' && (
          <Formik initialValues={initialValues} onSubmit={handleDeliverySubmit} validationSchema={deliveryValidationSchema}>
            {({ values, handleChange }) => (
              <Form>
                <div className='spread'>
                  <div className='form-row'>
                    <label className='form-label'>
                      Kod pocztowy:
                      <Field type='text' name='postalCode' onChange={handleChange} />
                      <ErrorMessage name='postalCode' component='div' className='error-message' />
                    </label>
                  </div>
                  <div className='form-row'>
                    <label className='form-label'>
                      Miasto:
                      <Field type='text' name='city' onChange={handleChange} />
                      <ErrorMessage name='city' component='div' className='error-message' />
                    </label>
                  </div>
                  <div className='form-row'>
                    <label className='form-label'>
                      Ulica:
                      <Field type='text' name='street' onChange={handleChange} />
                      <ErrorMessage name='street' component='div' className='error-message' />
                    </label>
                  </div>
                  <div className='form-row'>
                    <label className='form-label'>
                      Numer domu:
                      <Field type='text' name='houseNumber' onChange={handleChange} />
                      <ErrorMessage name='houseNumber' component='div' className='error-message' />
                    </label>
                  </div>
                  <div className='form-row'>
                    <label className='form-label'>
                      Numer mieszkania:
                      <Field type='text' name='apartmentNumber' onChange={handleChange} />
                    </label>
                  </div>
                  <div className='form-row'>
                    <label className='form-label'>
                      Numer telefonu:
                      <Field type='text' name='phoneNumber' onChange={handleChange} />
                      <ErrorMessage name='phoneNumber' component='div' className='error-message' />
                    </label>
                  </div>
                </div>
                <div className='right-button-container'>
                  <button type='submit'>Zamów</button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {deliveryType === 'odbior' && (
          <div className='right-button-container'>
            <button type='button' onClick={handleDeliverySubmit}>Zamów</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickUp;
