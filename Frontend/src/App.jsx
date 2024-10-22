// src/App.jsx
import React, { useState } from 'react';

const App = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userdata = {name,email}
        try {
            const res = await fetch('https://formdeploytest.onrender.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdata),
            });

            const data = await res.json();
            setResponse(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Simple Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" value={name} onChange={(e)=>{
                         setName(e.target.value)
                        }} required />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={email} onChange={(e)=>{
                         setEmail(e.target.value)
                        }} required />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default App;
