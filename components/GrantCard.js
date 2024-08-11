import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function GrantCard({ grant }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-200 bg-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img 
              src={'https://github.com/shadcn.png'} 
              alt={`${grant.name} logo`} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{grant.name}</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{grant.totalProposals} Total Proposals</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>{grant.acceptedProposals} Accepted</span>
          </div>
        </div>
        
        <div className="pt-4 flex items-center justify-between border-t border-gray-200">
          <div>
            <span className="text-xs text-gray-500 block">Up to</span>
            <span className="text-xl font-bold text-indigo-600">${grant.maxSize.toLocaleString()}</span>
          </div>
          <Link href={`/user/grants/${grant.id}`} passHref>
            <Button variant="ghost" className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 flex items-center">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}