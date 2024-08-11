import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewGrantProgramForm from './NewGrantProgramForm';

const DUMMY_PROGRAMS = [
  { id: 1, name: "Environmental Research Grant", status: "active" },
  { id: 2, name: "Tech Innovation Fund", status: "active" },
  { id: 3, name: "Community Development Grant", status: "past" },
  // Add more dummy data as needed
];

export default function AdminDashboard() {
  const [showNewGrantForm, setShowNewGrantForm] = useState(false);

  const activePrograms = DUMMY_PROGRAMS.filter(program => program.status === "active");
  const pastPrograms = DUMMY_PROGRAMS.filter(program => program.status === "past");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Button onClick={() => setShowNewGrantForm(true)} className="mb-4">Create New Grant Program</Button>
      
      {showNewGrantForm && <NewGrantProgramForm onClose={() => setShowNewGrantForm(false)} />}

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Programs</TabsTrigger>
          <TabsTrigger value="past">Past Programs</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastPrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}