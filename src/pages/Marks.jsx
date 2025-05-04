
import React from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Marks = () => {
  // Mock subject data
  const subjects = [
    { id: 1, name: 'Mathematics', midterm: 85, final: 78, total: 82, grade: 'A-' },
    { id: 2, name: 'Science', midterm: 92, final: 90, total: 91, grade: 'A+' },
    { id: 3, name: 'English', midterm: 75, final: 80, total: 78, grade: 'B+' },
    { id: 4, name: 'History', midterm: 65, final: 70, total: 68, grade: 'C+' },
    { id: 5, name: 'Computer Science', midterm: 95, final: 98, total: 97, grade: 'A+' },
  ];

  // Data for chart
  const chartData = subjects.map(subject => ({
    name: subject.name,
    midterm: subject.midterm,
    final: subject.final,
  }));

  // Calculate statistics
  const totalAverage = subjects.reduce((acc, subject) => acc + subject.total, 0) / subjects.length;
  const highestScore = Math.max(...subjects.map(subject => subject.total));
  const lowestScore = Math.min(...subjects.map(subject => subject.total));

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Academic Performance</h1>
        <p className="text-muted-foreground">View your marks and academic performance</p>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalAverage.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Overall average across all subjects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Highest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{highestScore}%</div>
              <p className="text-sm text-muted-foreground">Your highest-scoring subject</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Lowest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{lowestScore}%</div>
              <p className="text-sm text-muted-foreground">Subject that needs improvement</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Marks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="w-full">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-right">Midterm</TableHead>
                        <TableHead className="text-right">Final</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell className="text-right">{subject.midterm}%</TableCell>
                          <TableCell className="text-right">{subject.final}%</TableCell>
                          <TableCell className="text-right">{subject.total}%</TableCell>
                          <TableCell className="text-right">{subject.grade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="chart">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="midterm" name="Midterm" fill="#8884d8" />
                      <Bar dataKey="final" name="Final" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Marks;
