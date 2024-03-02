import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import useHandleFollow from "@/lib/handleFollow";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { LuBookmark } from "react-icons/lu";

const PostHeader = ({
  postAuthor,
  post: { topic, userFollowed, _id, savedPost },
}) => {
  const {
    userAuth: { accessToken, user },
  } = useUserContext();

  const topicNameLength = 20;

  const handleFollow = useHandleFollow();

  const [isSaved, setIsSaved] = useState(savedPost);

  const handleSavePost = (_id) => {
    try {
      accessToken &&
        axios
          .post(
            `${import.meta.env.VITE_SERVER_PORT}posts/${_id}/savePost`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken} `,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setIsSaved((prevState) => !prevState);
          });
    } catch (error) {
      console.log(error);
    }
  };

  const topicName = topic?.title.replaceAll("-", " ");

  return (
    <div className="flex items-center justify-between mb-3">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <Link className="inline-flex items-center gap-2 hover:underline">
            <Avatar>
              <AvatarImage
                src={postAuthor.personal_data.profile_img}
                alt={`${postAuthor.personal_data.name}'s avatar`}
                className="w-10 h-10"
              />
              <AvatarFallback delayMs={600}>
                {postAuthor.personal_data.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="capitalize">
              <p className="font-semibold">{postAuthor.personal_data.name}</p>
              {/* <p className="text-sm text-gray-500">{post?.timestamp}</p> */}
            </div>
          </Link>
        </HoverCardTrigger>

        <HoverCardContent
          className="rounded-xl border-muted w-80"
          align="start"
        >
          <div className="flex justify-between">
            <div className="space-y-1">
              <Avatar>
                <AvatarImage src={postAuthor.personal_data.profile_img} />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <h4 className="text-sm font-semibold">
                @{postAuthor.personal_data.name}
              </h4>

              <div className="flex gap-4">
                <span className="text-xs text-muted-foreground">
                  {postAuthor.account_info.followers} Followers
                </span>
                <span className="text-xs text-muted-foreground">
                  {postAuthor.account_info.followings} Followings
                </span>
              </div>
            </div>

            {user._id === postAuthor._id ? (
              ""
            ) : userFollowed ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => console.log("unfollow")}
              >
                following
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleFollow(postAuthor._id)}
              >
                Follow
              </Button>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>

      <Button
        variant="ghost"
        className={`px-2 py-1 ${
          isSaved
            ? "bg-green-500/20 hover:bg-green-700/60 text-green-200"
            : "text-gray-500 hover:bg-green-500/20"
        }`}
        title="save"
        onClick={() => {
          handleSavePost(_id);
        }}
      >
        <LuBookmark className="cursor" />
      </Button>

      {topic && (
        <Link to={`/topics/${topic?._id}`}>
          <span className="px-2 py-1 text-xs font-semibold text-green-300 border rounded-full border-green-300/50 bg-white/10">
            {topicName?.length > topicNameLength
              ? `${topicName.slice(0, topicNameLength)}...`
              : topicName}
          </span>
        </Link>
      )}
    </div>
  );
};

export default PostHeader;
