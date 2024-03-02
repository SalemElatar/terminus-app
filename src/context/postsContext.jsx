import { createContext, useContext, useEffect, useState } from "react";

let Context = createContext({});

export const PostsContext = ({ children }) => {
  const [feedPosts, setFeedPosts] = useState(null);

  return (
    <Context.Provider value={{ feedPosts, setFeedPosts }}>
      {children}
    </Context.Provider>
  );
};

export const usePostsContext = () => useContext(Context);
