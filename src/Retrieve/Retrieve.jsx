import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Retrieve.module.css';
import { UserContext } from '../App';

const Retrieve = () => {
    const ctx = useContext(UserContext);
    const inputRef = useRef(null);
    const [inputVal, setInputVal] = useState('');
    const [filtered, setFiltered] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = inputRef.current.value.trim();
        if (input.length === 12) {
            setInputVal(input);
        } else {
            setFiltered([]);
        }
    };

    useEffect(() => {
        if (inputVal !== '' && localStorage.getItem("userDetails") !== null) {
            const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
            const filter = userDetails.filter((ele) => ele.aadhar === inputVal);
            setFiltered(filter);
        } else {
            setFiltered([]);
        }
    }, [inputVal]);

    // Focus input when component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={styles.ret_con}>
            <h2>Retrieve Information</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    minLength={12}
                    maxLength={12}
                    type="text"
                    placeholder="Enter Aadhar number"
                />
                <button type="submit">Find</button>
            </form>

            {filtered.length === 0 ? (
                <h3 className={styles.noData}>No Data Present..</h3>
            ) : (
                <div>
                    {filtered.map((ele, index) => (
                        <div className={styles.filtered_data} key={index}>
                            <div>
                                <h3>Name :</h3>
                                <span>{ele.name}</span>
                            </div>
                            <div>
                                <h3>DOB :</h3>
                                <span>{ele.dob}</span>
                            </div>
                            <div>
                                <h3>Age :</h3>
                                <span>{ele.age}</span>
                            </div>
                            <div>
                                <h3>Aadhar No :</h3>
                                <span>{ele.aadhar}</span>
                            </div>
                            <div>
                                <h3>Mobile num :</h3>
                                <span>{ele.mob}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Retrieve;
