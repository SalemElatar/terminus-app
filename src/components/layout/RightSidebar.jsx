import { AiFillBulb } from "react-icons/ai";
import HeadingWithSymbol from "@/components/common/HeadingWithSymbol";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const [topics, setTopics] = useState([]);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchRightSidebarData = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_SERVER_PORT}topics/get-topics/3`)
          .then((response) => {
            setTopics(response.data);
          });

        await axios
          .get(`${import.meta.env.VITE_SERVER_PORT}users/topCreators`)
          .then((response) => {
            setCreators(response.data);
          })
          .catch(({ response }) => {
            console.error("Error fetching topics2:", response);
          });
      } catch ({ response: { data } }) {
        // console.error("Error fetching topics:", data);
      }
    };

    fetchRightSidebarData();
  }, []);
  if (!topics || !creators) {
    return <div>skelton</div>;
  }
  return (
    <div className="w-96 hidden min-w-[250px] lg:block">
      <div className="flex flex-col py-10 mr-10 rounded-lg animate-slideRight h-fit">
        <HeadingWithSymbol content="Latest Topics:" Icon={AiFillBulb} />
        <div className="flex flex-col gap-4 mt-4">
          {topics?.map((topic) => {
            return (
              <div className="w-full p-2 border-l-4 rounded-lg" key={topic._id}>
                <h5 className="text-lg font-semibold">
                  <Link to={`/topics/${topic._id}`} className="hover:underline">
                    {topic.title}
                  </Link>
                </h5>
                <p className="text-xs">{topic.postCount} posts</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col py-10 mr-10 rounded-lg animate-slideRight h-fit">
        <HeadingWithSymbol content="suggested creators:" Icon={AiFillBulb} />
        <div className="flex flex-wrap mt-4">
          {creators?.map((creator) => {
            return (
              <Link
                to={`/${creator.personal_data.name}`}
                className="flex flex-col items-center w-1/2 gap-2 p-2"
                key={creator._id}
              >
                <img
                  src={creator.personal_data.profile_img}
                  alt=""
                  className="w-20 rounded-full"
                />
                <h5 className="font-semibold hover:underline">
                  {creator.personal_data.name}
                </h5>
                <p className="text-sm font-semibold text-gray-500 hover:underline">
                  {creator.account_info.followers} Follower
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
