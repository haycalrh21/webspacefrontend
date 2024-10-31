"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
export default function CardIndexProject() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [project, setProject] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/project`);
    setProject(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {project.map(
            (item: {
              id: number;
              imageUrls: string;
              language: number;
              name: string;
              description: string;
            }) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="text-md">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="h-40 w-full object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <p>{item.language}</p>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </Suspense>
    </div>
  );
}
