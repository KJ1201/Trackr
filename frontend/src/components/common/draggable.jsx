import { useDraggable } from "@dnd-kit/react";
function Draggable({application, children}) {
    const { ref } = useDraggable({
      id: application.id,
    });

    return <div ref={ref}>{children}</div>;
}

export default Draggable;
