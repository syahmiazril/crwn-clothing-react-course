import { signInWithGooglePopup, createDocFromAuth, } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user }  = await signInWithGooglePopup();
        const userDocRef = await createDocFromAuth(user)
    }

    return (
        <div>
            <h1>
                THIS IS THE SIGN IN PAGE
            </h1>
            <button onClick={logGoogleUser}>
                Sign in With Google
            </button>

            <SignUpForm />
        </div>
    )
}

export default SignIn;