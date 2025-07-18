import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [content, setContent] = useState([])

  useEffect(() => {
    axios.get('/api/data').then((res) => setContent(res.data)).catch((error) => console.log(error)
    )
  }, [])

  return <div className="container">
    <h1>Hello world</h1>
    {content.map((c, i) => <span key={i}>{c}</span>)}
  </div>
}