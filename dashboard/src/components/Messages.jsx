import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, admin, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/", // matches backend route
          { withCredentials: true }
        );
        setMessages(data.messages || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch messages"
        );
      }
    };
    fetchMessages();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div className="card" key={msg._id}>
              <h4>{`${msg.firstName} ${msg.lastName}`}</h4>
              <div className="details">
                <p>Email: <span>{msg.email}</span></p>
                <p>Phone: <span>{msg.phone}</span></p>
                <p>Message: <span>{msg.message}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h2>No Messages Found!</h2>
        )}
      </div>
    </section>
  );
};

export default Messages;
