import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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
    // Backend interaction would go here
  };

  const filteredAndSortedProposals = DUMMY_PROPOSALS
    .filter(proposal => proposal.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="mx-auto px-4 pb-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-sm">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Grants
      </Button>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Award className="h-5 w-5 mr-2 text-indigo-600" />
            {DUMMY_GRANT.name}
          </h1>
          <span className="text-lg font-medium text-indigo-600">Up to ${DUMMY_GRANT.maxSize.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{DUMMY_GRANT.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="mr-4">Total Proposals: {DUMMY_GRANT.totalProposals}</span>
            <span>Accepted: {DUMMY_GRANT.acceptedProposals}</span>
          </div>
          <Button onClick={() => setShowNewProposalForm(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" /> Submit New Proposal
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
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
        <div className="col-span-4 lg:col-span-3">
          <Card className="h-[calc(100vh-16rem)] overflow-y-auto">
            <CardContent className="p-4">
              <ProposalList 
                proposals={filteredAndSortedProposals} 
                onSelect={handleProposalSelect} 
                selectedProposalId={selectedProposal?.id}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-8 lg:col-span-6">
          {selectedProposal ? (
            <ProposalDetails proposal={selectedProposal} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center text-gray-500">
                Select a proposal to view details
              </CardContent>
            </Card>
          )}
        </div>
        <div className="col-span-12 lg:col-span-3">
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