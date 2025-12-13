import { getStoredLeaves } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function Charts() {
  const leaves = getStoredLeaves();

  // Data for Bar Chart (Leave Type Distribution)
  const typeCount = leaves.reduce((acc, leave) => {
    acc[leave.type] = (acc[leave.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(typeCount).map(key => ({
    name: key,
    count: typeCount[key]
  }));

  // Data for Pie Chart (Status Distribution)
  const statusCount = leaves.reduce((acc, leave) => {
    acc[leave.status] = (acc[leave.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCount).map(key => ({
    name: key,
    value: statusCount[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Data for Line Chart (Trends) - Mocked based on months
  const trendData = [
    { name: 'Jan', leaves: 4 },
    { name: 'Feb', leaves: 3 },
    { name: 'Mar', leaves: 2 },
    { name: 'Apr', leaves: 6 },
    { name: 'May', leaves: 8 },
    { name: 'Jun', leaves: 5 },
    { name: 'Jul', leaves: 4 },
    { name: 'Aug', leaves: 3 },
    { name: 'Sep', leaves: 5 },
    { name: 'Oct', leaves: leaves.length }, // Current leaves
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Analytics & Charts</h2>
        <p className="text-muted-foreground">Visual insights into leave trends and productivity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/40 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Leave Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Request Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Monthly Leave Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                  <Line type="monotone" dataKey="leaves" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
