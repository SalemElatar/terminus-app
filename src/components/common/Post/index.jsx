import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import SharePost from "./sharePost";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import { LuMaximize } from "react-icons/lu";
import { useToast } from "@/components/ui/use-toast";

const Post = ({ post, postAuthor }) => {
  const { userAuth: { accessToken, user } = {} } = useUserContext();

  const { toast } = useToast();

  const [postState, setPost] = useState(post);

  const [myLike, setMyLike] = useState(false);
  const [editMode, setEditMode] = useState(false);
  console.log(post);
  useEffect(() => {
    if (post.userLiked) {
      setMyLike(true);
    }
  }, [post]);

  const handleEdit = () => {
    try {
      accessToken &&
        axios
          .put(
            `${import.meta.env.VITE_SERVER_PORT}posts/${post._id}/edit`,
            { content: postState.content },
            {
              headers: {
                Authorization: `Bearer ${accessToken} `,
              },
            }
          )
          .then(({ data, status }) => {
            setEditMode(false);
            if (status === 404) {
              return toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: data.message,
              });
            }
          });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostLike = async () => {
    try {
      accessToken &&
        axios
          .put(
            `${import.meta.env.VITE_SERVER_PORT}posts/${post._id}/toggleLike`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken} `,
              },
            }
          )
          .then(({ data, status }) => {
            if (data) {
              if (status === 404) {
                return toast({
                  variant: "destructive",
                  title: "Something went wrong!",
                  description: data.message,
                });
              }
              setMyLike((prevState) => !prevState);
            }
          });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[485px] px-4 py-4 rounded-lg bg-primary-foreground">
      {/* Post Header */}
      <PostHeader postAuthor={postAuthor} post={postState} />

      {/* Post Content */}
      <PostContent
        content={postState?.content}
        setPost={setPost}
        editMode={editMode}
      />

      {/* Post Image */}
      {post.image && (
        <Dialog>
          <DialogTrigger asChild>
            <img
              src={`https://res.cloudinary.com/${
                import.meta.env.VITE_CLOUDINARY_NAME
              }/image/upload/w_500,h_350,c_fill,q_100/${post.image}.jpg`}
              alt="Post Image"
              className="w-full mb-4 rounded-md cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent>
            <img
              src={`https://res.cloudinary.com/${
                import.meta.env.VITE_CLOUDINARY_NAME
              }/image/upload/w_200,h_100,c_fill,q_100/${post.image}.jpg`}
              alt="post image"
              className="w-full mb-4 rounded-md"
            />
          </DialogContent>
          <DialogClose />
        </Dialog>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="small"
            className={
              "flex items-center p-1 space-x-1 text-gray-500 rounded-lg hover:bg-green-500/20 group " +
              (myLike ? "bg-green-400/10 px-2" : "")
            }
            onClick={handlePostLike}
          >
            <FaHeart
              className={
                "group-hover:text-green-200 " + (myLike ? "text-green-400" : "")
              }
            />
            <span>Like</span>
          </Button>
          {/* <button className="flex items-center space-x-1 text-gray-500">
            <FaComment />
            <span>Comment</span>
          </button> */}
        </div>

        <div className="flex gap-2">
          {user._id === postAuthor._id ? (
            editMode ? (
              <>
                <Button variant="outline" onClick={handleEdit}>
                  {" "}
                  confirm
                </Button>
                <Button variant="outline"> cancel</Button>
                <Button variant="destructive"> delete icon</Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="px-1 text-gray-500"
                onClick={() => {
                  setEditMode((prev) => !prev);
                }}
              >
                <FaEdit />
              </Button>
            )
          ) : (
            ""
          )}
          <SharePost
            authorName={postAuthor.personal_data.name}
            postId={post._id}
          />
          <Link to={`/${postAuthor.personal_data.name}/posts/${post._id}`}>
            <Button variant="ghost" className="px-1">
              <LuMaximize />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
