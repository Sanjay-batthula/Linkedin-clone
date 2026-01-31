import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { createPost } from '@/lib/localStorage';
import { Loader2 } from 'lucide-react';

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { session } = useAuth();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handlePost = async () => {
    if (!content.trim() || !session) return;

    setIsPosting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    createPost({
      userId: session.userId,
      userName: session.name,
      userHeadline: session.headline,
      content: content.trim(),
    });

    setContent('');
    setIsExpanded(false);
    setIsPosting(false);
    onPostCreated();
  };

  return (
    <Card className="card-elevated">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {session ? getInitials(session.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full text-left px-4 py-3 rounded-full border border-border bg-muted/30 text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                Start a post...
              </button>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] resize-none border-0 focus-visible:ring-0 text-base p-0"
                  autoFocus
                />
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {content.length} / 3000 characters
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent('');
                      }}
                      disabled={isPosting}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handlePost}
                      disabled={!content.trim() || isPosting}
                      className="btn-linkedin rounded-full px-4"
                    >
                      {isPosting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        'Post'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
