
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Award, BookOpen, Smile } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Report = () => {
  const studentInfo = {
    name: "John Doe",
    id: "STU2025001",
    class: "12th Grade",
    section: "A",
    rollNumber: "25",
    academicYear: "2025-26",
    term: "Spring Term"
  };

  const subjects = [
    { name: "Mathematics", marks: 85, total: 100, grade: "A", remarks: "Excellent problem-solving skills" },
    { name: "Physics", marks: 78, total: 100, grade: "B+", remarks: "Good understanding of concepts" },
    { name: "Chemistry", marks: 82, total: 100, grade: "A-", remarks: "Consistent performance" },
    { name: "Biology", marks: 90, total: 100, grade: "A+", remarks: "Outstanding work" },
    { name: "English", marks: 75, total: 100, grade: "B", remarks: "Needs improvement in writing" },
    { name: "Computer Science", marks: 95, total: 100, grade: "A+", remarks: "Exceptional programming skills" }
  ];

  const calculateTotal = () => {
    return subjects.reduce((acc, subject) => acc + subject.marks, 0);
  };

  const calculatePercentage = () => {
    const total = calculateTotal();
    const maxTotal = subjects.length * 100;
    return ((total / maxTotal) * 100).toFixed(2);
  };

  const calculateGrade = () => {
    const percentage = parseFloat(calculatePercentage());
    if (percentage >= 90) return "A+";
    else if (percentage >= 80) return "A";
    else if (percentage >= 70) return "B+";
    else if (percentage >= 60) return "B";
    else if (percentage >= 50) return "C";
    else return "F";
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Report Card</h1>
        <p className="text-muted-foreground">View your academic performance report</p>
        
        <Tabs defaultValue="report">
          <TabsList className="mb-4">
            <TabsTrigger value="report">Report Card</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
          
          <TabsContent value="report">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Academic Report Card</CardTitle>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </CardHeader>
              
              <CardContent>
                <div className="print-container">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold">Mobile Institute</h2>
                    <p className="text-muted-foreground">Academic Achievement Report</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p><strong>Name:</strong> {studentInfo.name}</p>
                      <p><strong>Student ID:</strong> {studentInfo.id}</p>
                      <p><strong>Class:</strong> {studentInfo.class}</p>
                    </div>
                    <div>
                      <p><strong>Section:</strong> {studentInfo.section}</p>
                      <p><strong>Roll Number:</strong> {studentInfo.rollNumber}</p>
                      <p><strong>Academic Year:</strong> {studentInfo.academicYear}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-right">Marks Obtained</TableHead>
                          <TableHead className="text-right">Total Marks</TableHead>
                          <TableHead className="text-right">Grade</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell className="text-right">{subject.marks}</TableCell>
                            <TableCell className="text-right">{subject.total}</TableCell>
                            <TableCell className="text-right">{subject.grade}</TableCell>
                            <TableCell>{subject.remarks}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell>Total</TableCell>
                          <TableCell className="text-right">{calculateTotal()}</TableCell>
                          <TableCell className="text-right">{subjects.length * 100}</TableCell>
                          <TableCell colSpan={2}></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <FileText className="mr-2 h-4 w-4" /> Percentage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{calculatePercentage()}%</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Award className="mr-2 h-4 w-4" /> Overall Grade
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{calculateGrade()}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" /> Class Rank
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">5 / 30</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium">Teacher's Comment</h3>
                    <div className="rounded-md border p-3 bg-muted/30">
                      <p>John has shown consistent improvement throughout the term. His performance in science subjects is commendable. He should focus more on improving his English writing skills.</p>
                    </div>
                    
                    <h3 className="font-medium">Principal's Remarks</h3>
                    <div className="rounded-md border p-3 bg-muted/30">
                      <p>A promising student with great potential. Keep up the good work.</p>
                      <div className="flex items-center mt-2">
                        <Smile className="mr-2 h-5 w-5 text-green-500" />
                        <span>Excellent progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transcript">
            <Card>
              <CardHeader>
                <CardTitle>Academic Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Your complete academic transcript for all terms will be available here.</p>
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">Transcript feature will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Report;
