import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, ArrowLeft, Edit, CheckCircle, Clock } from 'lucide-react';

// Dummy data for user applications
const DUMMY_APPLICATIONS = [
  { id: 1, grantName: "Environmental Research Grant", status: "Submitted", date: "2024-05-15" },
  { id: 2, grantName: "Tech Innovation Fund", status: "In Progress", date: "2024-06-01" },
  { id: 3, grantName: "Community Development Grant", status: "Accepted", date: "2024-04-20" },
];

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
    console.log('Connecting to GitHub...');
    setProfile(prevProfile => ({ ...prevProfile, githubConnected: true }));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 text-xs" onClick={() => router.back()}>
        <ArrowLeft className="mr-1 h-3 w-3" /> Back
      </Button>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg" alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold">{profile.name}</h1>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-xs">Name</Label>
                    <Input id="name" name="name" value={profile.name} onChange={handleChange} className="text-sm h-8" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs">Email</Label>
                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} className="text-sm h-8" />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-xs">Bio</Label>
                    <Input id="bio" name="bio" value={profile.bio} onChange={handleChange} className="text-sm h-8" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="submit" size="sm" className="text-xs">Save</Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="text-xs">Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs"><strong>Bio:</strong> {profile.bio}</p>
                  <Button onClick={() => setIsEditing(true)} size="sm" className="text-xs">
                    <Edit className="mr-1 h-3 w-3" /> Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <Button
            variant={profile.githubConnected ? "outline" : "default"}
            onClick={handleConnectGithub}
            className="mt-4 w-full text-xs h-8 flex items-center justify-center"
          >
            <Github className="mr-1 h-3 w-3" />
            <span>{profile.githubConnected ? "GitHub Connected" : "Connect GitHub"}</span>
          </Button>
        </div>
        <div className="col-span-8">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">My Applications</h2>
              <div className="space-y-2">
                {DUMMY_APPLICATIONS.map(app => (
                  <div key={app.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <div>
                      <h3 className="text-sm font-medium">{app.grantName}</h3>
                      <p className="text-xs text-gray-500">{app.date}</p>
                    </div>
                    <div className="flex items-center">
                      {app.status === "Accepted" && <CheckCircle className="h-4 w-4 text-green-500 mr-1" />}
                      {app.status === "In Progress" && <Clock className="h-4 w-4 text-yellow-500 mr-1" />}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === "Accepted" ? "bg-green-100 text-green-800" :
                        app.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}