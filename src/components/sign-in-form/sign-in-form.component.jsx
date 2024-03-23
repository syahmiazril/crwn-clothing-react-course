import { useState } from "react";

import {
    signInWithGooglePopup,
    createDocFromAuth,
    signInAuthUserWithEmailAndPassword,
  } from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',

}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password,} = formFields;

    const clearFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createDocFromAuth(user);
      };

    const onChangeHandler = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })

        console.log(formFields)

    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    
        try {
          const response = await signInAuthUserWithEmailAndPassword(
            email,
            password
          );
          console.log(response);
          clearFormFields();
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
        }
      };
    
    return(
        <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={onSubmitHandler}>
    
        <FormInput label="Email" type="email" name="email" value={email} onChange={onChangeHandler} required/>

        <FormInput label="Password" type="password" name="password" value={password} onChange={onChangeHandler} required/>

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
        </form>
        </div>
    )
}

export default SignInForm;