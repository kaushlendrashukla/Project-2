import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";


const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const collegeInputRef = useRef();

    const [error, setError] = useState();



    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        const enteredCollege = collegeInputRef.current.value;

        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || enteredCollege.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'please enter the valid data'
            })
            return;
        }

        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid input',
                message: 'please enter the valid age'
            })
            return;
        }

        // console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredName, enteredUserAge, enteredCollege);
        nameInputRef.current.value ='';
        ageInputRef.current.value ='';
        collegeInputRef.current.value ='';
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={nameInputRef} />                       
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" ref={ageInputRef} />
                    <label htmlFor="collegname">Collegename</label>
                    <input id="collegename" type="text" ref = {collegeInputRef}/>
                    <Button type="submit">Add User </Button>
                </form>
            </Card>
        </Wrapper>
    )
};
export default AddUser;