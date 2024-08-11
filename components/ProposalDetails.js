import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProposalDetails({ proposal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{proposal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {proposal.status}</p>
        {/* Add more details as needed */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </CardContent>
    </Card>
  );
}