import { useState } from "react";

const PostContent = ({ content, setPost, editMode }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="mb-4">
      {editMode ? (
        <textarea
          autoFocus
          className="flex mb-3 min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm resize-none shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={content}
          onChange={(e) =>
            setPost((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
      ) : (
        <p
          className={`text-lg ${
            isExpanded ? "line-clamp-none" : "line-clamp-2 cursor-pointer"
          }`}
          onClick={toggleExpand}
        >
          {content}
        </p>
      )}
    </div>
  );
};

export default PostContent;
