import topicsApi from "@/api/topics";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { usePostsContext } from "@/context/postsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@ui/select";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import HeadingWithSymbol from "@/components/common/HeadingWithSymbol";
import { IoIosCreate, IoMdImages } from "react-icons/io";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const {
    userAuth: { user: { personal_data: { name } = {} } = {}, accessToken },
  } = useUserContext();

  const [suggestedTopics, setSuggestedTopics] = useState([]);

  useEffect(() => {
    topicsApi.get("get-topics/10").then(({ data }) => {
      setSuggestedTopics(data);
    });
  }, []);

  const [selectedTopic, setSelectedTopic] = useState(undefined);

  const { setFeedPosts } = usePostsContext();

  const [selectedImages, setSelectedImages] = useState();
  const [NewPostContent, setNewPostContent] = useState("");

  const [loadingButton, setLoadingButton] = useState(false);

  const handleImageUpload = async () => {
    setLoadingButton(true);
    const signatureResponse = await axios.get(
      `${import.meta.env.VITE_SERVER_PORT}createPost/get-signature`
    );

    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);
    formData.append("signature", signatureResponse.data.signature);
    formData.append("timestamp", signatureResponse.data.timestamp);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          console.log(e.loaded / e.total);
        },
      }
    );
    setLoadingButton(false);

    return cloudinaryResponse;
  };

  const handleCreateNewPost = async () => {
    let imgData;
    setLoadingButton(true);

    if (selectedImages) {
      const cloudinaryResponse = await handleImageUpload();
      imgData = {
        public_id: cloudinaryResponse.data.public_id,
        version: cloudinaryResponse.data.version,
        signature: cloudinaryResponse.data.signature,
      };
    }

    try {
      if (accessToken) {
        await axios
          .post(
            import.meta.env.VITE_SERVER_PORT + "createPost",
            {
              content: NewPostContent,
              imgData: imgData ? imgData : null,
              topic: selectedTopic,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken} `,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setFeedPosts((prevState) => {
              prevState.unshift(data);

              return [data, ...prevState]; // Make sure to return the previous state unchanged
            });
          });
      }
    } catch (error) {
      console.log(error);
    }

    setLoadingButton(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="fixed z-10 text-white transition duration-300 shadow-lg shadow-blue-500/50 bottom-8 right-8 focus:outline-none"
        >
          <span className="flex items-center">
            <IoIosCreate className="mr-2" />
            Create Post
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-muted">
        <DialogHeader>
          <DialogTitle>
            <HeadingWithSymbol
              Icon={IoIosCreate}
              content="Share something interesting ..."
            />
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between">
          <Link
            className="w-fit cursor-pointer inline-flex items-center rounded-md border-2 border-secondary px-2.5 py-0.5 text-xs font-semibold mb-4 bg-secondary/60 hover:underline"
            to={`/${name}`}
          >
            @ {name}
          </Link>

          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a topic..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="cursor-default">Topics</SelectLabel>
                {suggestedTopics?.map((topic) => {
                  const topicName = topic.title.replaceAll("-", " ");
                  return (
                    <SelectItem value={topic._id} key={topic._id}>
                      {topicName}
                    </SelectItem>
                  );
                })}
                <SelectSeparator />
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreateNewPost();
            setOpen(false);
          }}
        >
          <textarea
            autoFocus
            className="flex mb-3 min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm resize-none shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="your thoughts ..."
            rows="5"
            value={NewPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />

          <label
            htmlFor="upload_img"
            className="flex flex-col items-center justify-center w-full h-20 mb-4 text-center transition border rounded-lg cursor-pointer border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-900/10 "
          >
            <IoMdImages size={30} />
            <p className="text-xs font-semibold capitalize">add image</p>
            <Input
              type="file"
              name="upload_img"
              id="upload_img"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                setSelectedImages(e.target.files[0]);
              }}
              hidden
            />
          </label>

          <Button variant="secondary" type="submit" disabled={loadingButton}>
            Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
