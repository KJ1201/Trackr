import useApplications from "../hooks/useApplications";
import ApplicationModal from "../components/common/ApplicationModal";
import { useState } from "react";

function Applications() {
  const { applications, loading, error, refetch } = useApplications();

  const [isOpen, setIsOpen] = useState(false)

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
              <th>Role</th>
              <th>Company</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.name}</td>
                <td>{application.company}</td>
                <td>{application.status}</td>
                <td>{application.priority}</td>
                <td>{application.applied_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ApplicationModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSuccess={() => {setIsOpen(false); refetch();}}></ApplicationModal>
    </div>
  );
}

export default Applications;
