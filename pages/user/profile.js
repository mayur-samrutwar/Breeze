import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, ArrowLeft } from 'lucide-react';

export default function UserProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate researcher and grant applicant.',
    githubConnected: false,
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
    console.log('Updated profile:', profile);
    setIsEditing(false);
  };

  const handleConnectGithub = () => {
    // Implement GitHub OAuth flow here
    console.log('Connecting to GitHub...');
    setProfile(prevProfile => ({ ...prevProfile, githubConnected: true }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-blue-100">{profile.email}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" name="bio" value={profile.bio} onChange={handleChange} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><strong>Bio:</strong> {profile.bio}</p>
              <div className="flex justify-between items-center">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                <Button
                  variant={profile.githubConnected ? "outline" : "default"}
                  onClick={handleConnectGithub}
                  className="flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>{profile.githubConnected ? "GitHub Connected" : "Connect GitHub"}</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}