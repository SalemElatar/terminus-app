import topicsApi from "@/api/topics";
import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import MetaTags from "@/lib/metaTags";

const PopularTopics = () => {
  const [popularTopics, setPopularTopics] = useState([]);

  useEffect(() => {
    const fetchPopularTopics = async () => {
      try {
        const response = await topicsApi.get(`get-topics/10`);
        setPopularTopics(response.data);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        console.error("Error fetching topics:", message);
      }
    };

    fetchPopularTopics();
  }, []);

  return (
    <>
      <MetaTags title="Topics" />
      <div>
        <h3 className="mb-4 text-lg font-bold">Popular Topics:</h3>
        <div className="flex flex-wrap">
          {popularTopics?.map((topic) => {
            return <TopicCard topic={topic} key={topic._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default PopularTopics;
