import React, { useContext, useRef, useState } from 'react';
import styles from './InputSection.module.css';
import { UserContext } from '../App';

const InputSection = (props) => {
  const ctx = useContext(UserContext);

  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const aadharRef = useRef(null);
  const mobRef = useRef(null);

  const [age, setAge] = useState(0);

  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() + 1;

  const handleDate = () => {
    const dob = new Date(dateRef.current.value);
    const dobYear = dob.getFullYear();
    const dobMonth = dob.getMonth() + 1;

    const calculatedAge = thisMonth < dobMonth
      ? thisYear - dobYear - 1
      : thisYear - dobYear;

    setAge(calculatedAge);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const dobRaw = dateRef.current.value;
    const aadhar = aadharRef.current.value;
    const mob = mobRef.current.value;

    const revDob = dobRaw.split("-").reverse().join("-");

    // Update context state
    const newEntry = {
      name,
      dob: revDob,
      aadhar,
      mob,
      age
    };

    ctx.setData([...ctx.data, newEntry]);

    // Update localStorage
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (!Array.isArray(userDetails)) {
      userDetails = [];
    }

    userDetails.push(newEntry);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Hide form
    props.setShowInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_con}>
      <h3>Fill the below form for New Entry</h3>
      <div className={styles.inputs}>
        <input ref={nameRef} type="text" placeholder="Name" required />
        <input ref={dateRef} onChange={handleDate} type="date" required />
        <input ref={aadharRef} type="number" minLength="12" placeholder="Aadhar Number" required />
        <input ref={mobRef} type="number" minLength="10" placeholder="Mobile Number" required />
        <input type="number" value={age} disabled placeholder="Age" />
        <button className={styles.save}>Save</button>
      </div>
    </form>
  );
};

export default InputSection;
