import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface Winner {
  id: string;
  name: string;
  school: string;
  grade: number | null;
  category_id: string;
  placement_type: string;
  placement_order: number;
  prize: string | null;
  achievement: string | null;
}

interface Category {
  id: string;
  name: string;
}

export function WinnersManager() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    grade: '',
    category_id: '',
    placement_type: 'WINNER',
    placement_order: 1,
    prize: '',
    achievement: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [winnersRes, categoriesRes] = await Promise.all([
        supabase.from('winners').select('*').order('placement_order'),
        supabase.from('categories').select('id, name')
      ]);

      if (winnersRes.error) throw winnersRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setWinners(winnersRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!user) throw new Error('Not authenticated');

      const data = {
        ...formData,
        grade: formData.grade ? parseInt(formData.grade) : null,
        placement_order: parseInt(formData.placement_order),
        created_by: user.id
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from('winners')
          .update(data)
          .eq('id', editingId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('winners')
          .insert([data]);

        if (insertError) throw insertError;
      }

      await fetchData();
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        school: '',
        grade: '',
        category_id: '',
        placement_type: 'WINNER',
        placement_order: 1,
        prize: '',
        achievement: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save winner');
    }
  };

  const handleEdit = (winner: Winner) => {
    setFormData({
      name: winner.name,
      school: winner.school,
      grade: winner.grade?.toString() || '',
      category_id: winner.category_id,
      placement_type: winner.placement_type,
      placement_order: winner.placement_order,
      prize: winner.prize || '',
      achievement: winner.achievement || ''
    });
    setEditingId(winner.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this winner?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('winners')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete winner');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Winners Management</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              school: '',
              grade: '',
              category_id: '',
              placement_type: 'WINNER',
              placement_order: 1,
              prize: '',
              achievement: ''
            });
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-5 h-5" />
          Add Winner
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
            {editingId ? 'Edit Winner' : 'Add New Winner'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="School"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              />
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={formData.placement_type}
                onChange={(e) => setFormData({ ...formData, placement_type: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              >
                <option value="WINNER">Winner</option>
                <option value="FINALIST">Finalist</option>
                <option value="PARTICIPANT">Participant</option>
              </select>
              <input
                type="number"
                placeholder="Placement Order"
                value={formData.placement_order}
                onChange={(e) => setFormData({ ...formData, placement_order: parseInt(e.target.value) })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Prize"
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              />
            </div>
            <textarea
              placeholder="Achievement"
              value={formData.achievement}
              onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">School</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Prize</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {winners.map(winner => (
              <tr key={winner.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-900">{winner.name}</td>
                <td className="px-6 py-4 text-slate-600">{winner.school}</td>
                <td className="px-6 py-4 text-slate-600">{getCategoryName(winner.category_id)}</td>
                <td className="px-6 py-4 text-slate-600">{winner.placement_type}</td>
                <td className="px-6 py-4 text-slate-600">{winner.prize || '-'}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(winner)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(winner.id)}
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
