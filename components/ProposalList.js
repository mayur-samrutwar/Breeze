import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProposalList({ proposals, onSelect, selectedProposalId }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Proposals</h2>
      {proposals.map((proposal) => (
        <Card 
          key={proposal.id} 
          className={cn(
            "cursor-pointer hover:shadow-md transition-shadow",
            selectedProposalId === proposal.id ? "ring-2 ring-blue-500" : ""
          )}
          onClick={() => onSelect(proposal)}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm">{proposal.title}</h3>
            <div className="flex justify-between items-center">
              <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
              <span className="text-xs text-gray-500">{proposal.submissionDate}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}