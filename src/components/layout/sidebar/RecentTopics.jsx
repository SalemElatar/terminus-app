import topicsApi from "@/api/topics";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@ui/toast";

const RecentTopics = () => {
  const {
    userAuth: { accessToken },
  } = useUserContext();

  const { toast } = useToast();

  const [recentTopics, setRecentTopics] = useState(null);

  const fetchRecentTopics = async () => {
    try {
      if (accessToken) {
        const response = await topicsApi.get("user/get-recent-topic", {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        setRecentTopics(response?.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error("Error fetching recent topics:", error);
    }
  };

  useEffect(() => {
    fetchRecentTopics();
  }, [accessToken]);

  return (
    <div className="flex flex-wrap items-center gap-2 my-4 text-sm">
      <span className="text-xs font-bold">Recent:</span>

      {recentTopics?.map((topic, index) => {
        const topicName = topic.title.replaceAll("-", " ");
        return (
          <Link
            key={index}
            to={`/topics/${topic._id}`}
            className="px-2 font-semibold rounded-sm bg-secondary hover:bg-popover"
            title={topicName}
          >
            {topic.length > 6 ? topicName.substring(0, 6) + "..." : topicName}
          </Link>
        );
      })}
    </div>
  );
};

export default RecentTopics;
