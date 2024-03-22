import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createDocFromAuth } from "../../utils/firebase/firebase.utils";
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
        <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={onSubmitHandler}>
        <label>Display Name</label>
        <input type="text" name="displayName" value={displayName} onChange={onChangeHandler} required/>

        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChangeHandler} required/>

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChangeHandler} required/>

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChangeHandler} required/>

        <button type="submit">Sign Up</button>
        </form>
        </div>
    )
}

export default SignUpForm;