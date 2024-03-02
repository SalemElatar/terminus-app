import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { PostSkeleton } from "@/components/ui/skeleton";
import Post from "@/components/common/Post";
import { TbBookmarksOff } from "react-icons/tb";
import MetaTags from "@/lib/metaTags";

const SavedPosts = () => {
  const { userAuth: { user, accessToken } = {} } = useUserContext();

  const [savedPosts, setSavedPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSavedPosts = () => {
    accessToken &&
      axios
        .get(`${import.meta.env.VITE_SERVER_PORT}posts/saved/page`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          setSavedPosts(data);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching saved posts:", error);
        });
  };

  useEffect(() => {
    getSavedPosts();
  }, [accessToken]);

  if (isLoading) {
    return [...Array(3).keys()].map((i) => <PostSkeleton key={i} />);
  }

  return (
    <>
      <MetaTags title={`Saved Posts - Terminus`} />

      {savedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 h-80">
          <TbBookmarksOff size={50} />
          <h3>No saved posts yet!</h3>
        </div>
      ) : (
        <div className="space-y-5">
          {savedPosts?.map((post) => {
            return <Post key={post._id} post={post} postAuthor={user} />;
          })}
        </div>
      )}
    </>
  );
};

export default SavedPosts;
