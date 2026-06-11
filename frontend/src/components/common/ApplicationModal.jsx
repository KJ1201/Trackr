import { useState, useEffect } from "react";
import {
  createApplication,
  updateApplication,
} from "../../services/applicationService";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import useAPI from "@/hooks/useAPI";

function ApplicationModal({ isOpen, onClose, onSuccess, application }) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("applied");
  const [priority, setPriority] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { refetch: create } = useAPI(createApplication, false);
  const { refetch: update } = useAPI(updateApplication, false);

  useEffect(() => {
    if (application) {
      setRole(application.name || "");
      setCompany(application.company || "");
      setStatus(application.status || "applied");
      setPriority(application.priority || "");
      setAppliedDate(application.applied_date || "");
    } else {
      setRole("");
      setCompany("");
      setStatus("applied");
      setPriority("");
      setAppliedDate("");
    }
  }, [application]);

  const isEditing = !!application;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !company || !priority || !appliedDate) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await update(application.id, {
          name: role,
          company,
          status,
          priority,
          applied_date: format(appliedDate, "yyyy-MM-dd"),
        });
        toast.success("Application Updated");
        onSuccess();
      } else {
        await create({
          name: role,
          company,
          status,
          priority,
          applied_date: format(appliedDate, "yyyy-MM-dd"),
        });
        toast.success("Application Created");
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
          <DialogTitle>
            {isEditing ? "Edit Application" : "New Application"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
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
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input
                type="text"
                name="company"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="priority">Priority</FieldLabel>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="applied-date">Applied Date</FieldLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!appliedDate}
                    className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {appliedDate ? (
                      format(appliedDate, "PPP")
                    ) : (
                      <span>Pick Applied Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={appliedDate}
                    onSelect={(date) => {
                      setAppliedDate(date);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
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

export default ApplicationModal;
