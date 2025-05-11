import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(login(email, password)){
            navigate("/admin/add-product");
        }
        else{
            alert("Invalid credentials");
        }   
    };

    return (
        <div
        className="flex flex-col items-center justify-center h-screen bg-gray-100 pb-20"
        style={{ overflow: "hidden", width: "100%", height: "90vh" }}
         >
            <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;


