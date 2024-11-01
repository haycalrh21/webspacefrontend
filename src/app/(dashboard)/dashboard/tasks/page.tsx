"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  content: string;
  status: "finished" | "not_finished";
}

interface SortableTaskProps {
  task: Task;
}

const DroppableColumn: React.FC<{
  id: string;
  title: string;
  tasks: Task[];
}> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-1">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="font-semibold text-lg mb-2 text-center">{title}</h2>
        <div ref={setNodeRef} className="min-h-[200px]">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

const SortableTask: React.FC<SortableTaskProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 cursor-move bg-white shadow-sm hover:shadow-lg transition-shadow rounded"
    >
      {task.content}
    </Card>
  );
};

// Initialize tasks
const initialTasks: Task[] = [
  { id: "1", content: "Task 1", status: "not_finished" },
  { id: "2", content: "Task 2", status: "not_finished" },
  { id: "3", content: "Task 3", status: "not_finished" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("kanban-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const getTasksByStatus = (status: "finished" | "not_finished"): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;

    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    const newStatus: "finished" | "not_finished" =
      over.id === "finished" ? "finished" : "not_finished";

    const updatedTasks = tasks.filter((task) => task.id !== activeId);
    const overIndex = updatedTasks.findIndex((task) => task.id === over.id);

    const updatedTask: Task = { ...activeTask, status: newStatus };

    updatedTasks.splice(overIndex, 0, updatedTask);

    setTasks(updatedTasks);
    localStorage.setItem("kanban-tasks", JSON.stringify(updatedTasks));
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Board</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <DroppableColumn
            id="not_finished"
            title="Not Finished"
            tasks={getTasksByStatus("not_finished")}
          />
          <DroppableColumn
            id="finished"
            title="Finished"
            tasks={getTasksByStatus("finished")}
          />
        </div>

        <DragOverlay>
          {activeId ? (
            <Card className="p-4 mb-2 cursor-move bg-white shadow-lg rounded">
              {tasks.find((task) => task.id === activeId)?.content}
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
