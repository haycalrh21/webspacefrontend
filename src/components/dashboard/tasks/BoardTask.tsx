"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";

import { Task } from "@/types/types";
import { Card } from "@/components/ui/card";
import DroppableColumn from "./DroppableColumn";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [highlightedColumnId, setHighlightedColumnId] = useState<string | null>(
    null
  );
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      const formattedTasks: Task[] = data.map((task: any) => ({
        id: task.id.toString(),
        content: task.title,
        columnId: task.status as "finished" | "not_finished",
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const getTasksByColumnId = (
    columnId: "finished" | "not_finished"
  ): Task[] => {
    return tasks.filter((task) => task.columnId === columnId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      setHighlightedColumnId(event.over.id as string);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setHighlightedColumnId(null);

    if (!over) return; // No drop target

    const activeId = active.id as string;
    const activeTask = tasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    const targetColumnId = over.id as "finished" | "not_finished";

    // Check if the column is highlighted before proceeding
    if (highlightedColumnId !== targetColumnId) {
      console.log("Drag canceled: target column not highlighted");
      return; // Prevent the drop if not highlighted
    }

    // Proceed with the task move
    let targetIndex;
    if (over.id !== "finished" && over.id !== "not_finished") {
      targetIndex = tasks.findIndex((task) => task.id === over.id);
    } else {
      const columnTasks = getTasksByColumnId(targetColumnId);
      targetIndex =
        tasks.findIndex((task) => task.columnId === targetColumnId) +
        columnTasks.length;
    }

    const updatedTask: Task = { ...activeTask, columnId: targetColumnId };
    const tasksWithoutActive = tasks.filter((task) => task.id !== activeId);
    const updatedTasks = [
      ...tasksWithoutActive.slice(0, targetIndex),
      updatedTask,
      ...tasksWithoutActive.slice(targetIndex),
    ];

    setTasks(updatedTasks);

    try {
      const response = await fetch(`${API_URL}/tasks/${activeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: targetColumnId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTaskFromServer = await response.json();
      console.log("Task updated successfully:", updatedTaskFromServer);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setHighlightedColumnId(null);
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Board</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-4">
          <DroppableColumn
            id="not_finished"
            title="Not Finished"
            tasks={getTasksByColumnId("not_finished")}
            isHighlighted={highlightedColumnId === "not_finished"}
          />
          <DroppableColumn
            id="finished"
            title="Finished"
            tasks={getTasksByColumnId("finished")}
            isHighlighted={highlightedColumnId === "finished"}
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
