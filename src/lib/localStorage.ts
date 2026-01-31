// Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  headline: string;
  connections: number;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userHeadline: string;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
  headline: string;
  connections: number;
  loggedInAt: string;
}

// Storage keys
const USERS_KEY = 'linkedin_users';
const SESSION_KEY = 'linkedin_session';
const POSTS_KEY = 'linkedin_posts';

// User functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const updateUser = (userId: string, updates: Partial<User>): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// Session functions
export const getSession = (): Session | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const saveSession = (session: Session): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// Post functions
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const savePosts = (posts: Post[]): void => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const createPost = (post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: crypto.randomUUID(),
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};

export const updatePost = (postId: string, content: string): void => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index].content = content;
    posts[index].updatedAt = new Date().toISOString();
    savePosts(posts);
  }
};

export const deletePost = (postId: string): void => {
  const posts = getPosts().filter(p => p.id !== postId);
  savePosts(posts);
};

export const toggleLike = (postId: string, userId: string): void => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    const likeIndex = posts[index].likes.indexOf(userId);
    if (likeIndex > -1) {
      posts[index].likes.splice(likeIndex, 1);
    } else {
      posts[index].likes.push(userId);
    }
    savePosts(posts);
  }
};

export const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): void => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index].comments.push({
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
    savePosts(posts);
  }
};

// Generate unique ID
export const generateId = (): string => crypto.randomUUID();
