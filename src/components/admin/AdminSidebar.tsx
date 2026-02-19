import React from 'react';
import { Users, Gift, Calendar, FileText } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const tabs = [
    { id: 'winners', label: 'Winners', icon: Users },
    { id: 'prizes', label: 'Prizes', icon: Gift },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'terms', label: 'Terms', icon: FileText }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      <nav className="p-4 space-y-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
