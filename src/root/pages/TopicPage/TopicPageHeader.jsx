import { Link } from "react-router-dom";
import { Skeleton } from "@ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import Badge from "@/components/common/badge";
// import { TopUsers } from "./topUsers";

const TopicPageHeader = ({ title, creator, postsCounter, description }) => {
  if (!creator || !title || !postsCounter) {
    return (
      <div className="flex items-center justify-between gap-4 w-96">
        <Skeleton className="w-3/4 h-20 p-2 mb-5 rounded-lg" />
        <Skeleton className="w-1/4 h-20 p-2 mb-5 rounded-lg" />
      </div>
    );
  }
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Badge variant="topic">Topic</Badge>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex gap-4 divide-x-2 text-blue-300/80">
            <span className="text-xs">{postsCounter} Posts</span>
          </div>
        </div>

        {/* Creator */}
        <Link
          to={`/${creator.name}`}
          className="flex justify-between p-3 space-x-4 border-l border-slate-700/50 hover:bg-popover"
        >
          <Avatar>
            <AvatarImage src={creator.profile_img} />
            <AvatarFallback delayMs={600}>VC</AvatarFallback>
          </Avatar>
          <div className="">
            <h4 className="text-sm font-semibold capitalize">
              @{creator.name}
            </h4>

            <div className="flex items-center pt-1 mr-20">
              <span className="text-xs text-muted-foreground">creator</span>
            </div>
          </div>
        </Link>
      </div>

      <p className="desc">🧾 {description}</p>

      {/* <TopUsers /> */}
    </div>
  );
};

export default TopicPageHeader;
