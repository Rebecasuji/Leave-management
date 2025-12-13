import { getStoredUsers } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Employees() {
  const users = getStoredUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Employees Directory</h2>
          <p className="text-muted-foreground">Manage employee details and roles</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white focus:border-primary/50"
          />
        </div>
      </div>

      <Card className="bg-card/40 backdrop-blur border-white/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-gray-300">Code</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Department</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-white/5 border-white/10 transition-colors">
                  <TableCell className="font-mono text-primary">{user.code}</TableCell>
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.department || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} className={user.role === 'Admin' ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-white/10 text-gray-300'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-xs text-gray-400">Active</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
