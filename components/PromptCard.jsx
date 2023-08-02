'use client'

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import DataContext from "@/app/ContextData";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { setProfileName, setPostCreator, creatorId, setCreatorId } = useContext(DataContext);
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();



  const ShowProfile =  () => {
    setProfileName(post.creator.username)
    setCreatorId(post.creator._id)
    setPostCreator(post)
    router.push("/profile")
  };

  const [copied, setCopied] = useState(" ")

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopied('')
    }, 3000)
  }

  return (

    <div className="prompt_card">

      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">

          {pathName === "/profile" ? (
            <Image
              src={post.creator?.image}
              alt="user iamge"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          ) : (

            <Image
              onClick={ShowProfile}
              src={post.creator?.image}
              alt="user iamge"
              width={40}
              height={40}

              className="rounded-full object-contain"
            />
          )}


          <div className="flex flex-col">
            <h3
              className="font_satoshi font-smibold text-gray-900"
            >{post.creator?.username}</h3>
            <p
              className="font-inter text-sm text-gray-500"
            >{post.creator?.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="icon"
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={handleTagClick && handleTagClick}>#{post?.tag.includes("#") ? post?.tag.replace(/#/g, '') : post?.tag
        }</p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex gap-4 flex-conter border-t border-gray-100  pt-3">
          <p className="font-inter text-sm green_gradient  cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient  cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;