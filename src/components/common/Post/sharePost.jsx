import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaShareAlt } from "react-icons/fa";
import { Input } from "../../ui/input";
import { LuCopy } from "react-icons/lu";
import Badge from "../badge";

const SharePost = ({ authorName, postId }) => {
  const postUrl = `${import.meta.env.VITE_APP_ROOT}${authorName}/${postId}`;

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-1 text-gray-500">
          <FaShareAlt />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this Post</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Input className="pr-12" value={postUrl} readonly />

          <Button
            variant="ghost"
            className="absolute px-2 -translate-y-1/2 rounded-md cursor-pointer right-4 top-1/2"
            onClick={async () => {
              await navigator.clipboard.writeText(postUrl);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 4000);
            }}
          >
            <LuCopy />
          </Button>
          {isCopied && (
            <Badge
              variant=""
              className="absolute translate-y-3/4 right-4 top-1/2"
            >
              Copied
            </Badge>
          )}
        </div>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default SharePost;
