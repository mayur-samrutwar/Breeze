import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewGrantProgramForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxGrantSize: '',
    deadline: ''
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
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Grant Program</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxGrantSize">Max Grant Size</Label>
              <Input id="maxGrantSize" name="maxGrantSize" type="number" value={formData.maxGrantSize} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
            </div>
            <div className="flex justify-between">
              <Button type="submit">Create Program</Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}