import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/hooks/useProfileData";
import { Users, TrendingUp, Brain, Calendar } from "lucide-react";

interface ProfileStatsProps {
  profiles: Profile[];
}

export const ProfileStats = ({ profiles }: ProfileStatsProps) => {
  const totalProfiles = profiles.length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySignups = profiles.filter(
    (p) => new Date(p.created_at) >= today
  ).length;

  const cognitiveTypeCounts = profiles.reduce((acc, profile) => {
    const type = profile.cognitive_type || "Quiz Pending";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularType = Object.entries(cognitiveTypeCounts).sort(
    ([, a], [, b]) => b - a
  )[0];

  const averageAge =
    profiles.length > 0
      ? Math.round(
          profiles.reduce((sum, p) => sum + p.age, 0) / profiles.length
        )
      : 0;

  const stats = [
    {
      title: "Total Profiles",
      value: totalProfiles,
      icon: Users,
      description: "All registered users",
      color: "text-primary",
    },
    {
      title: "New Today",
      value: todaySignups,
      icon: TrendingUp,
      description: "Signups in last 24h",
      color: "text-accent",
    },
    {
      title: "Most Common Type",
      value: mostPopularType ? mostPopularType[0] : "N/A",
      icon: Brain,
      description: mostPopularType ? `${mostPopularType[1]} users` : "No data",
      color: "text-neural-purple",
    },
    {
      title: "Average Age",
      value: averageAge,
      icon: Calendar,
      description: "Mean user age",
      color: "text-neural-blue",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
