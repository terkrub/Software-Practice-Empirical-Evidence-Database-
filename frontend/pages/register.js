import { useState } from 'react';
import axios from 'axios';
import styles from './styles/loginStyles.module.css';
import Header from './component/Header';
import { useRouter } from 'next/router';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added for confirming password
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simple password confirmation check
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post('https://software-practice-empirical-evidence-database.vercel.app/register', { email, password });
            if (res.data.stus == 'Success') {
                console.log(res.data.stus);
                localStorage.setItem('user', email);
                router.push('/');
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.formContainer}>
                <main className="form-signin">
                    <form className={styles.forms} onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="floatingEmail">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Register;
