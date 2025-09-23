import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);

    if (loading) return <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">Loading...</div>;
    if (!isAuthenticated) return <div className="flex items-center justify-center h-screen text-lg text-red-600">Please log in</div>;

    // Fetch appointments when user is ready
    useEffect(() => {
        if (!user) return;

        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:4000/api/v1/appointment/user/${user._id}`,
                    { withCredentials: true }
                );
                setAppointments(data.appointments || []);
            } catch (err) {
                toast.error("Failed to fetch appointments");
            } finally {
                setLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, [user]);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-xl p-6 mb-8 mt-12">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button onClick={handleLogout} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition">Logout</button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
                {loadingAppointments ? (
                    <p className="text-gray-500">Loading appointments...</p>
                ) : appointments.length === 0 ? (
                    <p className="text-gray-500">No appointments found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border border-gray-200 px-4 py-2">Date</th>
                                    <th className="border border-gray-200 px-4 py-2">Department</th>
                                    <th className="border border-gray-200 px-4 py-2">Doctor</th>
                                    <th className="border border-gray-200 px-4 py-2">Status</th>
                                    <th className="border border-gray-200 px-4 py-2">Visited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt._id} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-4 py-2">{new Date(appt.appointment_date).toLocaleDateString()}</td>
                                        <td className="border border-gray-200 px-4 py-2">{appt.department}</td>
                                        <td className="border border-gray-200 px-4 py-2">{appt.doctor.firstName} {appt.doctor.lastName}</td>
                                        <td className="border border-gray-200 px-4 py-2">{appt.status}</td>
                                        <td className="border border-gray-200 px-4 py-2">{appt.hasVisited ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
