import useAPI from "@/hooks/useAPI";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import useDocuments from "@/hooks/useDocuments";
import { deleteDocument } from "@/services/documentService";
import DocumentModal from "@/components/common/DocumentModal";


function Documents() {
    const {documents, loading, error, refetch} = useDocuments()
    const { refetch: deleteDocs } = useAPI(deleteDocument, false);

    const [isOpen, setIsOpen] = useState(false);

      const handleDelete = async (id) => {
        if (await deleteDocs(id)) refetch();
      };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      {documents.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No documents added yet</EmptyTitle>
            <EmptyDescription>
              Start adding documents for your job applications
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setIsOpen(true)} variant="outline">
              Upload Document
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All documents</CardTitle>
            <Button onClick={() => setIsOpen(true)}>Upload Document</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Document</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.name}</TableCell>
                    <TableCell>
                      <a href={document.document} target="_blank"><span
                          className={`px-2 py-1 rounded-2xl text-xs font-medium bg-blue-500/20 text-blue-400`}
                        >View</span></a>
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Alert
                        type="destructive"
                        title="Delete contact"
                        description="Are you sure? This action cannot be undone."
                        option="Delete"
                        onConfirm={() => handleDelete(document.id)}
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

      <DocumentModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSuccess={() => {
          setIsOpen(false);
          refetch();
        }}
      />
    </div>
  );
}

export default Documents;
