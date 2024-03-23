import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createDocFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    const clearFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })

        console.log(formFields)

    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match")
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createDocFromAuth(user, {displayName})
            clearFormFields();
        }catch(err){
            if(err.code === "auth/email-already-in-use"){
                alert("Error! Email already in use")
            } else {
                console.log('user creation encountered an error',err);    
            }
            
        }
    }
    
    return(
        <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={onSubmitHandler}>
        <FormInput label="Display Name" type="text" name="displayName" value={displayName} onChange={onChangeHandler} required/>

        <FormInput label="Email" type="email" name="email" value={email} onChange={onChangeHandler} required/>

        <FormInput label="Password" type="password" name="password" value={password} onChange={onChangeHandler} required/>

        <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={onChangeHandler} required/>

        <Button type="submit">Sign Up</Button>
        </form>
        </div>
    )
}

export default SignUpForm;