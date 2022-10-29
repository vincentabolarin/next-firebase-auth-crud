import Head from "next/head";
import styles from "../styles/Home.module.css";
import { app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            router.push('/home');
            sessionStorage.setItem('Token', response.user.accessToken)
            console.log(response.user);
        })
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
            sessionStorage.setItem("Token", response.user.accessToken);
            console.log(response.user);
            router.push("/home");
          })
    }

    const signUpWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then((response) => {
            sessionStorage.setItem("Token", response.user.accessToken);
            console.log(response.user);
            router.push("/home");
        })
    }

    // useEffect(() => {
    //     let token = sessionStorage.getItem('Token');
    //     if (token) {
    //         router.push('/home')
    //     }
    // }, []);
    
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Firebase CRUD Auth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Register</h1>
        
        <input placeholder="Email" className={styles.inputBox} onChange={(event) => setEmail(event.target.value)} value={email} type='email' />
        
        <input placeholder="Password" className={styles.inputBox} onChange={(event) => setPassword(event.target.value)} value={password} type='password' />
        
        <button onClick={signUp} className={styles.button}>Sign Up</button>
        
        <button onClick={signUpWithGoogle} className={styles.button}>Sign Up with Google</button>
        
        <button onClick={signUpWithGithub} className={styles.button}>Sign Up with GitHub</button>
      </main>
    </div>
  );
}