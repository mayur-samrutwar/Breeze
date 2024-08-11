import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProposalForm({ onClose, grantId }) {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    budget: '',
    duration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('New proposal submitted:', { ...formData, grantId });
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit New Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea id="abstract" name="abstract" value={formData.abstract} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Project Duration (months)</Label>
              <Input id="duration" name="duration" type="number" value={formData.duration} onChange={handleChange} required />
            </div>
            <div className="flex justify-between">
              <Button type="submit">Submit Proposal</Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}