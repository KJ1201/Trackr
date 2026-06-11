import useAPI from "@/hooks/useAPI";
import useContacts from "@/hooks/useContacts";
import { deleteContact } from "@/services/contactService";
import ContactModal from "@/components/common/ContactModal";
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

function Contacts() {
  const { contacts, loading, error, refetch } = useContacts();
  const { refetch: delCont } = useAPI(deleteContact, false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = async (id) => {
    if (await delCont(id)) refetch();
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsOpen(true);
  };

  const getLinkedInUsername = (url) => {
    const username = url.split("https://www.linkedin.com/in/")[1];
    return username;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      {contacts.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No contacts added yet</EmptyTitle>
            <EmptyDescription>
              Start adding contacts for your job applications
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setIsOpen(true)} variant="outline">
              Create new Contact
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Contacts</CardTitle>
            <Button onClick={() => setIsOpen(true)}>Create new Contact</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>LinkedIn</TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.role}</TableCell>
                    <TableCell>
                      <a href={`mailto:${contact.email}`}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400`}
                        >
                          {contact.email}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href={contact.linkedin_url} target="_blank">
                        {getLinkedInUsername(contact.linkedin_url)}
                      </a>
                    </TableCell>
                    <TableCell>{contact.application_name}</TableCell>
                    <TableCell>{contact.note}</TableCell>

                    <TableCell className="flex gap-2">
                      <Button onClick={() => handleEdit(contact)}>Edit</Button>

                      <Alert
                        type="destructive"
                        title="Delete contact"
                        description="Are you sure? This action cannot be undone."
                        option="Delete"
                        onConfirm={() => handleDelete(contact.id)}
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

      <ContactModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedContact(null);
        }}
        onSuccess={() => {
          setIsOpen(false);
          setSelectedContact(null);
          refetch();
        }}
        contact={selectedContact}
      />
    </div>
  );
}

export default Contacts;
