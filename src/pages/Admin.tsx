import { useProfileData } from "@/hooks/useProfileData";
import { ProfileStats } from "@/components/admin/ProfileStats";
import { ProfileCharts } from "@/components/admin/ProfileCharts";
import { ProfileTable } from "@/components/admin/ProfileTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, Heart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Admin = () => {
  const { profiles, isLoading, error } = useProfileData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and analyze user profile data in real-time
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingIndicator message="Loading profile data..." />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load profile data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <div className="space-y-8">
            <ProfileStats profiles={profiles} />
            <ProfileCharts profiles={profiles} />
            <ProfileTable profiles={profiles} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
