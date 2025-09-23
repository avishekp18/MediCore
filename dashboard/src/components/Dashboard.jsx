import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const { isAuthenticated, admin, loading } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!admin) return;

      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/",
          { withCredentials: true }
        );
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to fetch appointments");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [admin]);

  // Update appointment status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <div>Loading user info...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!admin) return <div>Access denied. Admins only.</div>;

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{`${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>Welcome to the dashboard! Manage doctors, appointments, and messages here.</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>10</h3> {/* Replace with real doctor count if available */}
        </div>
      </div>

      <div className="appointments-section">
        <h5>Appointments</h5>
        {loadingAppointments ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      className={`status-select ${appointment.status.toLowerCase()}`}
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {appointment.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
