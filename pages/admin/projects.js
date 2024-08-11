import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewGrantProgramForm from '../../components/NewGrantProgramForm';

const DUMMY_PROGRAMS = [
  { id: 1, name: "Environmental Research Grant", status: "Active", applications: 25 },
  { id: 2, name: "Tech Innovation Fund", status: "Active", applications: 50 },
  { id: 3, name: "Community Development Grant", status: "Closed", applications: 30 },
  // Add more dummy data as needed
];

export default function AdminProjectsPage() {
  const [showNewGrantForm, setShowNewGrantForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAndSortedPrograms = DUMMY_PROGRAMS
    .filter(program => program.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(program => filterStatus === 'all' || program.status.toLowerCase() === filterStatus)
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Grant Programs</h1>
      <Button onClick={() => setShowNewGrantForm(true)}>Create New Grant Program</Button>

      {showNewGrantForm && (
        <NewGrantProgramForm onClose={() => setShowNewGrantForm(false)} />
      )}

      <div className="flex space-x-4 my-4">
        <Input
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="applications">Applications</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setFilterStatus} defaultValue={filterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedPrograms.map(program => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {program.status}</p>
              <p>Applications: {program.applications}</p>
              <Button className="mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}