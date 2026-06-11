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
import { createDocument } from "@/services/documentService";

function DocumentModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");

  const [loading, setLoading] = useState(false);

  const { refetch: create } = useAPI(createDocument, false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !document) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("document", document);
      const success = await create(formData);
      if (success) {
        toast.success("Uploaded Successfully");
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
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
              <FieldLabel htmlFor="document">Document</FieldLabel>
              <Input
                type="file"
                name="document"
                id="document"
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </Field>

            <Field>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  Upload
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DocumentModal;
