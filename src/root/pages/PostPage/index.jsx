import postsApi from "@/api/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import Post from "@/components/common/Post";
import { PostSkeleton } from "@/components/ui/skeleton";

const PostPage = () => {
  const {
    userAuth: { accessToken },
  } = useUserContext();

  const { postId } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    accessToken &&
      postsApi
        .get(postId, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          setPost(data);
        })
        .catch(({ response }) => {
          if (response && response.status === 404) {
            console.log(response.data.error);
          }
        });
  }, [accessToken]);

  if (!post) {
    return <PostSkeleton />;
  }

  return <Post post={post} postAuthor={post.author} />;
};

export default PostPage;
