"use client";
import React, { useEffect, useState, useRef } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";
import { CommentsData, Discussion } from "@/types/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const fetchDiscussions = async (): Promise<Discussion[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get(`${API_URL}/discuss`);
  return response.data;
};

const fetchComments = async (): Promise<CommentsData[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get(`${API_URL}/comment`);
  return response.data;
};

const PageDiscuss: React.FC = () => {
  const queryClient = useQueryClient();
  const [visibleDiscussions, setVisibleDiscussions] = useState<Discussion[]>(
    []
  );
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    data: discussions = [],
    isLoading: loadingDiscussions,
    isError: discussionsError,
  } = useQuery<Discussion[]>({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
    onSuccess: (data) => {
      setVisibleDiscussions(data.slice(0, 9)); // Inisialisasi saat data berhasil diambil
    },
  });

  const {
    data: comments = [],
    isLoading: loadingComments,
    isError: commentsError,
  } = useQuery<CommentsData[]>({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  useEffect(() => {
    if (discussions.length > 0) {
      setVisibleDiscussions(discussions.slice(0, 9));
    }
  }, [discussions]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoadingMore) {
        const currentLength = visibleDiscussions.length;
        const nextItems = discussions.slice(currentLength, currentLength + 3);

        if (nextItems.length > 0) {
          setIsLoadingMore(true);
          setVisibleDiscussions((prev) => [...prev, ...nextItems]);
          setIsLoadingMore(false);
        }
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [visibleDiscussions, discussions, isLoadingMore]);

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
      <div className="flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (discussionsError || commentsError) {
    return (
      <div className="flex justify-center items-center">
        <p>Error memuat diskusi atau komentar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AddDiscuss onSubmitSuccess={handleNewDiscuss} />
      <CardDiscuss data={visibleDiscussions} comment={comments} />
      {visibleDiscussions.length < discussions.length && (
        <div ref={loaderRef} className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default PageDiscuss;
