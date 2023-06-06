import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PickUpContext } from "../contexts/PickUpContext";

const Payment = () => {
  const { pickUp, setPickUp, clearPickUp } = useContext(PickUpContext);
  const navigate = useNavigate();

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
      .test("cardNumber", "Numer karty musi składać się z cyfr", function (value) {
        const { paymentMethod } = this.parent;
        if (paymentMethod === "karta") {
          return yup.string().matches(/^[0-9]+$/, this.createError).min(16, this.createError).max(16, this.createError).required(this.createError).isValidSync(value);
        }
        return true;
      }),
    cardDate: yup
      .string()
      .test("cardDate", "Data musi składać się z cyfr", function (value) {
        const { paymentMethod } = this.parent;
        if (paymentMethod === "karta") {
          return yup.string().matches(/^[0-9]+$/, this.createError).min(4, this.createError).max(4, this.createError).required(this.createError).isValidSync(value);
        }
        return true;
      }),
    cardCVC: yup
      .string()
      .test("cardCVC", "CVC musi składać się z cyfr", function (value) {
        const { paymentMethod } = this.parent;
        if (paymentMethod === "karta") {
          return yup.string().matches(/^[0-9]+$/, this.createError).min(3, this.createError).max(3, this.createError).required(this.createError).isValidSync(value);
        }
        return true;
      }),
    cardName: yup
      .string()
      .test("cardName", "Imię i nazwisko musi składać się z liter", function (value) {
        const { paymentMethod } = this.parent;
        if (paymentMethod === "karta") {
          return yup.string().matches(/^[a-zA-Z]+$/, this.createError).required(this.createError).isValidSync(value);
        }
        return true;
      }),
  });
  
  
  
  

  const handleSubmit = (values) => {
    //if payment method is cash, empty card fields
    // if (values.paymentMethod === "gotówka") {
    //   values.cardNumber = "";
    //   values.cardDate = "";
    //   values.cardCVC = "";
    //   values.cardName = "";
    // }
    console.log("submitting");
    console.log(pickUp);
    console.log(values);
    //add to context with previous values
    setPickUp({ ...pickUp, ...values });
    //wait 3s
    setTimeout(() => {
    }, 3000);
    console.log(pickUp);
    //redirect to success page
    navigate("/success");

  };

  return (
    <div className="container">
      <div className="left-button-container">
        <Link to="/products">
          <button className="button-no" onClick={clearPickUp}>Wróć</button>
        </Link>
      </div>
      <div className="site-box">
        <h1>Płatność</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="radio-group">
                <label className="radio-label">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="gotowka"
                    className="radio-input"
                    onChange={handleChange}
                  />
                  Płatność gotówką
                </label>
                <label className="radio-label">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="karta"
                    className="radio-input"
                    onChange={handleChange}
                  />
                  Płatność kartą
                </label>
              </div>
              <br />

              {values.paymentMethod === "karta" && (
                <div className="spread">
                  <div className="form-row">
                    <label className="form-label">
                      Numer karty:
                      <Field
                        type="text"
                        name="cardNumber"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="cardNumber"
                        component="div"
                        className="error-message"
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="form-label">
                      Data ważności:
                      <Field
                        type="text"
                        name="cardDate"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="cardDate"
                        component="div"
                        className="error-message"
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label className="form-label">
                      CVC:
                      <Field
                        type="text"
                        name="cardCVC"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="cardCVC"
                        component="div"
                        className="error-message"
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label className="form-label">
                      Imię i nazwisko:
                      <Field
                        type="text"
                        name="cardName"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="cardName"
                        component="div"
                        className="error-message"
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="right-button-container">
                <button type="submit">Zapłać</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Payment;
