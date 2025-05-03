
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  TrendingUp,
  BarChart
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const ChildMarks = () => {
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedExam, setSelectedExam] = useState('all');
  
  // Sample children data
  const children = [
    {
      id: '1',
      name: 'John Doe',
      class: '10th Standard',
      section: 'A',
      rollNumber: '101'
    },
    {
      id: '2',
      name: 'Jane Doe',
      class: '8th Standard',
      section: 'B',
      rollNumber: '102'
    }
  ];
  
  // Sample exams data
  const exams = [
    { id: 'fa1', name: 'First Assessment', maxMarks: 40 },
    { id: 'fa2', name: 'Second Assessment', maxMarks: 40 },
    { id: 'sa1', name: 'First Term Exam', maxMarks: 100 },
    { id: 'fa3', name: 'Third Assessment', maxMarks: 40 },
    { id: 'fa4', name: 'Fourth Assessment', maxMarks: 40 },
    { id: 'sa2', name: 'Second Term Exam', maxMarks: 100 },
    { id: 'annual', name: 'Annual Exam', maxMarks: 100 },
  ];
  
  // Sample subjects
  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'Social Studies',
    'Hindi',
    'Computer Science',
  ];
  
  // Sample marks data
  const marksData = {
    '1': {
      'fa1': {
        'Mathematics': { obtained: 35, maxMarks: 40, grade: 'A+' },
        'Science': { obtained: 32, maxMarks: 40, grade: 'A' },
        'English': { obtained: 36, maxMarks: 40, grade: 'A+' },
        'Social Studies': { obtained: 30, maxMarks: 40, grade: 'A' },
        'Hindi': { obtained: 28, maxMarks: 40, grade: 'B+' },
        'Computer Science': { obtained: 38, maxMarks: 40, grade: 'A+' },
      },
      'fa2': {
        'Mathematics': { obtained: 33, maxMarks: 40, grade: 'A' },
        'Science': { obtained: 34, maxMarks: 40, grade: 'A' },
        'English': { obtained: 35, maxMarks: 40, grade: 'A+' },
        'Social Studies': { obtained: 32, maxMarks: 40, grade: 'A' },
        'Hindi': { obtained: 30, maxMarks: 40, grade: 'A' },
        'Computer Science': { obtained: 36, maxMarks: 40, grade: 'A+' },
      },
      'sa1': {
        'Mathematics': { obtained: 86, maxMarks: 100, grade: 'A+' },
        'Science': { obtained: 78, maxMarks: 100, grade: 'A' },
        'English': { obtained: 88, maxMarks: 100, grade: 'A+' },
        'Social Studies': { obtained: 74, maxMarks: 100, grade: 'B+' },
        'Hindi': { obtained: 72, maxMarks: 100, grade: 'B+' },
        'Computer Science': { obtained: 92, maxMarks: 100, grade: 'A+' },
      },
    },
    '2': {
      'fa1': {
        'Mathematics': { obtained: 32, maxMarks: 40, grade: 'A' },
        'Science': { obtained: 30, maxMarks: 40, grade: 'A' },
        'English': { obtained: 35, maxMarks: 40, grade: 'A+' },
        'Social Studies': { obtained: 28, maxMarks: 40, grade: 'B+' },
        'Hindi': { obtained: 34, maxMarks: 40, grade: 'A' },
        'Computer Science': { obtained: 36, maxMarks: 40, grade: 'A+' },
      },
      'fa2': {
        'Mathematics': { obtained: 30, maxMarks: 40, grade: 'A' },
        'Science': { obtained: 31, maxMarks: 40, grade: 'A' },
        'English': { obtained: 36, maxMarks: 40, grade: 'A+' },
        'Social Studies': { obtained: 29, maxMarks: 40, grade: 'B+' },
        'Hindi': { obtained: 33, maxMarks: 40, grade: 'A' },
        'Computer Science': { obtained: 35, maxMarks: 40, grade: 'A+' },
      },
      'sa1': {
        'Mathematics': { obtained: 75, maxMarks: 100, grade: 'B+' },
        'Science': { obtained: 78, maxMarks: 100, grade: 'A' },
        'English': { obtained: 88, maxMarks: 100, grade: 'A+' },
        'Social Studies': { obtained: 70, maxMarks: 100, grade: 'B' },
        'Hindi': { obtained: 82, maxMarks: 100, grade: 'A' },
        'Computer Science': { obtained: 85, maxMarks: 100, grade: 'A' },
      },
    }
  };
  
  // Filter marks data based on selected child and exam
  const filteredExams = selectedExam === 'all' 
    ? Object.keys(marksData[selectedChild] || {}) 
    : [selectedExam];

  // Calculate total marks and percentage
  const calculateTotalAndPercentage = (childId, examId) => {
    const examMarks = marksData[childId]?.[examId];
    if (!examMarks) return { total: 0, percentage: 0 };
    
    const subjectsCount = Object.keys(examMarks).length;
    const totalObtained = Object.values(examMarks).reduce((sum, mark) => sum + mark.obtained, 0);
    const totalMax = Object.values(examMarks).reduce((sum, mark) => sum + mark.maxMarks, 0);
    
    return {
      total: totalObtained,
      percentage: (totalObtained / totalMax) * 100
    };
  };
  
  // Prepare data for chart
  const chartData = subjects.map(subject => {
    const subjectData = { name: subject };
    filteredExams.forEach(examId => {
      const exam = exams.find(e => e.id === examId);
      const mark = marksData[selectedChild]?.[examId]?.[subject];
      if (mark) {
        subjectData[exam.name] = (mark.obtained / mark.maxMarks) * 100;
      }
    });
    return subjectData;
  });
  
  // Get grade color
  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-emerald-100 text-emerald-800',
      'B+': 'bg-blue-100 text-blue-800',
      'B': 'bg-sky-100 text-sky-800',
      'C+': 'bg-amber-100 text-amber-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-red-100 text-red-800',
      'F': 'bg-rose-100 text-rose-800'
    };
    return gradeColors[grade] || 'bg-gray-100 text-gray-800';
  };
  
  // Get child by ID
  const currentChild = children.find(child => child.id === selectedChild);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Child Academic Performance</h1>
            <p className="text-muted-foreground">View your child's examination marks and performance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              {children.map(child => (
                <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exams</SelectItem>
              {exams.map(exam => (
                <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Child Info */}
        {currentChild && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{currentChild.name}</CardTitle>
              <CardDescription>
                Class: {currentChild.class} | Section: {currentChild.section} | Roll Number: {currentChild.rollNumber}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredExams.map(examId => {
            const exam = exams.find(e => e.id === examId);
            const stats = calculateTotalAndPercentage(selectedChild, examId);
            return (
              <Card key={examId}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{exam.name}</CardTitle>
                  <CardDescription>Max Marks: {exam.maxMarks} per subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.percentage.toFixed(2)}%</div>
                  <p className="text-sm text-muted-foreground">Total: {stats.total}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Marks Tabs */}
        <Tabs defaultValue="marks">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marks">Detailed Marks</TabsTrigger>
            <TabsTrigger value="chart">Performance Chart</TabsTrigger>
            <TabsTrigger value="overview">Subject Overview</TabsTrigger>
          </TabsList>
          
          {/* Marks Tab Content */}
          <TabsContent value="marks">
            <Card>
              <CardContent className="pt-4">
                {filteredExams.map(examId => {
                  const exam = exams.find(e => e.id === examId);
                  const examMarks = marksData[selectedChild]?.[examId];
                  
                  if (!examMarks) return null;
                  
                  return (
                    <div key={examId} className="mb-8 last:mb-0">
                      <h3 className="text-lg font-semibold mb-4">{exam.name}</h3>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Max Marks</TableHead>
                              <TableHead>Marks Obtained</TableHead>
                              <TableHead>Percentage</TableHead>
                              <TableHead>Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subjects.map(subject => {
                              const mark = examMarks[subject];
                              if (!mark) return null;
                              
                              return (
                                <TableRow key={subject}>
                                  <TableCell className="font-medium">{subject}</TableCell>
                                  <TableCell>{mark.maxMarks}</TableCell>
                                  <TableCell>{mark.obtained}</TableCell>
                                  <TableCell>{((mark.obtained / mark.maxMarks) * 100).toFixed(2)}%</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className={getGradeColor(mark.grade)}>
                                      {mark.grade}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Chart Tab Content */}
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Subject wise percentage comparison across exams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ReTooltip />
                      <Legend />
                      {filteredExams.map(examId => {
                        const exam = exams.find(e => e.id === examId);
                        return (
                          <Bar 
                            key={examId}
                            dataKey={exam.name} 
                            fill={
                              examId === 'fa1' ? '#8884d8' :
                              examId === 'fa2' ? '#82ca9d' :
                              examId === 'sa1' ? '#ffc658' :
                              examId === 'fa3' ? '#ff8042' :
                              examId === 'fa4' ? '#0088fe' :
                              examId === 'sa2' ? '#00C49F' :
                              '#FFBB28'
                            }
                          />
                        );
                      })}
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Subject Overview</CardTitle>
                <CardDescription>
                  Performance summary for each subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map(subject => {
                    let totalObtained = 0;
                    let totalMax = 0;
                    let avgGrade = '';
                    
                    // Calculate total and average for the subject
                    filteredExams.forEach(examId => {
                      const mark = marksData[selectedChild]?.[examId]?.[subject];
                      if (mark) {
                        totalObtained += mark.obtained;
                        totalMax += mark.maxMarks;
                        avgGrade = mark.grade; // Just using the most recent grade for simplicity
                      }
                    });
                    
                    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
                    
                    return (
                      <Card key={subject} className="bg-gray-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{subject}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{percentage.toFixed(2)}%</div>
                            <Badge variant="outline" className={getGradeColor(avgGrade)}>
                              {avgGrade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {totalObtained} out of {totalMax} marks
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Overall average: {calculateTotalAndPercentage(selectedChild, filteredExams[0]).percentage.toFixed(2)}%
                </p>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ChildMarks;
