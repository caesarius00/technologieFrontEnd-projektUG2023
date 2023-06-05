import React, {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link } from 'react-router-dom';
import { PickUpContext } from '../contexts/PickUpContext';

const PickUp = () => {
  const { setPickUp } = useContext(PickUpContext);

  const initialValues = {
    deliveryType: '',
    tableNumber: '',
    address: '',
    postalCode: '',
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    phoneNumber: '',
  };

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Dodaj tutaj kod obsługujący przesłanie formularza
    setPickUp((prevValues) => ({ ...prevValues, ...values }));
    window.location.href = '/payment';

  };

  const validate = (values) => {
    const errors = {};

    if (values.deliveryType === '') {
      errors.deliveryType = 'Wybierz typ dostawy';
    }

    if (values.deliveryType === 'stolik' && values.tableNumber === '') {
      errors.tableNumber = 'Podaj numer stolika';
    }

    if (values.deliveryType === 'dostawa') {
      if (values.postalCode === '') {
        errors.postalCode = 'Podaj kod pocztowy';
      }
      if (values.city === '') {
        errors.city = 'Podaj miasto';
      }
      if (values.street === '') {
        errors.street = 'Podaj ulicę';
      }
      if (values.houseNumber === '') {
        errors.houseNumber = 'Podaj numer domu';
      }
      if (values.phoneNumber === '') {
        errors.phoneNumber = 'Podaj numer telefonu';
      }
    }

    return errors;
  };

  return (
    <div className='container'>
      <div className="left-button-container">
        <Link to='/products'>
        <button className='button-no'>
          Wróć
        </button>
        </Link>
      </div>
      <div className='site-box'>
        <h1>Formularz zamówienia</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {({ values, handleChange }) => (
            <Form>
              <div className='radio-group'>
                <label className='radio-label'>
                  <Field
                    type='radio'
                    name='deliveryType'
                    value='dostawa'
                    className='radio-input'
                    onChange={handleChange}
                  />
                  Dostawa
                </label>
                <label className='radio-label'>
                  <Field
                    type='radio'
                    name='deliveryType'
                    value='stolik'
                    className='radio-input'
                    onChange={handleChange}
                  />
                  Do stolika
                </label>
                <label className='radio-label'>
                  <Field
                    type='radio'
                    name='deliveryType'
                    value='odbior'
                    className='radio-input'
                    onChange={handleChange}
                  />
                  Odbiór osobisty
                </label>
              </div>
              <br/>

              {values.deliveryType === 'stolik' && (
                <div className='spread'>
                  <div className='form-row'>
                    <label className='form-label'>
                      Numer stolika:
                      <Field type='number' name='tableNumber' onChange={handleChange} />
                      <ErrorMessage name='tableNumber' component='div' className='error-message' />
                    </label>
                  </div>
                </div>
              )}

              {values.deliveryType === 'dostawa' && (
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
              )}

              {/* <button type='submit' onClick={console.log.initialValues}>Zamów</button> */}
              
                {/* <Link class="right-button-container" to="/payment"> <button type='submit'> Zamów </button></Link> */}
                <div className="right-button-container">
                  <button type='submit'> Zamów </button>
                </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PickUp;
