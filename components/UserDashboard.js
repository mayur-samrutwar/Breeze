import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GrantCard from './GrantCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const DUMMY_GRANTS = [
  { id: 1, name: "Environmental Research Grant", maxSize: 50000, totalProposals: 25, acceptedProposals: 10, logoUrl: "/logos/env-research.png" },
  { id: 2, name: "Tech Innovation Fund", maxSize: 100000, totalProposals: 50, acceptedProposals: 15, logoUrl: "/logos/tech-innovation.png" },
  { id: 3, name: "Community Development Initiative", maxSize: 75000, totalProposals: 30, acceptedProposals: 8, logoUrl: "/logos/community-dev.png" },
  { id: 4, name: "Healthcare Innovation Grant", maxSize: 120000, totalProposals: 40, acceptedProposals: 12, logoUrl: "/logos/healthcare-innovation.png" },
];

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  const filteredGrants = DUMMY_GRANTS.filter(grant => 
    grant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterOption === 'all' || 
     (filterOption === 'high' && grant.maxSize >= 100000) ||
     (filterOption === 'medium' && grant.maxSize >= 50000 && grant.maxSize < 100000) ||
     (filterOption === 'low' && grant.maxSize < 50000))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">Discover Grant Opportunities</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect funding for your innovative projects and groundbreaking research.
        </p>
      </div>

      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for grants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          <Select value={filterOption} onValueChange={setFilterOption}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter Grants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grants</SelectItem>
              <SelectItem value="high">High Budget ($100k+)</SelectItem>
              <SelectItem value="medium">Medium Budget ($50k-$100k)</SelectItem>
              <SelectItem value="low">Low Budget (&lt;$50k)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrants.map(grant => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </div>

      {filteredGrants.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">No grants found. Try adjusting your search or filter.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Explore All Grants
        </Button>
      </div>
    </div>
  );
}