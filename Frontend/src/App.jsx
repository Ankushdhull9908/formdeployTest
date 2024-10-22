// src/App.jsx
import React, { useState } from 'react';

const App = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default App;
