import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Winner {
  id: number;
  name: string;
  placement: string;
  category: string;
  achievement: string;
  profileImage: string;
  prize: string;
  school: string;
  grade: string;
}

export function useWinners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWinners() {
      try {
        const { data, error: fetchError } = await supabase
          .from('winners')
          .select('*')
          .order('placement', { ascending: true });

        if (fetchError) throw fetchError;
        setWinners(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch winners');
        setWinners([
          {
            id: 1,
            name: "...",
            placement: "1",
            category: "Penelitian Akademik",
            achievement: "Solusi Perubahan Iklim Melalui Teknologi",
            profileImage: "https://i.postimg.cc/wTnGKkWG/person.png?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
            prize: "Beasiswa Rp 30.000.000",
            school: "SMA Lincoln",
            grade: "12"
          },
          {
            id: 2,
            name: "Marcus Johnson",
            placement: "2",
            category: "Penulisan Kreatif",
            achievement: "Perpustakaan Terakhir: Sebuah Kisah Dystopia",
            profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
            prize: "Beasiswa Rp 22.500.000",
            school: "Akademi Roosevelt",
            grade: "11"
          },
          {
            id: 3,
            name: "Emma Rodriguez",
            placement: "3",
            category: "Dampak Sosial",
            achievement: "Mendobrak Batasan: Kesadaran Kesehatan Mental",
            profileImage: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
            prize: "Beasiswa Rp 15.000.000",
            school: "SMA Washington",
            grade: "10"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchWinners();
  }, []);

  return { winners, loading, error };
}
