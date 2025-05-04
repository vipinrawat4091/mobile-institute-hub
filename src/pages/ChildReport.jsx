
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  Printer,
  FileText,
  BookOpen,
  Smile,
  Award,
  Calendar
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const ChildReport = () => {
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedTerm, setSelectedTerm] = useState('annual');
  
  // Sample children data
  const children = [
    {
      id: '1',
      name: 'John Doe',
      class: '10th Standard',
      section: 'A',
      rollNumber: '101',
      photo: '👦'
    },
    {
      id: '2',
      name: 'Jane Doe',
      class: '8th Standard',
      section: 'B',
      rollNumber: '102',
      photo: '👧'
    }
  ];
  
  // Sample terms
  const terms = [
    { id: 'sa1', name: 'First Term' },
    { id: 'sa2', name: 'Second Term' },
    { id: 'annual', name: 'Annual Report' }
  ];
  
  // Sample subjects and marks
  const subjects = [
    'English',
    'Hindi',
    'Mathematics',
    'Science',
    'Social Science',
    'Computer Science',
    'Art & Craft',
    'Physical Education'
  ];
  
  const reportData = {
    '1': {
      'sa1': {
        marks: {
          'English': { theory: 75, practical: 23, total: 98, grade: 'A+', remarks: 'Excellent' },
          'Hindi': { theory: 65, practical: 20, total: 85, grade: 'A', remarks: 'Good' },
          'Mathematics': { theory: 82, practical: 0, total: 82, grade: 'A', remarks: 'Very good' },
          'Science': { theory: 68, practical: 22, total: 90, grade: 'A+', remarks: 'Excellent' },
          'Social Science': { theory: 72, practical: 18, total: 90, grade: 'A+', remarks: 'Excellent' },
          'Computer Science': { theory: 35, practical: 45, total: 80, grade: 'A', remarks: 'Good' },
          'Art & Craft': { theory: 0, practical: 85, total: 85, grade: 'A', remarks: 'Very creative' },
          'Physical Education': { theory: 20, practical: 70, total: 90, grade: 'A+', remarks: 'Excellent' }
        },
        attendance: {
          total: 95,
          present: 85,
          percentage: 89.5
        },
        activities: [
          { name: 'Science Exhibition', achievement: 'Second Prize', remarks: 'Innovative project' },
          { name: 'Debate Competition', achievement: 'Participation', remarks: 'Good arguments' }
        ],
        remarks: {
          classTeacher: 'John is an excellent student with good academic performance. Needs to improve time management.',
          principal: 'Keep up the good work. Looking forward to continued excellence.'
        }
      },
      'sa2': {
        marks: {
          'English': { theory: 78, practical: 21, total: 99, grade: 'A+', remarks: 'Excellent' },
          'Hindi': { theory: 70, practical: 18, total: 88, grade: 'A', remarks: 'Good' },
          'Mathematics': { theory: 85, practical: 0, total: 85, grade: 'A', remarks: 'Very good' },
          'Science': { theory: 70, practical: 24, total: 94, grade: 'A+', remarks: 'Excellent' },
          'Social Science': { theory: 75, practical: 18, total: 93, grade: 'A+', remarks: 'Excellent' },
          'Computer Science': { theory: 38, practical: 48, total: 86, grade: 'A', remarks: 'Very good' },
          'Art & Craft': { theory: 0, practical: 88, total: 88, grade: 'A', remarks: 'Very creative' },
          'Physical Education': { theory: 22, practical: 72, total: 94, grade: 'A+', remarks: 'Excellent' }
        },
        attendance: {
          total: 90,
          present: 84,
          percentage: 93.3
        },
        activities: [
          { name: 'Annual Sports Day', achievement: 'First in 100m Race', remarks: 'Outstanding performance' },
          { name: 'Cultural Fest', achievement: 'Lead Role in Play', remarks: 'Excellent acting skills' }
        ],
        remarks: {
          classTeacher: 'John has shown significant improvement in all subjects. Keep it up!',
          principal: 'Excellent progress. John is developing into a well-rounded student.'
        }
      },
      'annual': {
        marks: {
          'English': { theory: 77, practical: 22, total: 99, grade: 'A+', remarks: 'Excellent' },
          'Hindi': { theory: 68, practical: 19, total: 87, grade: 'A', remarks: 'Good' },
          'Mathematics': { theory: 84, practical: 0, total: 84, grade: 'A', remarks: 'Very good' },
          'Science': { theory: 69, practical: 23, total: 92, grade: 'A+', remarks: 'Excellent' },
          'Social Science': { theory: 74, practical: 18, total: 92, grade: 'A+', remarks: 'Excellent' },
          'Computer Science': { theory: 37, practical: 47, total: 84, grade: 'A', remarks: 'Very good' },
          'Art & Craft': { theory: 0, practical: 87, total: 87, grade: 'A', remarks: 'Very creative' },
          'Physical Education': { theory: 21, practical: 71, total: 92, grade: 'A+', remarks: 'Excellent' }
        },
        attendance: {
          total: 185,
          present: 169,
          percentage: 91.4
        },
        activities: [
          { name: 'Science Exhibition', achievement: 'Second Prize', remarks: 'Innovative project' },
          { name: 'Debate Competition', achievement: 'Participation', remarks: 'Good arguments' },
          { name: 'Annual Sports Day', achievement: 'First in 100m Race', remarks: 'Outstanding performance' },
          { name: 'Cultural Fest', achievement: 'Lead Role in Play', remarks: 'Excellent acting skills' }
        ],
        remarks: {
          classTeacher: 'John has had a remarkable academic year showing growth in all areas. His participation in extra-curricular activities has been commendable.',
          principal: 'John has demonstrated consistent performance throughout the year. We are proud of his achievements.'
        }
      }
    },
    '2': {
      'sa1': {
        marks: {
          'English': { theory: 68, practical: 20, total: 88, grade: 'A', remarks: 'Good' },
          'Hindi': { theory: 72, practical: 22, total: 94, grade: 'A+', remarks: 'Excellent' },
          'Mathematics': { theory: 65, practical: 0, total: 65, grade: 'B+', remarks: 'Good' },
          'Science': { theory: 70, practical: 21, total: 91, grade: 'A+', remarks: 'Excellent' },
          'Social Science': { theory: 75, practical: 17, total: 92, grade: 'A+', remarks: 'Excellent' },
          'Computer Science': { theory: 32, practical: 42, total: 74, grade: 'B+', remarks: 'Good' },
          'Art & Craft': { theory: 0, practical: 90, total: 90, grade: 'A+', remarks: 'Excellent' },
          'Physical Education': { theory: 18, practical: 68, total: 86, grade: 'A', remarks: 'Very good' }
        },
        attendance: {
          total: 95,
          present: 88,
          percentage: 92.6
        },
        activities: [
          { name: 'Art Competition', achievement: 'First Prize', remarks: 'Exceptional talent' },
          { name: 'Music Recital', achievement: 'Solo Performance', remarks: 'Well received' }
        ],
        remarks: {
          classTeacher: 'Jane is a creative student who excels in arts. Needs to focus more on mathematics.',
          principal: 'Jane shows great potential. Looking forward to her continued growth.'
        }
      },
      // More terms data would follow the same pattern
      'annual': {
        marks: {
          'English': { theory: 70, practical: 22, total: 92, grade: 'A+', remarks: 'Excellent' },
          'Hindi': { theory: 75, practical: 23, total: 98, grade: 'A+', remarks: 'Excellent' },
          'Mathematics': { theory: 68, practical: 0, total: 68, grade: 'B+', remarks: 'Good improvement' },
          'Science': { theory: 72, practical: 22, total: 94, grade: 'A+', remarks: 'Excellent' },
          'Social Science': { theory: 78, practical: 18, total: 96, grade: 'A+', remarks: 'Excellent' },
          'Computer Science': { theory: 35, practical: 45, total: 80, grade: 'A', remarks: 'Good' },
          'Art & Craft': { theory: 0, practical: 95, total: 95, grade: 'A+', remarks: 'Outstanding' },
          'Physical Education': { theory: 20, practical: 70, total: 90, grade: 'A+', remarks: 'Excellent' }
        },
        attendance: {
          total: 185,
          present: 175,
          percentage: 94.6
        },
        activities: [
          { name: 'Art Competition', achievement: 'First Prize', remarks: 'Exceptional talent' },
          { name: 'Music Recital', achievement: 'Solo Performance', remarks: 'Well received' },
          { name: 'Drama Club', achievement: 'Best Supporting Role', remarks: 'Natural acting' },
          { name: 'Dance Competition', achievement: 'Second Prize', remarks: 'Graceful performance' }
        ],
        remarks: {
          classTeacher: 'Jane has shown remarkable progress in all subjects. Her creative talents continue to flourish, and she has made good progress in mathematics as well.',
          principal: 'Jane has had an excellent academic year. Her artistic abilities and improved academic performance make her a well-rounded student.'
        }
      }
    }
  };
  
  // Get current report data
  const currentChild = children.find(child => child.id === selectedChild);
  const currentReport = reportData[selectedChild]?.[selectedTerm];
  
  // Calculate total marks and percentage
  const calculateTotalAndPercentage = () => {
    if (!currentReport) return { total: 0, maxTotal: 0, percentage: 0 };
    
    let totalObtained = 0;
    let totalSubjects = 0;
    
    Object.values(currentReport.marks).forEach(mark => {
      totalObtained += mark.total;
      totalSubjects++;
    });
    
    // Assuming each subject is out of 100 for simplicity
    const maxPossible = totalSubjects * 100;
    
    return {
      total: totalObtained,
      maxTotal: maxPossible,
      percentage: (totalObtained / maxPossible) * 100
    };
  };
  
  const stats = calculateTotalAndPercentage();
  
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Report Card</h1>
            <p className="text-muted-foreground">View your child's academic report card</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
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
          
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map(term => (
                <SelectItem key={term.id} value={term.id}>{term.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Report Card */}
        {currentReport && currentChild && (
          <Card className="border-2 border-gray-200">
            <CardHeader className="border-b">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">Report Card</CardTitle>
                  <CardDescription>
                    {terms.find(term => term.id === selectedTerm)?.name} - Academic Year 2024-2025
                  </CardDescription>
                </div>
                <div className="flex items-center justify-end">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-8">
              {/* Student Information */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="text-center md:text-left">
                  <div className="text-5xl mb-2">{currentChild.photo}</div>
                </div>
                <div className="flex-1">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                    <dd className="text-sm font-semibold">{currentChild.name}</dd>
                    <dt className="text-sm font-medium text-muted-foreground">Class</dt>
                    <dd className="text-sm font-semibold">{currentChild.class}</dd>
                    <dt className="text-sm font-medium text-muted-foreground">Section</dt>
                    <dd className="text-sm font-semibold">{currentChild.section}</dd>
                    <dt className="text-sm font-medium text-muted-foreground">Roll Number</dt>
                    <dd className="text-sm font-semibold">{currentChild.rollNumber}</dd>
                  </dl>
                </div>
                
                <div className="flex-1 border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-medium flex items-center mb-2">
                    <Award className="mr-2 h-4 w-4 text-amber-500" />
                    Overall Grade
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{stats.percentage.toFixed(2)}%</div>
                      <p className="text-sm text-muted-foreground">
                        {stats.total} out of {stats.maxTotal} marks
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={stats.percentage >= 90 ? getGradeColor('A+') : 
                                  stats.percentage >= 80 ? getGradeColor('A') :
                                  stats.percentage >= 70 ? getGradeColor('B+') :
                                  stats.percentage >= 60 ? getGradeColor('B') :
                                  stats.percentage >= 50 ? getGradeColor('C+') :
                                  stats.percentage >= 40 ? getGradeColor('C') :
                                  getGradeColor('F')
                        }
                      >
                        {stats.percentage >= 90 ? 'A+' : 
                         stats.percentage >= 80 ? 'A' :
                         stats.percentage >= 70 ? 'B+' :
                         stats.percentage >= 60 ? 'B' :
                         stats.percentage >= 50 ? 'C+' :
                         stats.percentage >= 40 ? 'C' : 'F'
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Attendance */}
              <div className="border rounded-lg p-4 bg-slate-50">
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Attendance
                </h3>
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Working Days:</span>{' '}
                    <span className="font-medium">{currentReport.attendance.total}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Days Present:</span>{' '}
                    <span className="font-medium">{currentReport.attendance.present}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Attendance:</span>{' '}
                    <span className="font-medium">{currentReport.attendance.percentage}%</span>
                  </div>
                </div>
              </div>
              
              {/* Academic Performance */}
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Academic Performance
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-right">Theory</TableHead>
                        <TableHead className="text-right">Practical</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map(subject => {
                        const mark = currentReport.marks[subject];
                        if (!mark) return null;
                        
                        return (
                          <TableRow key={subject}>
                            <TableCell className="font-medium">{subject}</TableCell>
                            <TableCell className="text-right">{mark.theory}</TableCell>
                            <TableCell className="text-right">{mark.practical}</TableCell>
                            <TableCell className="text-right font-medium">{mark.total}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getGradeColor(mark.grade)}>
                                {mark.grade}
                              </Badge>
                            </TableCell>
                            <TableCell>{mark.remarks}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Co-curricular Activities */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <Smile className="mr-2 h-4 w-4" />
                  Co-curricular Activities
                </h3>
                {currentReport.activities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentReport.activities.map((activity, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-muted-foreground">Achievement: {activity.achievement}</div>
                        <div className="text-sm">{activity.remarks}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No co-curricular activities recorded.</p>
                )}
              </div>
              
              {/* Remarks */}
              <div className="space-y-4">
                <h3 className="font-medium">Remarks</h3>
                <div className="border p-4 rounded-md bg-slate-50">
                  <p className="text-sm font-medium">Class Teacher's Remarks</p>
                  <p className="mt-1">{currentReport.remarks.classTeacher}</p>
                </div>
                
                <div className="border p-4 rounded-md bg-slate-50">
                  <p className="text-sm font-medium">Principal's Remarks</p>
                  <p className="mt-1">{currentReport.remarks.principal}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-4">
              <div className="mb-4 sm:mb-0">
                <div className="text-sm text-muted-foreground">Date of Issue</div>
                <div className="font-medium">May 15, 2025</div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-sm text-muted-foreground mb-1">Principal's Signature</div>
                <div className="italic font-medium">A. Kumar</div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ChildReport;
