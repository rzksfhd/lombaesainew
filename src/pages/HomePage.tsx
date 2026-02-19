import React from 'react';
import { Award, Users, FileText, ExternalLink } from 'lucide-react';

interface HomePageProps {
  onScrollToSection: (sectionId: string) => void;
}

export function HomePage({ onScrollToSection }: HomePageProps) {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Lomba Menulis Esai
              <span className="block text-yellow-400">Universitas Terbuka 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Belajar Online, Siapa Takut!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => onScrollToSection('winners')}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Lihat Pemenang
            </button>
            <a
              href="https://lppm.ut.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 inline-flex items-center justify-center space-x-2"
            >
              <span>Daftar Sekarang</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">500+ Peserta</h3>
              <p className="text-blue-100">Bergabunglah dengan siswa dari seluruh Indonesia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Hadiah Rp 75 Juta</h3>
              <p className="text-blue-100">Beasiswa dan hadiah uang tunai</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">3 Kategori</h3>
              <p className="text-blue-100">Kreatif, Akademik, dan Dampak Sosial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
