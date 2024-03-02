import postsApi from "@/api/posts";
import MetaTags from "@/lib/metaTags";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import { Skeleton } from "@ui/skeleton";
import ProfileHeader from "./ProfileHeader";
import TopicsCreatedBy from "./TopicsCreatedBy";
import Post from "@/components/common/post";
import { BiSolidMessageError } from "react-icons/bi";

const MyProfile = () => {
  const {
    userAuth: { accessToken },
  } = useUserContext();

  const { userName } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [userPage, setUserPage] = useState(null);
  const [userExist, setUserExist] = useState(true);

  useEffect(() => {
    accessToken &&
      postsApi
        .get(`${userName}/getPosts`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          setUserPage({ ...data });
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(({ response }) => {
          if (response && response.status === 404) {
            setUserExist(false);
            setIsLoading(true);
            console.log(response.data.error);
          }
        });
  }, [accessToken, userName]);

  if (!userExist) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 ">
        <BiSolidMessageError size="170" className="text-cyan-500/30" />
        <h5 className="text-3xl font-bold capitalize text-cyan-100">
          page doesn't exist
        </h5>
        <Link to="/" className="hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!userPage || isLoading) {
    return (
      <>
        <div className="flex gap-4 my-5">
          <Skeleton className="rounded-lg w-28 h-28" />
          <Skeleton className="w-full rounded-md h-28" />
        </div>
        {[...Array(3).keys()].map((i) => (
          <Skeleton key={i} className="w-full h-56 p-4 mb-5 rounded-lg" />
        ))}
      </>
    );
  }

  let { postAuthor, posts } = userPage;
  return (
    <div className="mt-10">
      <MetaTags title={postAuthor?.personal_data.name} />

      <ProfileHeader
        profileImg={postAuthor.personal_data.profile_img}
        userName={postAuthor.personal_data.name}
        userId={postAuthor._id}
        stats={{
          followers: postAuthor.account_info.followers,
          followings: postAuthor.account_info.followings,
          postsLength: posts?.length,
        }}
      />

      <TopicsCreatedBy
        userName={postAuthor.personal_data.name}
        topics={postAuthor.createdByTopics}
      />

      <div className="space-y-5 animate-slideDown">
        {posts.map((post) => (
          <Post key={post._id} post={post} postAuthor={postAuthor} />
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
