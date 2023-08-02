"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import DataContext from "@/app/ContextData";


const MyProfile = () => {

  const { profileName, postCreator, creatorId } = useContext(DataContext)
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${creatorId === "" ? session?.user.id : postCreator.creator._id}/posts`);
      const data = await response.json();
      setMyPosts(data);
      console.log(profileName)
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      // name={session?.user.id === postData?.creator._id ? "My" : profileName}
      name={creatorId === "" || creatorId === session.user.id ? "My" : profileName}
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;