
import React, { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download } from 'lucide-react';

const IdCard = () => {
  const { currentUser } = useAuth();
  const cardRef = useRef(null);

  // Mock data for student ID Card
  const studentData = {
    id: "STU2025001",
    name: currentUser?.name || "Student Name",
    class: "12th Grade",
    section: "A",
    dob: "2007-05-15",
    bloodGroup: "O+",
    address: "123 School Street, Education City",
    contactNumber: "+1234567890",
    email: "student@school.edu",
    validUntil: "2026-03-31",
    session: "2025-26"
  };

  // Function to print ID Card
  const handlePrintIdCard = () => {
    const printContents = cardRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = `
      <html>
        <head>
          <title>Student ID Card</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .id-card { width: 3.375in; height: 2.125in; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
    
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Student ID Card</h1>
        <p className="text-muted-foreground">Your digital school identification card</p>
        
        <div className="flex flex-col items-center">
          <div ref={cardRef} className="id-card w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg border-2 border-primary">
            {/* Header */}
            <div className="bg-primary text-white p-4 text-center">
              <h2 className="text-xl font-bold">Mobile Institute</h2>
              <p className="text-sm">Student Identification Card</p>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Photo placeholder */}
                <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center mx-auto md:mx-0">
                  <span className="text-4xl font-bold text-gray-400">{studentData.name.charAt(0)}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{studentData.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">ID: {studentData.id}</p>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                    <div>
                      <span className="font-medium">Class:</span> {studentData.class}
                    </div>
                    <div>
                      <span className="font-medium">Section:</span> {studentData.section}
                    </div>
                    <div>
                      <span className="font-medium">Blood Group:</span> {studentData.bloodGroup}
                    </div>
                    <div>
                      <span className="font-medium">DOB:</span> {studentData.dob}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Contact:</span> {studentData.contactNumber}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {studentData.email}
                </div>
                <div>
                  <span className="font-medium">Session:</span> {studentData.session}
                </div>
                <div>
                  <span className="font-medium">Valid Until:</span> {studentData.validUntil}
                </div>
              </div>
              
              <div className="text-xs text-center mt-4 text-gray-500">
                If found, please return to Mobile Institute, Educational District, City
              </div>
            </div>
          </div>
          
          <Card className="w-full max-w-md mt-6">
            <CardContent className="pt-6">
              <Button 
                onClick={handlePrintIdCard}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" /> Print / Download ID Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default IdCard;
