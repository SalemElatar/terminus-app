import topicsApi from "@/api/topics";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import TopicPageHeader from "./TopicPageHeader";
import TopicPageBody from "./TopicPageBody";
import MetaTags from "@/lib/metaTags";

const TopicPage = () => {
  const { userAuth: { accessToken } = {} } = useUserContext();

  const { topicId } = useParams();

  const [topic, setTopic] = useState({});
  const [topicPosts, setTopicPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topicId && accessToken) {
          const topicResponse = await topicsApi.get(topicId);
          setTopic(topicResponse.data.topic);
          setTopicPosts(topicResponse.data.postsWithUserActions);

          await topicsApi.post(
            `${topicId}/add-to-recent`,
            {},
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [accessToken, topicId]);

  if (!topic) {
    return (
      <>
        <MetaTags title={`topic not found - Terminus`} />
        <h3 className="text-lg">topic doesn't exist</h3>
      </>
    );
  }
  return (
    <>
      <MetaTags title={`${topic.title} - Terminus`} />
      <div className="divide-y">
        <TopicPageHeader
          postsCounter={topicPosts?.length}
          title={topic.title}
          creator={topic?.creator?.personal_data}
          description={topic?.description}
        />

        {topicPosts && <TopicPageBody topic={topic} topicPosts={topicPosts} />}
      </div>
    </>
  );
};

export default TopicPage;
