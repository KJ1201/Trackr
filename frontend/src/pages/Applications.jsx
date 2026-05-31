import useApplications from "../hooks/useApplications";
import ApplicationModal from "../components/common/ApplicationModal";
import { useState } from "react";
import { deleteApplication } from "../services/applicationService";

function Applications() {
  const { applications, loading, error, refetch } = useApplications();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(id);
        refetch();
      } catch (err) {
        alert("Failed to delete application.");
      }
    }
  };
  
  const handleEdit = (application) => {
    setSelectedApplication(application);
    setIsOpen(true);
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create new Application</button>
      {applications.length === 0 ? (
        <p>No Application Yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Role</th>&nbsp;&nbsp;
              <th>Company</th>&nbsp;
              <th>Status</th>&nbsp;
              <th>Priority</th>&nbsp;
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.name}</td>&nbsp;
                <td>{application.company}</td>&nbsp;
                <td>{application.status}</td>&nbsp;
                <td>{application.priority}</td>&nbsp;
                <td>{application.applied_date}</td>
                <td>
                  <button onClick={() => handleDelete(application.id)}>
                    Delete
                  </button>
                  &nbsp;
                  <button onClick={() => handleEdit(application)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ApplicationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedApplication(null);
        }}
        onSuccess={() => {
          setIsOpen(false);
          setSelectedApplication(null);
          refetch();
        }}
        application={selectedApplication}
      />
    </div>
  );
}

export default Applications;
