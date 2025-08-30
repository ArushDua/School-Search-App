import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/schools`).then((res) => setSchools(res.data));
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {schools.map((school) => (
        <div
          key={school.id}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transition"
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/schoolImages/${school.image}`}
            alt={school.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-blue-400">{school.name}</h2>
            <p className="text-gray-400">{school.address}, {school.city}</p>
            <p className="text-sm text-gray-500">{school.state} | 📞 {school.contact}</p>
            <p className="text-sm text-gray-500">✉ {school.email_id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

