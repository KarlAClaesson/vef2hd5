import { useState } from "react"


function registrationPage(){
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  async function postRegister({name, username, password}) {
    console.log(name)
    const request = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password}),
    })
    if (request.ok) {
      const data = await request.json()
      console.log(`User ${data.username} successfully created`);
      setUser(data);
    } else {
        const message = await request.json();
        console.log(message)  
      }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <label>Nafn:</label><br/>
        <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        /><br/>
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
        <button onClick={() => postRegister({name, username, password})}>
      {'Skrá'}
    </button>
    </form>
)
}

export default registrationPage

