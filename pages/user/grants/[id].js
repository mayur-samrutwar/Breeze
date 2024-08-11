import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProposalList from '../../../components/ProposalList';
import ProposalDetails from '../../../components/ProposalDetails';
import Milestones from '../../../components/Milestones';
import FullScreenForm from '../../../components/FullScreenForm';
import { ArrowLeft, Search, Plus, Award } from 'lucide-react';

// Dummy data for demonstration
const DUMMY_GRANT = {
  id: 1,
  name: "Environmental Research Grant",
  maxSize: 50000,
  totalProposals: 25,
  acceptedProposals: 10,
  description: "This grant aims to support innovative environmental research projects that address pressing ecological challenges and promote sustainable practices.",
};

const DUMMY_PROPOSALS = [
  { id: 1, title: "Urban Biodiversity Study", status: "Under Review", submissionDate: "2024-05-15" },
  { id: 2, title: "Renewable Energy in Agriculture", status: "Accepted", submissionDate: "2024-04-20" },
  { id: 3, title: "Ocean Plastic Pollution Mitigation", status: "Rejected", submissionDate: "2024-06-01" },
  { id: 4, title: "Sustainable Water Management Systems", status: "Under Review", submissionDate: "2024-05-28" },
];

export default function GrantDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const handleProposalSelect = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleNewProposalSubmit = (formData) => {
    console.log('New proposal submitted:', formData);
    setShowNewProposalForm(false);
    // Here you would typically send the new proposal data to your backend
    // and update the list of proposals
  };

  const filteredAndSortedProposals = DUMMY_PROPOSALS
    .filter(proposal => proposal.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Grants
      </Button>

      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6" />
            <span>{DUMMY_GRANT.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-2">{DUMMY_GRANT.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-2xl font-bold">${DUMMY_GRANT.maxSize.toLocaleString()} Max Grant</span>
            <Button onClick={() => setShowNewProposalForm(true)} className="bg-white text-blue-600 hover:bg-blue-50">
              <Plus className="mr-2 h-4 w-4" /> Submit New Proposal
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4 my-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="submissionDate">Submission Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <ProposalList 
            proposals={filteredAndSortedProposals} 
            onSelect={handleProposalSelect} 
            selectedProposalId={selectedProposal?.id}
          />
        </div>
        <div className="col-span-6">
          {selectedProposal ? (
            <ProposalDetails proposal={selectedProposal} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Select a proposal to view details
              </CardContent>
            </Card>
          )}
        </div>
        <div className="col-span-3">
          {selectedProposal && <Milestones proposalId={selectedProposal.id} />}
        </div>
      </div>

      {showNewProposalForm && (
        <FullScreenForm
          onClose={() => setShowNewProposalForm(false)}
          onSubmit={handleNewProposalSubmit}
          formTitle="Submit New Proposal"
        />
      )}
    </div>
  );
}