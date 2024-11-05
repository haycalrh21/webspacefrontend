import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface LoadingProps {
  count?: number; // Jumlah skeleton yang ingin dirender
}

export default function Loading({ count = 6 }: LoadingProps) {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[150px] w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
