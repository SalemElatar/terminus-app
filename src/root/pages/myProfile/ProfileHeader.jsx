import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";
import Badge from "@/components/common/badge";
import FollowingButton from "@/components/common/followingButton";

const ProfileHeader = ({ profileImg, userName, stats, userId }) => {
  const isLatelyActive = true;

  return (
    <div className="flex justify-between mb-10">
      <div className="flex gap-8">
        <Dialog>
          <DialogTrigger>
            <img
              src={profileImg}
              alt="user image"
              className="rounded-full w-28 h-28"
            />
          </DialogTrigger>
          <DialogContent className="bg-transparent place-items-center">
            <img src={profileImg} alt="user image" className="rounded-md" />
          </DialogContent>
        </Dialog>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <h3 className="text-xl font-bold capitalize">{userName}</h3>
            <Badge variant="topic">
              {isLatelyActive ? "Lately Active" : "not seen for long time"}
            </Badge>
          </div>
          <div className="flex justify-between gap-2">
            <StateWidget states={stats.followers} label="followers" />
            <StateWidget states={stats.followings} label="followings" />
            <StateWidget states={stats.postsLength} label="posts" />
          </div>
        </div>
      </div>
      <FollowingButton className="self-end" followTargetId={userId} />
    </div>
  );
};

export default ProfileHeader;

export const StateWidget = ({ states, label }) => {
  return (
    <div className="state_widget">
      <p className="text-3xl font-bold">{states}</p>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
