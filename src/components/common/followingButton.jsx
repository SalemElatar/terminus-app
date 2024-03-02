import { Button } from "@ui/button";
import useHandleFollow from "@/lib/handleFollow";
import { useUserContext } from "@/context/userContext";
import { useState } from "react";

const FollowingButton = ({ className, followTargetId }) => {
  const {
    userAuth: { user: { _id, followings } = {} },
  } = useUserContext();

  const handleFollow = useHandleFollow();

  //   useEffect(() => {
  //     isFollowing

  //   }, [])

  const [isFollowing, setIsFollowing] = useState(
    followings.includes(followTargetId)
  );

  if (followTargetId === _id) {
    return;
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className={className}
      onClick={() => {
        handleFollow(followTargetId);
        setIsFollowing((prevState) => !prevState);
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowingButton;
