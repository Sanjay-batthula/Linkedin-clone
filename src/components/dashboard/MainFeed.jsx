import { useState, useEffect } from 'react';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { getPosts } from '@/lib/localStorage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const MainFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  const loadPosts = () => {
    let allPosts = getPosts();

    // Sort posts
    if (sortBy === 'recent') {
      allPosts = allPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'top') {
      allPosts = allPosts.sort((a, b) => b.likes.length - a.likes.length);
    }

    setPosts(allPosts);
  };

  useEffect(() => {
    loadPosts();
  }, [sortBy]);

  // Poll for new posts every 2 seconds (simulates real-time updates)
  useEffect(() => {
    const interval = setInterval(loadPosts, 2000);
    return () => clearInterval(interval);
  }, [sortBy]);

  return (
    <main className="flex-1 max-w-xl space-y-4">
      <CreatePost onPostCreated={loadPosts} />
      
      {posts.length > 0 && (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-24 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="top">Top</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-2">No posts yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to share something with your network!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onPostUpdated={loadPosts} />
          ))}
        </div>
      )}
    </main>
  );
};
