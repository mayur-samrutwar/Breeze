import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Edit, Key, Shield, Bell, Activity } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Grant Program Manager',
    lastLogin: '2024-08-10 14:30:00',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

  const recentActivity = [
    { id: 1, action: 'Logged in', time: '2 hours ago' },
    { id: 2, action: 'Updated grant program', time: '1 day ago' },
    { id: 3, action: 'Reviewed application', time: '3 days ago' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Profile Information</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://api.dicebear.com/8.x/lorelei/svg" alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input id="name" name="name" value={profile.name} onChange={handleChange} className="text-sm h-8" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} className="text-sm h-8" />
                </div>
                <div>
                  <Label htmlFor="role" className="text-xs">Role</Label>
                  <Input id="role" name="role" value={profile.role} onChange={handleChange} className="text-sm h-8" />
                </div>
                <Button type="submit" size="sm" className="text-xs">Save Changes</Button>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Email:</span> {profile.email}</p>
                <p className="text-sm"><span className="font-medium">Role:</span> {profile.role}</p>
                <p className="text-sm"><span className="font-medium">Last Login:</span> {profile.lastLogin}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="2fa" className="text-sm">Two-Factor Authentication</Label>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="notifications" className="text-sm">Email Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Shield className="h-3 w-3 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="text-sm flex items-center">
                    <Activity className="h-3 w-3 mr-2 text-gray-400" />
                    <span>{activity.action}</span>
                    <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}