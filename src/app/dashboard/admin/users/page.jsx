'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await authClient.admin.listUsers();
            setUsers(res.data?.users || []);
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        await authClient.admin.setRole({ userId, role: newRole });
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setConfirm(null);
    };

    return (
        <div className="p-8 bg-[#0f0f0f] text-white min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-gray-400 mt-1">Review, filter, and manage platform access for all users.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Active Users', value: '12,842', sub: '+12% vs last month' },
                    { label: 'Recruiter Growth', value: '843', sub: 'High demand' },
                    { label: 'Suspended Accounts', value: '124', sub: '0.8% of total' },
                    { label: 'New Signups (24h)', value: '42', sub: 'Steady activity' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <h2 className="text-3xl font-bold my-2">{stat.value}</h2>
                        <p className="text-green-500 text-sm">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <input 
                    type="text" 
                    placeholder="Search by email..." 
                    className="bg-[#1a1a1a] border border-gray-700 px-4 py-2 rounded-md w-64 text-sm"
                />
                <div className="flex gap-4">
                    <button className="border border-gray-700 px-4 py-2 rounded-md text-sm">All Roles</button>
                    <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">Export List</button>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1f1f1f]">
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="p-4">User Name</th>
                            <th className="p-4">Email Address</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Join Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-xs">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    {user.name}
                                </td>
                                <td className="p-4 text-gray-300">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td className="p-4 text-gray-400">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.banned ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                                        {user.banned ? 'Suspended' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-sm flex gap-2 justify-end items-center">
                                    <div className="flex gap-1">
                                        {['admin', 'recruiter', 'seeker'].map(role => (
                                            <button
                                                key={role}
                                                onClick={() => user.role !== role && setConfirm({ user, role })}
                                                className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                                                    user.role === role
                                                        ? 'bg-blue-600 text-white cursor-default'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="text-red-500 hover:underline text-xs ml-2">
                                        {user.banned ? 'Activate' : 'Suspend'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer Pagination */}
                <div className="p-4 text-gray-500 text-sm flex justify-between items-center">
                    <span>Showing 1 to 4 of 12,842 users</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-700 rounded">{'<'}</button>
                        <button className="px-3 py-1 bg-gray-700 rounded">1</button>
                        <button className="px-3 py-1 border border-gray-700 rounded">2</button>
                        <span>...</span>
                        <button className="px-3 py-1 border border-gray-700 rounded">1285</button>
                        <button className="px-3 py-1 border border-gray-700 rounded">{'>'}</button>
                    </div>
                </div>
            </div>
            {confirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <h3 className="text-lg font-semibold mb-2">Confirm Role Change</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Change <span className="text-white font-medium">{confirm.user.name}</span>&#39;s role
                            from <span className="text-yellow-400 capitalize">{confirm.user.role}</span> to
                            <span className="text-blue-400 capitalize"> {confirm.role}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirm(null)}
                                className="px-4 py-2 rounded text-sm bg-gray-700 hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleRoleChange(confirm.user.id, confirm.role)}
                                className="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-500"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;