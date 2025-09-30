import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/hooks/useProfileData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ProfileChartsProps {
  profiles: Profile[];
}

const COLORS = [
  "hsl(315, 65%, 55%)", // primary
  "hsl(35, 85%, 65%)", // accent
  "hsl(200, 65%, 60%)", // neural-blue
  "hsl(280, 60%, 65%)", // neural-purple
  "hsl(330, 70%, 70%)", // neural-pink
  "hsl(200, 25%, 92%)", // secondary
];

export const ProfileCharts = ({ profiles }: ProfileChartsProps) => {
  // Cognitive type distribution
  const cognitiveTypeData = Object.entries(
    profiles.reduce((acc, profile) => {
      const type = profile.cognitive_type || "Quiz Pending";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // Age distribution
  const ageRanges = [
    { range: "18-25", min: 18, max: 25 },
    { range: "26-35", min: 26, max: 35 },
    { range: "36-45", min: 36, max: 45 },
    { range: "46-55", min: 46, max: 55 },
    { range: "56+", min: 56, max: 100 },
  ];

  const ageData = ageRanges.map((range) => ({
    range: range.range,
    count: profiles.filter((p) => p.age >= range.min && p.age <= range.max)
      .length,
  }));

  // Gender distribution
  const genderData = Object.entries(
    profiles.reduce((acc, profile) => {
      acc[profile.gender] = (acc[profile.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Cognitive Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cognitiveTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="value"
              >
                {cognitiveTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="hsl(var(--accent))"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
