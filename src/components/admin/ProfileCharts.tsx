import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Profile } from "@/hooks/useProfileData";
import { AlertCircle, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  const assessedProfiles = profiles.filter(p => p.cognitive_type && p.cognitive_type !== "Quiz Pending");
  
  const cognitiveTypeData = Object.entries(
    profiles.reduce((acc, profile) => {
      const type = profile.cognitive_type || "Quiz Pending";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value,
    percentage: profiles.length > 0 ? (value / profiles.length) * 100 : 0
  }));

  // Bias detection - check if any cognitive type is over/under represented
  const assessedTypeData = cognitiveTypeData.filter(d => d.name !== "Quiz Pending");
  const expectedPercentage = assessedTypeData.length > 0 ? 100 / assessedTypeData.length : 0;
  const biasThreshold = 20; // 20% deviation from expected
  
  const biasDetected = assessedTypeData.some(d => 
    Math.abs(d.percentage - expectedPercentage) > biasThreshold
  );

  const biasedTypes = assessedTypeData.filter(d => 
    Math.abs(d.percentage - expectedPercentage) > biasThreshold
  );

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
    <div className="space-y-4">
      {/* Bias Detection Alert */}
      {biasDetected && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Bias Detected in Profile Distribution</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <p className="mb-2">The following cognitive types show significant deviation from expected distribution:</p>
              <ul className="list-disc list-inside space-y-1">
                {biasedTypes.map(type => (
                  <li key={type.name}>
                    <strong>{type.name}</strong>: {type.percentage.toFixed(1)}% 
                    (Expected: {expectedPercentage.toFixed(1)}%, 
                    Deviation: {Math.abs(type.percentage - expectedPercentage).toFixed(1)}%)
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                Consider reviewing the assessment algorithm to ensure fair distribution across all cognitive types.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Distribution Summary Card */}
      {assessedProfiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Profile Assignment Analysis
            </CardTitle>
            <CardDescription>
              Statistical breakdown of {assessedProfiles.length} assessed profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessedTypeData.map((type, index) => (
                <div key={type.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{type.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{type.value} users</span>
                      <span className={`font-bold ${
                        Math.abs(type.percentage - expectedPercentage) > biasThreshold
                          ? 'text-destructive'
                          : 'text-primary'
                      }`}>
                        {type.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        Math.abs(type.percentage - expectedPercentage) > biasThreshold
                          ? 'bg-destructive'
                          : 'bg-primary'
                      }`}
                      style={{ 
                        width: `${type.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <p><strong>Expected average:</strong> {expectedPercentage.toFixed(1)}% per type</p>
              <p><strong>Bias threshold:</strong> ±{biasThreshold}% deviation</p>
              <p><strong>Status:</strong> {biasDetected ? '⚠️ Bias detected' : '✅ Distribution normal'}</p>
            </div>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
};
