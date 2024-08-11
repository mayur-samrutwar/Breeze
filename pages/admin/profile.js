import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Grant Program Manager',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{profile.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" value={profile.role} onChange={handleChange} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}