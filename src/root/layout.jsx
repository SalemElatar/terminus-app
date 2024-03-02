import { Outlet } from "react-router-dom";
import { Topbar, Sidebar, CreatePost, RightSidebar } from "@/components/layout";
import { PostsContext } from "@/context/postsContext";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Topbar />
      <div className="flex justify-center w-full gap-0 md:justify-normal md:gap-4 xl:gap-24 ">
        <Sidebar />

        <PostsContext>
          <main className="flex flex-col w-full max-w-xl min-h-screen px-4 md:min md:px-0 border-x-0 pb-96 ">
            <Outlet />
            <Toaster />
          </main>
          <CreatePost />
        </PostsContext>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;
