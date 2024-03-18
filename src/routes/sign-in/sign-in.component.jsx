import { signInWithGooglePopup, createDocFromAuth, } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user }  = await signInWithGooglePopup();
        const userDocRef = createDocFromAuth(user)
    }

    return (
        <div>
            <h1>
                THIS IS THE SIGN IN PAGE
            </h1>
            <button onClick={logGoogleUser}>
                Sign in With Google
            </button>
        </div>
    )
}

export default SignIn;