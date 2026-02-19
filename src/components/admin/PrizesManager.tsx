import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface Prize {
  id: string;
  placement_type: string;
  placement_order: number;
  prize_amount: number | null;
  benefits: string | null;
}

export function PrizesManager() {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    placement_type: 'WINNER',
    placement_order: 1,
    prize_amount: '',
    benefits: ''
  });

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('prizes')
        .select('*')
        .order('placement_order');

      if (fetchError) throw fetchError;
      setPrizes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prizes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        placement_type: formData.placement_type,
        placement_order: parseInt(formData.placement_order),
        prize_amount: formData.prize_amount ? parseInt(formData.prize_amount) : null,
        benefits: formData.benefits || null
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from('prizes')
          .update(data)
          .eq('id', editingId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('prizes')
          .insert([data]);

        if (insertError) throw insertError;
      }

      await fetchPrizes();
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({
        placement_type: 'WINNER',
        placement_order: 1,
        prize_amount: '',
        benefits: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save prize');
    }
  };

  const handleEdit = (prize: Prize) => {
    setFormData({
      placement_type: prize.placement_type,
      placement_order: prize.placement_order,
      prize_amount: prize.prize_amount?.toString() || '',
      benefits: prize.benefits || ''
    });
    setEditingId(prize.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this prize?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('prizes')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchPrizes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete prize');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Prizes Management</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              placement_type: 'WINNER',
              placement_order: 1,
              prize_amount: '',
              benefits: ''
            });
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-5 h-5" />
          Add Prize
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
            {editingId ? 'Edit Prize' : 'Add New Prize'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                type="number"
                placeholder="Prize Amount"
                value={formData.prize_amount}
                onChange={(e) => setFormData({ ...formData, prize_amount: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
              />
            </div>
            <textarea
              placeholder="Benefits"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Order</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Benefits</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {prizes.map(prize => (
              <tr key={prize.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-900 font-medium">{prize.placement_type}</td>
                <td className="px-6 py-4 text-slate-600">{prize.placement_order}</td>
                <td className="px-6 py-4 text-slate-600">{prize.prize_amount ? `$${prize.prize_amount}` : '-'}</td>
                <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{prize.benefits || '-'}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(prize)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prize.id)}
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
