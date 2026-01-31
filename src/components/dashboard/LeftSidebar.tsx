import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { updateUser, getSession, saveSession } from '@/lib/localStorage';
import { Bookmark, Users, Pencil } from 'lucide-react';

export const LeftSidebar = () => {
  const { session } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(session?.name || '');
  const [editHeadline, setEditHeadline] = useState(session?.headline || '');
  const [localSession, setLocalSession] = useState(session);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const shortcuts = [
    { label: 'Groups', icon: Users },
    { label: 'Events', icon: Bookmark },
    { label: 'Saved Items', icon: Bookmark },
  ];

  const handleOpenEdit = () => {
    setEditName(localSession?.name || '');
    setEditHeadline(localSession?.headline || '');
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    if (!localSession || !editName.trim()) return;

    // Update user in storage
    updateUser(localSession.userId, {
      name: editName.trim(),
      headline: editHeadline.trim() || 'LinkedIn Member',
    });

    // Update session
    const updatedSession = {
      ...localSession,
      name: editName.trim(),
      headline: editHeadline.trim() || 'LinkedIn Member',
    };
    saveSession(updatedSession);
    setLocalSession(updatedSession);
    setIsEditOpen(false);

    // Force page reload to update all components
    window.location.reload();
  };

  const displaySession = localSession || session;

  return (
    <>
      <aside className="w-56 space-y-4 sticky top-20 h-fit">
        {/* Profile Card */}
        <Card className="card-elevated overflow-hidden">
          {/* Banner */}
          <div className="h-16 bg-gradient-to-r from-primary/30 to-primary/50 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 bg-card/80 hover:bg-card"
              onClick={handleOpenEdit}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Profile Info */}
          <CardContent className="pt-0 pb-4 text-center -mt-8">
            <button onClick={handleOpenEdit} className="group">
              <Avatar className="h-16 w-16 border-4 border-card mx-auto mb-3 group-hover:ring-2 ring-primary transition-all">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {displaySession ? getInitials(displaySession.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </button>
            <button onClick={handleOpenEdit} className="hover:underline">
              <h3 className="font-semibold text-foreground">{displaySession?.name}</h3>
            </button>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {displaySession?.headline}
            </p>
          </CardContent>

          {/* Stats */}
          <div className="border-t border-border">
            <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Connections</span>
                <span className="text-sm font-semibold text-primary">{displaySession?.connections || 0}</span>
              </div>
            </button>
            <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Profile viewers</span>
                <span className="text-sm font-semibold text-primary">{Math.floor(Math.random() * 100) + 5}</span>
              </div>
            </button>
            <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Post impressions</span>
                <span className="text-sm font-semibold text-primary">{Math.floor(Math.random() * 50) + 10}</span>
              </div>
            </button>
          </div>
        </Card>

        {/* Shortcuts */}
        <Card className="card-elevated">
          <CardContent className="p-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-2">
              Shortcuts
            </p>
            {shortcuts.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </aside>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {editName ? getInitials(editName) : 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-headline">Headline</Label>
              <Textarea
                id="edit-headline"
                value={editHeadline}
                onChange={(e) => setEditHeadline(e.target.value)}
                placeholder="e.g. Software Engineer at Google"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={!editName.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
