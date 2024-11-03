// types.ts
export type Task = {
  id: string;
  content: string;
  columnId: "finished" | "not_finished"; // Tambahkan columnId
};

export type Discussion = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
};
export type CommentsData = {
  id: number;
  userId: number;
  comment: string;
  postId: number;

  createdAt: Date;
};
