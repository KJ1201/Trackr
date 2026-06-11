import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Draggable from "./draggable";
import Droppable from "./droppable";

function KanbanColumn({ title, content }) {
  const statusStyles = {
    applied: "bg-blue-500/20 text-blue-400",
    pending: "bg-gray-500/20 text-gray-400",
    interview: "bg-yellow-500/20 text-yellow-400",
    offer: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    withdrawn: "bg-orange-500/20 text-orange-400",
  };
  
  return (
    <div className="min-w-xs flex flex-col gap-3">
      <Droppable id={title}>
        <Card style={{ backgroundColor: "#1e1e1e" }}>
          <CardHeader>
            <CardTitle className="capitalize flex items-center justify-between">
              {title}
              <span className="text-sm font-normal text-muted-foreground">
                {content.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {content.map((app) => (
              <Draggable application={app} key={app.id}>
                <Card style={{ backgroundColor: "#2a2a2a" }}>
                  <CardContent className="p-4 flex flex-col gap-1">
                    <p className="font-semibold text-sm leading-tight">
                      {app.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {app.company}
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {app.applied_date}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          app.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : app.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {app.priority}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Draggable>
            ))}
          </CardContent>
        </Card>
      </Droppable>
    </div>
  );
}

export default KanbanColumn;
