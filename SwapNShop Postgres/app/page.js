"use client"
import { useEffect,useState } from "react"
import PostsWrapper from "../components/layouts/PostsWrapper";
import PostCard from "../components/PostCard";

  function Page() {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/home/${pageNumber}`)
          const data = await response.json()
          setPosts((e)=>[...e,...data?.itemsToSend]);
          setTotalPages(data.totalPages);
        } catch (error) {
          
        }
      };
  
      // fetchItems();
    }, [pageNumber]);
    
    const onLoadMore = async () => {
      if (pageNumber < totalPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
    
    const scrollEVentCallback = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      if (scrollPosition >= documentHeight - 10) {
        onLoadMore();
      }
    }

    useEffect(() => {
      window.addEventListener("scroll",scrollEVentCallback);
  
      return () => {
        window.removeEventListener("scroll",scrollEVentCallback);
      };
    }, [onLoadMore]);
  

    return (
    <>
        <PostsWrapper>
        {posts.map((item,index) =>{
          return(
            <PostCard postObj={item} />
            ) 
        })}
        </PostsWrapper>
    </>
  );
  
}

export default Page