import useApplications from "../hooks/useApplications";
import ApplicationModal from "../components/common/ApplicationModal";
import { useState } from "react";
import { deleteApplication } from "../services/applicationService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Alert from "../components/common/Alert";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import useAPI from "@/hooks/useAPI";

function Applications() {
  const { applications, loading, error, refetch } = useApplications();
  const {refetch: deleteApp} = useAPI(deleteApplication, false)

  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const priorityStyles = {
    low: "bg-blue-500/20 text-blue-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400",
  };

  const statusStyles = {
    applied: "bg-blue-500/20 text-blue-400",
    pending: "bg-gray-500/20 text-gray-400",
    interview: "bg-yellow-500/20 text-yellow-400",
    offer: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    withdrawn: "bg-orange-500/20 text-orange-400",
  };

  const handleDelete = async (id) => {
      if (await deleteApp(id)) refetch();
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setIsOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      {applications.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No applications yet</EmptyTitle>
            <EmptyDescription>
              Start tracking your job search by adding your first application.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setIsOpen(true)} variant="outline">
              Create new Application
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Applications</CardTitle>
            <Button onClick={() => setIsOpen(true)}>
              Create new Application
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.company}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[application.status] || ""}`}
                      >
                        {application.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${priorityStyles[application.priority] || ""}`}
                      >
                        {application.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(application.applied_date, "PPP")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button onClick={() => handleEdit(application)}>
                        Edit
                      </Button>

                      <Alert
                        type="destructive"
                        title="Delete Application"
                        description="Are you sure? This action cannot be undone."
                        option="Delete"
                        onConfirm={() => handleDelete(application.id)}
                        trigger={<Button variant="destructive">Delete</Button>}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
