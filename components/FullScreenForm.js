import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from 'lucide-react';

export default function FullScreenForm({ onClose, onSubmit, formTitle }) {
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
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{formTitle}</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Proposal Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea id="abstract" name="abstract" value={formData.abstract} onChange={handleChange} required rows={5} />
          </div>
          <div>
            <Label htmlFor="budget">Budget (USD)</Label>
            <Input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="duration">Project Duration (months)</Label>
            <Input id="duration" name="duration" type="number" value={formData.duration} onChange={handleChange} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">Submit Proposal</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}