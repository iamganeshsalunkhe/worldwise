import PageNav from "../components/PageNav";
import style from "./Login.module.css";
import { useState } from "react";

function Login() {
    const [email,setEmail] = useState("ganeshsalunkhe1998@gmail.com")
    const [password, setPassword] = useState("1234567890");

    return (
        <main className={style.login}>
            <PageNav/>

            <form className={style.form}>
                <div className={style.row}>
                    <label htmlFor="email" >Email Address</label>
                    <input type="email" id="email"
                    onChange={e => setEmail(e.target.value)}

                    value={email}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id= "password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
        )
    }
export default Login
