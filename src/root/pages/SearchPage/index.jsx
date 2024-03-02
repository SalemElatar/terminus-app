import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MetaTags from "@/lib/metaTags";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);

  const getSearchResults = async () => {
    try {
      const searchResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}topics/search?${searchParams}`
      );
      setSearchResults(searchResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <>
      <MetaTags title={`searching "${searchParams.get("title")}" - Terminus`} />
      <div className="w-full px-12 *:mt-10">
        <h4 className="text-lg font-bold">Results:</h4>
        <ul>
          {searchResults?.map((result, index) => (
            <li key={index}>
              <Link to={`/topics/`} className="font-bold test-md">
                {result.title}
              </Link>
              <p className="flex gap-4">
                <span>{result.postsCounter} Post</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchPage;
