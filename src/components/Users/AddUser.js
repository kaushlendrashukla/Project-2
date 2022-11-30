import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";


const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();



    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'please enter the valid data'
            })
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Invalid input',
                message: 'please enter the valid age'
            })
            return;
        }

        // console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
    };
    const usernameChangeHandler = event => {
        setEnteredUsername(event.target.value);
    };
    const ageChangeHandler = event => {
        setEnteredAge(event.target.value);
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
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} />
                    <Button type="submit">Add User </Button>
                </form>
            </Card>
        </Wrapper>
    )
};
export default AddUser;