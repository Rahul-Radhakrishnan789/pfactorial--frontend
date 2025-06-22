import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {type User, type UserSelectModalProps } from '@/validation/auth.form.validation';
import LoadingSpinner from '../loader/loader';
import api from '@/utils/api';



const UserSelectModal: React.FC<UserSelectModalProps> = ({ open, onClose, onConfirm }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.users();
        console.log('users',response.data.data);
        setUsers(response?.data?.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchUsers();
  }, [open]);

  const toggleSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedUserIds);
    setSelectedUserIds([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="max-w-md bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Select Users</DialogTitle>
        </DialogHeader>

        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {loading ? (
            <p><LoadingSpinner/></p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="flex items-center space-x-3">
                <Checkbox
                  id={user._id}
                  checked={selectedUserIds.includes(user._id)}
                  onCheckedChange={() => toggleSelection(user._id)}
                />
                <label htmlFor={user._id} className="text-sm">
                  {user.name} ({user.email})
                </label>
              </div>
            ))
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={selectedUserIds.length === 0}>
            Add Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserSelectModal;
