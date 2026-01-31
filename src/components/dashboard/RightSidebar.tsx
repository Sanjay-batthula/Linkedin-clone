import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp } from 'lucide-react';

export const RightSidebar = () => {
  const suggestedConnections = [
    { name: 'Sarah Chen', headline: 'Product Manager at Meta', initials: 'SC' },
    { name: 'Marcus Johnson', headline: 'Senior Developer at Amazon', initials: 'MJ' },
    { name: 'Emily Rodriguez', headline: 'UX Designer at Apple', initials: 'ER' },
  ];

  const trendingTopics = [
    { topic: 'Making AI part of daily work', readers: '2,971 readers', time: '1d ago' },
    { topic: 'LinkedIn India\'s newest Top Voices', readers: '1,671 readers', time: '1d ago' },
    { topic: 'Gen Z drives beauty shift', readers: '1,243 readers', time: '22h ago' },
    { topic: 'Remote work trends 2026', readers: '619 readers', time: '1d ago' },
    { topic: 'Tech hiring rebounds', readers: '545 readers', time: '1d ago' },
  ];

  return (
    <aside className="w-72 space-y-4 sticky top-20 h-fit">
      {/* LinkedIn News / Trending */}
      <Card className="card-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            LinkUp News
          </CardTitle>
          <p className="text-sm text-muted-foreground">Top stories</p>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3">
            {trendingTopics.map((item, index) => (
              <li key={index}>
                <button className="w-full text-left hover:bg-muted/50 rounded-md p-2 -mx-2 transition-colors">
                  <p className="font-medium text-sm text-foreground leading-tight">{item.topic}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time} • {item.readers}</p>
                </button>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="w-full mt-3 text-muted-foreground">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Suggested Connections */}
      <Card className="card-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Add to your network</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {suggestedConnections.map((person, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{person.headline}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 h-7 text-xs rounded-full border-primary text-primary hover:bg-primary/10"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="text-xs text-muted-foreground space-y-2 px-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="hover:text-primary cursor-pointer hover:underline">About</span>
          <span className="hover:text-primary cursor-pointer hover:underline">Accessibility</span>
          <span className="hover:text-primary cursor-pointer hover:underline">Help Center</span>
          <span className="hover:text-primary cursor-pointer hover:underline">Privacy</span>
          <span className="hover:text-primary cursor-pointer hover:underline">Terms</span>
        </div>
        <p className="pt-2">©  LinkUp Corporation</p>
      </div>
    </aside>
  );
};
