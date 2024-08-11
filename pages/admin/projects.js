import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from 'lucide-react';
import NewGrantProgramForm from '../../components/NewGrantProgramForm';

const DUMMY_PROGRAMS = [
  { id: 1, name: "Environmental Research Grant", status: "Active", applications: 25, budget: 500000 },
  { id: 2, name: "Tech Innovation Fund", status: "Active", applications: 50, budget: 1000000 },
  { id: 3, name: "Community Development Grant", status: "Closed", applications: 30, budget: 750000 },
  { id: 4, name: "Healthcare Innovation Grant", status: "Active", applications: 40, budget: 1200000 },
];

export default function AdminProjectsPage() {
  const [showNewGrantForm, setShowNewGrantForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAndSortedPrograms = DUMMY_PROGRAMS
    .filter(program => program.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(program => filterStatus === 'all' || program.status.toLowerCase() === filterStatus)
    .sort((a, b) => a[sortBy].toString().localeCompare(b[sortBy].toString()));

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Grant Programs</h1>
        <Button onClick={() => setShowNewGrantForm(true)} className="text-xs">
          <Plus className="h-3 w-3 mr-1" /> Create New Grant Program
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-xs h-8"
              />
            </div>
            <div className="flex space-x-2">
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger className="w-[140px] text-xs h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterStatus} defaultValue={filterStatus}>
                <SelectTrigger className="w-[140px] text-xs h-8">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedPrograms.map(program => (
          <Card key={program.id} className="overflow-hidden">
            <CardHeader className="p-4 bg-gray-50">
              <CardTitle className="text-sm font-medium">{program.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant={program.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                  {program.status}
                </Badge>
                <span className="text-xs text-gray-500">{program.applications} applications</span>
              </div>
              <p className="text-sm font-semibold mb-4">${program.budget.toLocaleString()}</p>
              <Button variant="outline" size="sm" className="w-full text-xs">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showNewGrantForm && (
        <NewGrantProgramForm onClose={() => setShowNewGrantForm(false)} />
      )}
    </div>
  );
}