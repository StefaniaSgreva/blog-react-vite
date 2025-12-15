import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

export default function PostsGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento dei post");
        return res.json();
      })
      .then((data) => {
        const top3 = data.posts
          .filter((post) => post.published)
          .slice(0, 3);
        setPosts(top3);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
