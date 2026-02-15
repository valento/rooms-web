import { useState } from 'react'

export default function UserWidget() {
  const [user, setUser] = useState<string | null>('user')
  const [id, setId] = useState<number | null>(1235)

  return (
    <div className="auth-bar">
      {id ? (
        <>
          <span>Hi, {user}</span>
          <a href="/account">Account</a>
          <a href={"/create/"+id}>Create</a>
          <a href="/play">Play</a>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setUser('Author')}>Signin</button>
          <button onClick={() => setUser('Author')}>Login</button>
          <button onClick={() => setUser('Author')}>Create</button>
        </>
      )}
    </div>
  )
}