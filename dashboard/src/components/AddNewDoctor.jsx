import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
    docAvatar: null,
  });

  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology",
    "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT"
  ];

  // Handle text/select inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle avatar upload and preview
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, docAvatar: file });

    const reader = new FileReader();
    reader.onload = () => setDocAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);
      navigate("/");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
        doctorDepartment: "",
        docAvatar: null,
      });
      setDocAvatarPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleSubmit}>
          <div className="first-wrapper">
            <div>
              <img src={docAvatarPreview || "/docHolder.jpg"} alt="Doctor Avatar" />
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatar} />
            </div>
            <div>
              <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} />
              <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
              <input name="email" type="text" placeholder="Email" value={form.email} onChange={handleChange} />
              <input name="phone" type="number" placeholder="Mobile Number" value={form.phone} onChange={handleChange} />
              <input name="nic" type="number" placeholder="NIC" value={form.nic} onChange={handleChange} />
              <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} />
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <select name="doctorDepartment" value={form.doctorDepartment} onChange={handleChange}>
                <option value="">Select Department</option>
                {departmentsArray.map((dept, i) => (
                  <option key={i} value={dept}>{dept}</option>
                ))}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
