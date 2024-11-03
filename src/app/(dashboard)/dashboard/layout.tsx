// "use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session?.user?.role);

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center">
        <div>
          <p className="text-center">You are not admin</p>
          <div>
            <p className="text-center">
              <Link href="/" className="hover:underline">
                {" "}
                Go to Home{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <main className="flex justify-center w-full">
        <SidebarTrigger />
        <div className="w-full mt-4 px-10 flex-grow">{children}</div>
      </main>
    </SidebarProvider>
  );
}
