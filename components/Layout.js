import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
  const router = useRouter();
  const isAdmin = process.env.NEXT_PUBLIC_USER_TYPE === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#fff6e1ff] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <Link href="/" passHref>
            <Button variant="link" className="text-2xl font-semibold">
              <img src="/logo.png" alt="BreezeLabs" className="h-12 w-auto" />
            </Button>
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              {isAdmin ? (
                <>
                  <li>
                    <Link href="/admin" passHref>
                      <Button variant="ghost">Dashboard</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/projects" passHref>
                      <Button variant="ghost">Projects</Button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>

                </li>
              )}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push(isAdmin ? '/admin/profile' : '/user/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow bg-[#fff6e1ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          © 2024 BreezeLabs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}