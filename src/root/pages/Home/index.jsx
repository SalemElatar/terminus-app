import postsApi from "@/api/posts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaTags from "@/lib/metaTags";
import { useUserContext } from "@/context/userContext";
import { PostSkeleton } from "@/components/ui/skeleton";
import Post from "@/components/common/Post";
import { usePostsContext } from "@/context/postsContext";

const HomePage = () => {
  const {
    userAuth: { accessToken },
  } = useUserContext();

  const navigate = useNavigate();

  // const [feedPosts, setFeedPosts] = useState(null);
  const { feedPosts, setFeedPosts } = usePostsContext();

  useEffect(() => {
    const getFeedPosts = () => {
      try {
        accessToken &&
          postsApi
            .get("", {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })
            .then(({ data }) => {
              setFeedPosts(data.feedPosts);
            })
            .catch((error) => {
              console.error("Error fetching feed posts:", error);
            });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
        console.log(error);
      }
    };
    if (!accessToken) {
      return navigate("/sign-in");
    }

    getFeedPosts();
  }, [accessToken]);

  if (!feedPosts || !Array.isArray(feedPosts)) {
    return [...Array(3).keys()].map((i) => <PostSkeleton key={i} />);
  }

  return (
    <>
      <MetaTags title="Terminus - Explore your interests" />
      <section className="flex flex-col animate-[slideDown_ease-in-out_0.7s_forwards] space-y-5">
        {feedPosts?.map((post) => {
          return <Post key={post._id} post={post} postAuthor={post.author} />;
        })}
      </section>
    </>
  );
};

export default HomePage;
