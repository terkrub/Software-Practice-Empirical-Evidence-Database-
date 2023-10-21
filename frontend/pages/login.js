import React,{ useState } from 'react';
import axios from 'axios'; // Import axios
import styles from './styles/loginStyles.module.css';
import Header from './component/Header';
import { useRouter } from 'next/router';

const Login = () => { // Use PascalCase for component names
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => { // Corrected function name
        event.preventDefault(); // Prevent form submission

        try {
            const res = await axios.post('https://software-practice-empirical-evidence-database.vercel.app/users/login', { email, password });
            if(res.data.stus == 'Success'){
                console.log(res.data.stus);
                localStorage.setItem('user', email);
                router.push('/');
            }
            else{
                alert(res.data.message)
            }
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <Header/>
        <div className={styles.formContainer}>
            <main className="form-signin">
                <form className={styles.forms} onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

                </form>
            </main>
        </div>
        </>
    )
}

export default Login;
