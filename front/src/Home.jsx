import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [array, setArray] = useState([]);
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/notes');
      setArray(response.data);
  }
  useEffect(() => {
      fetchData();
  }, []);
  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <ul className="rounded-2xl shadow-lg p-5 bg-white space-y-3">
        {
          array.map((note,index) => (
            <li key={index} className="p-3 border-b">
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}