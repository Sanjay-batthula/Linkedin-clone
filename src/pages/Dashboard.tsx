import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/dashboard/Navbar';
import { LeftSidebar } from '@/components/dashboard/LeftSidebar';
import { MainFeed } from '@/components/dashboard/MainFeed';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { session, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not logged in, redirect to home
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6 justify-center">
          {/* Left Sidebar - Fixed/Sticky */}
          <div className="hidden lg:block shrink-0">
            <LeftSidebar />
          </div>

          {/* Main Feed */}
          <MainFeed />

          {/* Right Sidebar - Fixed/Sticky */}
          <div className="hidden xl:block shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
