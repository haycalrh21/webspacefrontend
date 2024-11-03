"use client";
import React, { useEffect, useState } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";
import { CommentsData, Discussion } from "@/types/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
// Fetch all discussions
const fetchDiscussions = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get(`${API_URL}/discuss`);
  return response.data;
};

// Fetch all comments
const fetchComments = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get(`${API_URL}/comment`);
  return response.data;
};

export default function PageDiscuss() {
  const queryClient = useQueryClient();
  const [visibleDiscussions, setVisibleDiscussions] = useState<Discussion[]>(
    []
  );

  // Query for discussions
  const { data: discussions = [], isLoading: loadingDiscussions } = useQuery({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });

  // Query for comments
  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  // Initialize with 6 items
  useEffect(() => {
    if (discussions.length > 0) {
      setVisibleDiscussions(discussions.slice(0, 6));
    }
  }, [discussions]);

  // Load more discussions on scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottom) {
        const currentLength = visibleDiscussions.length;

        if (currentLength + 3 >= discussions.length) {
          // If next load would exceed total, show all remaining
          setVisibleDiscussions(discussions);
        } else if (currentLength < discussions.length) {
          // Load next 3 items
          setVisibleDiscussions(discussions.slice(0, currentLength + 3));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleDiscussions, discussions]);

  // Mutation for adding new discussion
  const addDiscussionMutation = useMutation({
    mutationFn: async (newData: {
      newDiscuss: Discussion;
      newComment: CommentsData;
    }) => {
      return newData;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ["discussions"],
        (oldData: Discussion[] = []) => [newData.newDiscuss, ...oldData]
      );
      queryClient.setQueryData(["comments"], (oldData: CommentsData[] = []) => [
        newData.newComment,
        ...oldData,
      ]);

      // Update visible discussions when new item is added
      setVisibleDiscussions((prev) => [
        newData.newDiscuss,
        ...prev.slice(0, 5),
      ]);
    },
  });

  const handleNewDiscuss = (
    newDiscuss: Discussion,
    newComment: CommentsData
  ) => {
    addDiscussionMutation.mutate({ newDiscuss, newComment });
  };

  if (loadingDiscussions || loadingComments) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AddDiscuss onSubmitSuccess={handleNewDiscuss} />
      <CardDiscuss data={visibleDiscussions} comment={comments} />
    </div>
  );
}
