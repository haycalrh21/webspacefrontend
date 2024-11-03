// store.ts
import { create } from "zustand";
import myAxios from "@/lib/axios.config";
import { CommentsData, Discussion } from "@/types/types";
import axios from "axios";

interface StoreState {
  discussions: Discussion[];
  comments: CommentsData[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  fetchDiscussions: () => Promise<void>;
  fetchComments: () => Promise<void>;
  addDiscussion: (newDiscuss: Discussion, newComment: CommentsData) => void;
}

const useStore = create<StoreState>((set, get) => ({
  discussions: [],
  comments: [],
  loading: false,
  hasMore: true,
  page: 0,

  fetchDiscussions: async () => {
    set({ loading: true });
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.get(`${API_URL}/discuss?page=${get().page}`);
      const newDiscussions: Discussion[] = response.data;

      set((state) => ({
        discussions: [...state.discussions, ...newDiscussions],
        loading: false,
        hasMore: newDiscussions.length > 0,
        page: state.page + 1,
      }));
    } catch (error) {
      console.error("Error fetching discussions:", error);
      set({ loading: false });
    }
  },

  fetchComments: async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${API_URL}/comment`);
    const comments: CommentsData[] = response.data;

    set({ comments });
  },

  addDiscussion: (newDiscuss: Discussion, newComment: CommentsData) => {
    set((state) => ({
      discussions: [newDiscuss, ...state.discussions],
      comments: [newComment, ...state.comments],
    }));
  },
}));

export default useStore;
