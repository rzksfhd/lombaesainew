import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface Schedule {
  id: string;
  event_title: string;
  event_date: string;
  event_description: string | null;
  status: string;
}

export function ScheduleManager() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    event_title: '',
    event_date: '',
    event_description: '',
    status: 'UPCOMING'
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('schedule')
        .select('*')
        .order('event_date');

      if (fetchError) throw fetchError;
      setSchedule(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load schedule');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        event_title: formData.event_title,
        event_date: formData.event_date,
        event_description: formData.event_description || null,
        status: formData.status
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from('schedule')
          .update(data)
          .eq('id', editingId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('schedule')
          .insert([data]);

        if (insertError) throw insertError;
      }

      await fetchSchedule();
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({
        event_title: '',
        event_date: '',
        event_description: '',
        status: 'UPCOMING'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
    }
  };

  const handleEdit = (item: Schedule) => {
    setFormData({
      event_title: item.event_title,
      event_date: item.event_date,
      event_description: item.event_description || '',
      status: item.status
    });
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('schedule')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchSchedule();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Schedule Management</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              event_title: '',
              event_date: '',
              event_description: '',
              status: 'UPCOMING'
            });
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isFormOpen && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.event_title}
                onChange={(e) => setFormData({ ...formData, event_title: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              />
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <textarea
              placeholder="Event Description"
              value={formData.event_description}
              onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              rows={3}
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {schedule.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-900 font-medium">{item.event_title}</td>
                <td className="px-6 py-4 text-slate-600">{new Date(item.event_date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    item.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{item.event_description || '-'}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
