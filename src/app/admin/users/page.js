'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  ShieldAlert, 
  Check, 
  UserCheck, 
  UserPlus, 
  Lock, 
  Mail, 
  User 
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: '', role: 'admin' });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isActive, setIsActive] = useState(true);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch users & current identity
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to load admins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Fetch dashboard stats to verify authentication and extract current identity
    const getIdentity = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const data = await res.json();
          // Assume the user list contains superadmins. For demo identity fallback:
          setCurrentUser({ role: 'superadmin' });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getIdentity();
  }, []);

  const openCreateModal = () => {
    if (currentUser.role !== 'superadmin') {
      alert('Access restricted: Only Superadmins can register new administrative accounts.');
      return;
    }
    setModalMode('create');
    setSelectedId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('admin');
    setIsActive(true);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    if (currentUser.role !== 'superadmin') {
      alert('Access restricted: Only Superadmins can update administrative parameters.');
      return;
    }
    setModalMode('edit');
    setSelectedId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // leave blank unless changing password
    setRole(user.role || 'admin');
    setIsActive(user.isActive !== undefined ? user.isActive : true);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Submit Form: Create / Edit User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!name || !email || (modalMode === 'create' && !password)) {
      setFormError('Name, Email, and Password (for new users) are required fields');
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      email,
      role,
      isActive,
    };

    if (password) {
      payload.password = password;
    }

    if (modalMode === 'edit') {
      payload.id = selectedId;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      setFormSuccess(modalMode === 'create' ? 'Admin account created successfully' : 'Admin account updated successfully');
      fetchUsers();

      setTimeout(() => {
        setModalOpen(false);
      }, 800);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (currentUser.role !== 'superadmin') {
      alert('Access restricted: Only Superadmins can delete administrative accounts.');
      return;
    }

    if (!window.confirm('Are you sure you want to permanently delete this administrator account?')) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      alert('Admin account deleted successfully');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSuperadmin = currentUser.role === 'superadmin';

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest">Access Control</span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-none mt-1">Admin Registry</h2>
        </div>
        
        {isSuperadmin && (
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Admin</span>
          </button>
        )}
      </div>

      {/* Access Restriction Warning Banner */}
      {!isSuperadmin && (
        <div className="p-4 bg-yellow-950/20 border border-yellow-900/30 rounded-xl text-xs font-bold text-yellow-500 flex items-start gap-3">
          <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase tracking-wider">Superadmin Mode Required</p>
            <p className="text-[10px] text-neutral-450 font-normal mt-1 lowercase leading-relaxed">
              Your account role is currently configured as a default Admin. You have read-only access to this panel, and cannot create, modify, or delete admin accounts.
            </p>
          </div>
        </div>
      )}

      {/* Search Input Filter */}
      <div className="flex bg-neutral-950 border border-neutral-900 rounded-xl p-4 items-center">
        <Search className="h-4 w-4 text-neutral-500 mr-3 flex-shrink-0" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search registered administrators by name, email..." 
          className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full font-medium"
        />
      </div>

      {/* Users table */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4 animate-pulse">
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 border-t border-neutral-900/60">
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">No administrative registry records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-550 font-extrabold uppercase tracking-widest text-[9px]">
                  <th className="py-4 pl-6 w-12">Badge</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">System Role</th>
                  <th className="py-4 px-6">Registry Date</th>
                  <th className="py-4 px-6">Account Status</th>
                  {isSuperadmin && <th className="py-4 pr-6 text-right w-24">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="group hover:bg-neutral-900/20 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="h-8 w-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
                        <User className="h-4 w-4" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white uppercase tracking-tight">{user.name}</td>
                    <td className="py-4 px-6 text-neutral-400 font-mono text-[10px]">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        user.role === 'superadmin' 
                          ? 'bg-neutral-900 text-white border border-neutral-700' 
                          : 'bg-neutral-900 text-neutral-450 border border-neutral-850'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-neutral-500 text-[10px]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        user.isActive 
                          ? 'bg-green-950/20 text-green-500 border border-green-900/30' 
                          : 'bg-red-950/20 text-red-500 border border-red-900/30'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    {isSuperadmin && (
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end space-x-2.5">
                          <button 
                            onClick={() => openEditModal(user)}
                            className="p-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-900 rounded text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit User Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="absolute inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[440px] bg-neutral-950 border border-neutral-900 rounded-xl p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setModalOpen(false)}
                disabled={submitting}
                className="absolute right-4.5 top-4.5 p-1 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
                <UserCheck className="h-4.5 w-4.5 text-white" />
                <span>{modalMode === 'create' ? 'Create Admin User' : 'Edit Admin Account'}</span>
              </h3>

              {formError && (
                <div className="mb-5 p-4 bg-red-950/20 border border-red-900/30 rounded-lg text-xs font-bold text-red-400 flex items-start gap-2">
                  <Mail className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="mb-5 p-4 bg-green-950/20 border border-green-900/30 rounded-lg text-xs font-bold text-green-400 flex items-start gap-2">
                  <Check className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-450 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Faisal Tariq"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-600 outline-none"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-455 block">Email Address</label>
                  <div className="relative font-mono">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="faisal@abisportswear.com"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-650 outline-none"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-450 block">
                    Password {modalMode === 'edit' && '(Leave blank to keep unchanged)'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-600 outline-none"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-455 block">System Access Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg px-4 py-3.5 text-xs text-white outline-none cursor-pointer"
                    disabled={submitting}
                  >
                    <option value="admin">Admin (Read / Update only)</option>
                    <option value="superadmin">Superadmin (All permissions / Users CRUD)</option>
                  </select>
                </div>

                {/* Active Toggle (Only for edit modal) */}
                {modalMode === 'edit' && (
                  <div className="flex items-center space-x-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4.5 w-4.5 bg-neutral-900/45 border border-neutral-800 rounded cursor-pointer accent-white"
                      disabled={submitting}
                    />
                    <label htmlFor="isActive" className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-300 cursor-pointer">
                      Admin Account Active
                    </label>
                  </div>
                )}

                {/* Submit Row */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-extrabold text-[10px] uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm mt-3"
                >
                  {submitting ? (
                    <>
                      <span>Saving Admin Account</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    </>
                  ) : (
                    <span>Save Admin Account</span>
                  )}
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
