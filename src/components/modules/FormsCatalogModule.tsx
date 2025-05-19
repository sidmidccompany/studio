"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '@/components/providers/app-provider';

interface FormDefinition {
  id: string;
  title: string;
  description: string;
}

const forms: FormDefinition[] = [
  {
    id: 'fertilizerLicense',
    title: "Fertilizer Sale License Application",
    description: "Application for obtaining new letter of Authorization (Sale License) for Self Manufactured/Imported fertilizers."
  },
  {
    id: 'formA1',
    title: "Form A1 - Memorandum of Intimation",
    description: "Declaration form as per clause 8(2) of FCO 1985 for fertilizer registration."
  },
  {
    id: 'inspectionFertilizer',
    title: "Fertilizer Manufacturing Inspection Report",
    description: "Inspection report for fertilizer manufacturing units."
  },
  {
    id: 'formV',
    title: "Form V - Inspector Forms",
    description: "Forms used by insecticide inspectors for sample collection, seizure notices, etc."
  },
  {
    id: 'formIV',
    title: "Form IV - Insecticide Analyst Report",
    description: "Standard report format for analysis of insecticide samples by analysts."
  },
  {
    id: 'inspectionInsecticide',
    title: "Insecticide Manufacturing Inspection",
    description: "Proforma for inspection of insecticides manufacturing units."
  }
];

interface FormCardProps extends FormDefinition {
  onClick: () => void;
}

const FormItemCard: React.FC<FormCardProps> = ({ title, description, onClick }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0">
        <Button onClick={onClick} variant="outline" className="w-full">
          Fill Form <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

const FormsCatalogModule: React.FC = () => {
  const { navigateToForm } = useAppContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Forms Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map(form => (
          <FormItemCard
            key={form.id}
            {...form}
            onClick={() => navigateToForm(form.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FormsCatalogModule;
