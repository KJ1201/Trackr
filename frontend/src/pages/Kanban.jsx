import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import { getApplications, updateStatus } from "@/services/applicationService";
import KanbanColumn from "@/components/common/KanbanColumn";
import { toast } from "sonner";

function Kanban() {
  const [applications, setApplications] = useState({
    applied: [],
    pending: [],
    interview: [],
    offer: [],
    rejected: [],
    withdrawn: [],
  });

  const groupApplications = (applications) => {
    const group = {
      applied: [],
      pending: [],
      interview: [],
      offer: [],
      rejected: [],
      withdrawn: [],
    };

    applications.forEach((app) => {
      group[app.status].push(app);
    });
    return group;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApplications();
      setApplications(groupApplications(res.data));
    };
    fetchData();
  }, []);

  const findAppColumn = (applications, appId) => {
    let foundStatus = null;
    Object.entries(applications).forEach(([status, apps]) => {
      if (apps.find((app) => app.id === appId)) {
        foundStatus = status;
      }
    });
    return foundStatus;
  };

  return (
    <DragDropProvider
      onDragEnd={async (event) => {
        if (event.canceled) return;
        const appId = event.operation.source.id;
        const oldStatus = findAppColumn(applications, appId);
        const newStatus = event.operation.target.id;
        const previousApplications = applications;
        setApplications((prev) => {
          const draggedApp = prev[oldStatus].find((app) => app.id === appId);
          return {
            ...prev,
            [oldStatus]: prev[oldStatus].filter((app) => app.id !== appId),
            [newStatus]: [...prev[newStatus], draggedApp],
          };
        });
        try {
          await updateStatus(appId, newStatus);
          toast.success("Status Updated");
        } catch (err) {
          setApplications(previousApplications);
          const data = err.response?.data;
          if (data) {
            const messages = Object.values(data).flat().join(" ");
            toast.error(messages);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        }
      }}
    >
      <div className="flex flex-row gap-6 p-6">
        {Object.entries(applications).map(([key, value]) => (
          <KanbanColumn title={key} content={value} key={key} />
        ))}
      </div>
    </DragDropProvider>
  );
}

export default Kanban;
