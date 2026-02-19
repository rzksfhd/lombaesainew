import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { WinnersManager } from '../components/admin/WinnersManager';
import { PrizesManager } from '../components/admin/PrizesManager';
import { ScheduleManager } from '../components/admin/ScheduleManager';
import { TermsManager } from '../components/admin/TermsManager';
import { LogOut } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('winners');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1">
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Competition Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="p-8">
          {activeTab === 'winners' && <WinnersManager />}
          {activeTab === 'prizes' && <PrizesManager />}
          {activeTab === 'schedule' && <ScheduleManager />}
          {activeTab === 'terms' && <TermsManager />}
        </div>
      </div>
    </div>
  );
}
