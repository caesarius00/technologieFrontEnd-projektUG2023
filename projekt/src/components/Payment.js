import React, {useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { PickUpContext } from "../contexts/PickUpContext";

const Payment = () => {
    const { pickUp, setPickUp } = useContext(PickUpContext);
    const initialValues = {
        paymentMethod: "",
        cardNumber: "",
        cardDate: "",
        cardCVC: "",
        cardName: "",
    };

    const validationSchema = yup.object({
        paymentMethod: yup.string().required("Wybierz metodę płatności"),
        cardNumber: yup
            .string()
            .matches(/^[0-9]+$/, "Numer karty musi składać się z cyfr")
            .min(16, "Numer karty musi składać się z 16 cyfr")
            .max(16, "Numer karty musi składać się z 16 cyfr")
            .required("Wprowadź numer karty"),
        cardDate: yup
            .string()
            .matches(/^[0-9]+$/, "Data musi składać się z cyfr")
            .min(4, "Data musi składać się z 4 cyfr")
            .max(4, "Data musi składać się z 4 cyfr")
            .required("Wprowadź datę ważności karty"),
        cardCVC: yup
            .string()
            .matches(/^[0-9]+$/, "CVC musi składać się z cyfr")
            .min(3, "CVC musi składać się z 3 cyfr")
            .max(3, "CVC musi składać się z 3 cyfr")
            .required("Wprowadź CVC"),
        cardName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Imię i nazwisko musi składać się z liter")
            .required("Wprowadź imię i nazwisko"),
    });

    const handleSubmit = (values) => {
        console.log("submitting");
        console.log(pickUp);
        console.log(values);
        //add to context with previous values
        setPickUp({...pickUp, ...values});
        console.log(pickUp);
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
      <h1>Płatność</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, handleChange }) => (
          <Form>
            <div className='radio-group'>
              <label className='radio-label'>
                <Field
                  type='radio'
                  name='paymentMethod'
                  value='gotowka'
                  className='radio-input'
                  onChange={handleChange}
                />
                Płatność gotówką
              </label>
              <label className='radio-label'>
                <Field
                  type='radio'
                  name='paymentMethod'
                  value='karta'
                  className='radio-input'
                  onChange={handleChange}
                />
                Płatność kartą
              </label>
            </div>
            <br/>

            {values.paymentMethod === 'karta' && (
              <div className='spread'>
                <div className='form-row'>
                    <label className='form-label'>
                        Numer karty:
                        <Field type='text' name='cardNumber' onChange={handleChange} />
                        <ErrorMessage name='cardNumber' component='div' className='error-message' />
                    </label>
                </div>
                <div className='form-row'>
                    <label className='form-label'>
                        Data ważności:
                        <Field type='text' name='cardDate' onChange={handleChange} />
                        <ErrorMessage name='cardDate' component='div' className='error-message' />
                    </label>
                </div>

                <div className='form-row'>
                    <label className='form-label'>
                        CVC:
                        <Field type='text' name='cardCVC' onChange={handleChange} />
                        <ErrorMessage name='cardCVC' component='div' className='error-message' />
                    </label>
                </div>

                <div className='form-row'>
                    <label className='form-label'>
                        Imię i nazwisko:
                        <Field type='text' name='cardName' onChange={handleChange} />
                        <ErrorMessage name='cardName' component='div' className='error-message' />
                    </label>
                </div>
                
              </div>
            )}

            
            {/* <button type='submit' onClick={console.log.initialValues}>Zamów</button> */}
            
              {/* <Link class="right-button-container" to="/payment"> <button type='submit'> Zamów </button></Link> */}
              <div className="right-button-container">
                <button type='submit'> Zapłać </button>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
    );
};

export default Payment;
