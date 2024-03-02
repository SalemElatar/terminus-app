import axios from "axios";
import { useUserContext } from "@/context/userContext";
import { useToast } from "@/components/ui/use-toast";

const useHandleFollow = () => {
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useUserContext();

  const { toast } = useToast();

  const handleFollow = async (followTargetId) => {
    try {
      if (accessToken) {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_PORT}editUser/add-following`,
          { followTargetId },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserAuth((prevState) => ({ ...prevState, user: response.data }));
        sessionStorage.setItem(
          "userSession",
          JSON.stringify({ accessToken, user: response.data })
        );
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast({
        title: message,
        variant: "destructive",
      });
      console.error("Error adding follow:", message);
    }
  };
  return handleFollow;
};

export default useHandleFollow;
