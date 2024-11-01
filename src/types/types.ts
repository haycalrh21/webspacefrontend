// types.ts
export type Task = {
  id: string;
  content: string;
  columnId: "finished" | "not_finished"; // Tambahkan columnId
};
