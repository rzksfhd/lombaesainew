import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, AlertCircle } from 'lucide-react';

interface Terms {
  id: string;
  content: string;
}

export function TermsManager() {
  const [terms, setTerms] = useState<Terms | null>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('terms')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setTerms(data);
        setContent(data.content);
      } else {
        setTerms(null);
        setContent('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load terms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setIsSaving(true);

    try {
      if (terms) {
        const { error: updateError } = await supabase
          .from('terms')
          .update({ content })
          .eq('id', terms.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('terms')
          .insert([{ content }]);

        if (insertError) throw insertError;
      }

      await fetchTerms();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save terms');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Terms Management</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <label className="block text-sm font-medium text-slate-700 mb-4">Terms and Conditions</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none font-mono text-sm"
          rows={15}
          placeholder="Enter terms and conditions here..."
        />
        <p className="mt-4 text-sm text-slate-600">
          {content.length} characters
        </p>
      </div>
    </div>
  );
}
