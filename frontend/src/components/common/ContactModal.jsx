import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import useAPI from "@/hooks/useAPI";
import { createContact, updateContact } from "@/services/contactService";
import useApplications from "@/hooks/useApplications";

function ContactModal({ isOpen, onClose, onSuccess, contact }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [application, setApplication] = useState("");
  const [note, setNote] = useState("");
  
  const [loading, setLoading] = useState(false);

  const { refetch: create } = useAPI(createContact, false);
  const { refetch: update } = useAPI(updateContact, false);

  const { applications} = useApplications();

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setRole(contact.role || "");
      setEmail(contact.email || "");
      setLinkedIn(contact.linkedin_url || "");
      setApplication(String(contact.application) || "");
      setNote(contact.note || "");
    }
  }, [contact]);

  const isEditing = !!contact;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role || !email || !application) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        const success = await update(contact.id, {
          name,
          role,
          email,
          application: parseInt(application),
          linkedin_url: linkedIn,
          note,
        });
        if (success) {
            toast.success("Contact Updated");
            onSuccess();
        }
        
      } else {
        const success = await create({
          name,
          role,
          email,
          application: parseInt(application),
          linkedin_url: linkedIn,
          note,
        });
        if (success) {
            toast.success("Contact Created");
            onSuccess();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Contact" : "New Contact"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Input
                type="text"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="linkedIn">Linked In</FieldLabel>
              <Input
                type="link"
                name="linkedIn"
                id="linkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="note">Note</FieldLabel>
              <Input
                type="text"
                name="note"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="application">Applications</FieldLabel>
              <Select value={application} onValueChange={setApplication}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {applications.map((app) => (
                      <SelectItem key={app.id} value={String(app.id)}>
                        {app.name} at {app.company}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {isEditing ? "Update" : "Create"}
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;
