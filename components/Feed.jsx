'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import PromptCard from './PromptCard'
import { useSession } from 'next-auth/react';
import DataContext from '@/app/ContextData';


const PromptCardList = ({ data, handleTagClick }) => {


  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [SearchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([])
  const [posts, setPosts] = useState([]);
  const inputRef = useRef();
  const { data: session } = useSession();
  const { setProfileName, profileName, setCreatorId, creatorId } = useContext(DataContext);



  useEffect(() => {
    setCreatorId("");
    setProfileName("");
  }, [])


  const handleSearchChange = (e) => {
    setSearchText(e.target.value.trim())
    // Set the post arry to the filtered array value
  }

  const handleTagClick = (e) => {
    inputRef.current.value = e.target.innerText.slice(1)
    setSearchText(e.target.innerText.slice(1));
  }

  useEffect(() => {
    const filteredPosts = posts.filter(post => post.tag.includes(SearchText) | post.prompt.includes(SearchText) | session?.em)
    setFilteredPosts(filteredPosts)
  }, [SearchText, posts])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPost();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Search for a tag or username'
          onChange={handleSearchChange}
          className="search_input"
          required

        />

      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed