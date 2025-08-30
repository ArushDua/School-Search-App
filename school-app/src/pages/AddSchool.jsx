import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("image", data.image[0]);

    await axios.post(`${import.meta.env.VITE_API_URL}/addSchool`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("✅ School added successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-4"
    >
      <h1 className="text-3xl font-bold text-center text-blue-400">Add New School</h1>

      <input {...register("name", { required: true })} placeholder="School Name" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-500 outline-none" />
      {errors.name && <p className="text-red-400">Name is required</p>}

      <input {...register("address", { required: true })} placeholder="Address" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />
      <input {...register("city", { required: true })} placeholder="City" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />
      <input {...register("state", { required: true })} placeholder="State" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />
      <input {...register("contact", { required: true })} placeholder="Contact Number" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />
      <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />
      {errors.email_id && <p className="text-red-400">Invalid email</p>}

      <input type="file" {...register("image", { required: true })} className="w-full p-3 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-400" />

      <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg">
        ➕ Add School
      </button>
    </form>
  );
}

