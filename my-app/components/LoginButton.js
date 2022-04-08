import UserContext from "../utils/userContext"
import { useContext } from "react"
import { useRouter } from "next/router";

function LoginButton() {
    const  { user, setUser }  = useContext(UserContext)
    const router = useRouter();
    console.log(user)

    return (
        <>
            {user ? (
                <button
                onClick={async () => {
                    setUser(null)
                    localStorage.setItem('token', '');
                }}>útskrá</button>
            ) : (
                <button
                onClick={async () => {
                    router.push('/login')
                }}>Innskrá</button>
            )
        }
        </>
    )
}

export default LoginButton