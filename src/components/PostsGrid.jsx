import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { PostTagsFilter } from "./PostTagsFilter";

export default function PostsGrid() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/posts.json").then((res) => res.json()),
      fetch("/data/tags.json").then((res) => res.json()),
    ])
      .then(([postsData, tagsData]) => {
        const top3 = postsData.posts
          .filter((post) => post.published)
          .slice(0, 3);
        setPosts(top3);
        setTags(tagsData.tags);
      })
      .catch(console.error);
  }, []);

  const filteredPosts =
    activeTag == null
      ? posts
      : posts.filter((post) => post.tags?.includes(activeTag));

  return (
    <section className="space-y-4">
      <PostTagsFilter
        tags={tags}
        activeTag={activeTag}
        onChange={setActiveTag}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
