import { LuBoxes } from "react-icons/lu";
import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    <div className="flex w-1/2 px-4 mb-4">
      <Link
        to={`/topics/${topic?._id}`}
        className="w-full px-4 py-2 rounded-lg bg-secondary"
      >
        <h5 className="flex items-center gap-2 text-lg">
          <LuBoxes />
          {topic.title}
        </h5>

        <p className="text-xs text-muted-foreground">{topic.postCount} posts</p>
      </Link>
    </div>
  );
};

export default TopicCard;
