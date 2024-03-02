import { Route, Routes } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import "./styles/global.css";
import Layout from "./root/layout";
import { UserContext } from "@/context/userContext";
import { AuthLayout, SignUpForm, SigninForm } from "@/auth";
import {
  NewTopicPage,
  MyProfile,
  SavedPosts,
  TopicPage,
  HomePage,
  PopularTopics,
  PostPage,
  SearchPage,
} from "@/root/pages";

export default function App() {
  return (
    <HelmetProvider>
      <UserContext>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:userName">
              <Route index element={<MyProfile />} />
              <Route path="savedPosts" element={<SavedPosts />} />
              <Route path="posts/:postId" element={<PostPage />} />
            </Route>
            <Route path="/topics">
              <Route index element={<PopularTopics />} />
              <Route path="new-topic" element={<NewTopicPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path=":topicId" element={<TopicPage />} />
            </Route>
          </Route>
        </Routes>
      </UserContext>
    </HelmetProvider>
  );
}
