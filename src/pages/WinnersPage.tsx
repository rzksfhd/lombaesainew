import React from 'react';
import { Trophy, ExternalLink } from 'lucide-react';
import { WinnerCard } from '../components/WinnerCard';
import { Winner } from '../hooks/useWinners';

interface WinnersPageProps {
  winners: Winner[];
  onScrollToSection: (sectionId: string) => void;
}

export function WinnersPage({ winners, onScrollToSection }: WinnersPageProps) {
  return (
    <section id="winners" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-6 shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pemenang Lomba</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Merayakan bakat dan kreativitas luar biasa dari para pemenang lomba esai 2025
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {winners.map((winner, index) => (
            <WinnerCard key={winner.id} winner={winner} index={index} />
          ))}
        </div>

        {/* Congratulations Message */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Selamat untuk Semua Pemenang!</h3>
            <p className="text-gray-600 mb-6">
              Para siswa luar biasa ini telah menunjukkan kemampuan menulis, kreativitas, dan wawasan yang sangat baik.
              Esai mereka mewakili pencapaian akademik terbaik tingkat SMA dan akan menginspirasi peserta masa depan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://lppm.ut.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Ikuti Lomba Tahun Depan</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => onScrollToSection('downloads')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Baca Esai Pemenang
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
