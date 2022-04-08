import { useState } from "react"
import { useRouter } from 'next/router';
import UserContext from "../utils/userContext";
import { useContext } from "react";



function loginPage(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const  { user, setUser }  = useContext(UserContext)
  const router = useRouter();



  async function postLogin({username, password}) {
    const request = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    })
    if (request.ok) {
        const data = await request.json();
        localStorage.setItem('token', data.token);
        console.log('blehhhhh ',data.user)
        setUser(JSON.stringify(data.user));
        router.push('/');
      } else {
        const message = await request.json();
        console.log(message)
      }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}> 
        <label>Notendanafn:</label><br/>
        <input
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <label>Lykilorð:</label><br/>
        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => postLogin({username, password})}>
      {'Innskrá'}
    </button>
    </form>
  )
}

export default loginPage