import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { toggleLike, deletePost, updatePost, addComment } from '@/lib/localStorage';
import { ThumbsUp, MessageCircle, MoreHorizontal, Pencil, Trash2, Send, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const PostCard = ({ post, onPostUpdated }) => {
  const { session } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isOwner = session?.userId === post.userId;
  const isLiked = session ? post.likes.includes(session.userId) : false;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLike = () => {
    if (!session) return;
    toggleLike(post.id, session.userId);
    onPostUpdated();
  };

  const handleDelete = () => {
    deletePost(post.id);
    onPostUpdated();
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    updatePost(post.id, editContent.trim());
    setIsEditing(false);
    onPostUpdated();
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !session) return;
    addComment(post.id, {
      userId: session.userId,
      userName: session.name,
      content: commentText.trim(),
    });
    setCommentText('');
    onPostUpdated();
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const wasEdited = post.createdAt !== post.updatedAt;

  return (
    <Card className="card-elevated">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {getInitials(post.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{post.userName}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.userHeadline}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{timeAgo}</span>
                {wasEdited && <span>• Edited</span>}
                <span>•</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
          </div>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {/* Content */}
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(post.content);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={!editContent.trim()}
                className="btn-linkedin rounded-full"
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-foreground whitespace-pre-wrap mb-4">{post.content}</p>
        )}
        {/* Stats */}
        {(post.likes.length > 0 || post.comments.length > 0) && (
          <div className="flex items-center justify-between text-sm text-muted-foreground py-2 border-t border-border">
            {post.likes.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="bg-primary rounded-full p-1">
                  <ThumbsUp className="h-3 w-3 text-primary-foreground" />
                </span>
                <span>{post.likes.length}</span>
              </div>
            )}
            {post.comments.length > 0 && (
              <button 
                onClick={() => setShowComments(!showComments)}
                className="hover:text-primary hover:underline"
              >
                {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        )}
        {/* Actions */}
        <div className="flex items-center border-t border-border pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 gap-2 ${isLiked ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 gap-2 text-muted-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            Comment
          </Button>
        </div>
        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Add Comment */}
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {session ? getInitials(session.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[40px] resize-none flex-1"
                  rows={1}
                />
                <Button
                  size="icon"
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Comments List */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-foreground">{comment.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
