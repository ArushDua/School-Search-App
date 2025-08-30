import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-400">🏫 School App</h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-gray-300"}`
            }
          >
            ➕ Add School
          </NavLink>
          <NavLink
            to="/schools"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${isActive ? "text-blue-400" : "text-gray-300"}`
            }
          >
            📖 Show Schools
          </NavLink>
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<AddSchool />} />
          <Route path="/schools" element={<ShowSchools />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
