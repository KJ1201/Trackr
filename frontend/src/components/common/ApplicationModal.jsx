import { useState, useEffect } from "react";
import {
  createApplication,
  updateApplication,
} from "../../services/applicationService";

function ApplicationModal({ isOpen, onClose, onSuccess, application }) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (application) {
      setRole(application.name || "");
      setCompany(application.company || "");
      setStatus(application.status || "");
      setPriority(application.priority || "");
      setAppliedDate(application.applied_date || "");
    } else {
      setRole("");
      setCompany("");
      setStatus("");
      setPriority("");
      setAppliedDate("");
    }
  }, [application]);

  const isEditing = !!application;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updateApplication(application.id, {
          name: role,
          company,
          status,
          priority,
          applied_date: appliedDate,
        });
      } else {
        await createApplication({
          name: role,
          company,
          status,
          priority,
          applied_date: appliedDate,
        });
      }
      onSuccess();
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(" ");
        setError(messages);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <br />
      <h2>{isEditing ? "Edit Application" : "New Application"}</h2>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="role">Role</label>
        <input
          className="border text-black"
          type="text"
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <label htmlFor="company">Company</label>
        <input
          className="border text-black"
          type="text"
          name="company"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <br />
        {/* <label htmlFor="status">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="applied">Applied</option>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
        <br /> */}
        <label htmlFor="priority">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br />
        <label htmlFor="applied-date">Applied Date</label>
        <input
          className="border text-black"
          type="date"
          name="applied-date"
          id="applied-date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
        />
        <br />

        <button type="submit" disabled={loading}>
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default ApplicationModal;
