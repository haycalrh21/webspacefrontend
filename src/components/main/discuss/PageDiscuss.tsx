"use client";
import React, { Suspense } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";
import { CommentsData, Discussion } from "@/types/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Loading from "@/app/discuss/loading";
import myAxios from "@/lib/axios.config";

// Fungsi untuk mengambil diskusi dari API
const fetchDiscussions = async (): Promise<Discussion[]> => {
  const response = await myAxios.get(`/discuss`);
  return response.data;
};

// Fungsi untuk mengambil komentar dari API
const fetchComments = async (): Promise<CommentsData[]> => {
  const response = await myAxios.get(`/comment`);
  return response.data;
};

const PageDiscuss: React.FC = () => {
  const queryClient = useQueryClient();

  // Query untuk diskusi
  const {
    data: discussions = [],
    isLoading: loadingDiscussions,
    isError: discussionsError,
  } = useQuery<Discussion[]>({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });

  // Query untuk komentar
  const {
    data: comments = [],
    isLoading: loadingComments,
    isError: commentsError,
  } = useQuery<CommentsData[]>({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  // Mutasi untuk menambahkan diskusi baru
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
    },
  });

  const handleNewDiscuss = (
    newDiscuss: Discussion,
    newComment: CommentsData
  ) => {
    addDiscussionMutation.mutate({ newDiscuss, newComment });
  };

  // Status loading dan error
  if (loadingDiscussions || loadingComments) {
    return <Loading />;
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
      <Suspense fallback={<Loading />}>
        <AddDiscuss onSubmitSuccess={handleNewDiscuss} />
        <CardDiscuss data={discussions} comment={comments} />
      </Suspense>
    </div>
  );
};

export default PageDiscuss;
