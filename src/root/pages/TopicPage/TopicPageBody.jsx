import Post from "@/components/common/Post";

const TopicPageBody = ({ topicPosts }) => {
  return (
    <div className="pt-5 space-y-5">
      {topicPosts?.map((post) => {
        return <Post key={post._id} post={post} postAuthor={post.author} />;
      })}
    </div>
  );
};

export default TopicPageBody;
