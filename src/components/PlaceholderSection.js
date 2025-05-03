
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PlaceholderSection = ({ title, description, icon: Icon }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        {Icon && <Icon size={24} className="text-primary" />}
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground text-center">
            This section is under development
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSection;
