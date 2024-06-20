import React, { useState } from 'react';

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }

  if (values.isAttendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required';
  }

  return errors;
};

const EventRegistrationForm = () => {
  const initialState = {
    name: '',
    email: '',
    age: '',
    isAttendingWithGuest: 'no',
    guestName: '',
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormValidation(initialState, validate);

  return (
    <div>
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div>
          <label>Are you attending with a guest?</label>
          <select
            name="isAttendingWithGuest"
            value={values.isAttendingWithGuest}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {values.isAttendingWithGuest === 'yes' && (
          <div>
            <label>Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
            />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      {isSubmitting && Object.keys(errors).length === 0 && (
        <div>
          <h2>Form Submitted Successfully</h2>
          <p>Name: {values.name}</p>
          <p>Email: {values.email}</p>
          <p>Age: {values.age}</p>
          <p>Attending with guest: {values.isAttendingWithGuest === 'yes' ? 'Yes' : 'No'}</p>
          {values.isAttendingWithGuest === 'yes' && <p>Guest Name: {values.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
