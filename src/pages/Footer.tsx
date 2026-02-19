import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSectionClick: (sectionId: string) => void;
}

export function Footer({ onSectionClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold">Lomba Esai</span>
            </div>
            <p className="text-gray-300">
              Memberdayakan siswa sekolah menengah untuk mengekspresikan suara mereka melalui seni menulis esai.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => onSectionClick('home')} className="hover:text-yellow-400 transition-colors">Beranda</button></li>
              <li><button onClick={() => onSectionClick('winners')} className="hover:text-yellow-400 transition-colors">Pemenang</button></li>
              <li><button onClick={() => onSectionClick('schedule')} className="hover:text-yellow-400 transition-colors">Jadwal</button></li>
              <li><button onClick={() => onSectionClick('prizes')} className="hover:text-yellow-400 transition-colors">Hadiah</button></li>
              <li><a href="https://lppm.ut.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center space-x-1">
                <span>Daftar</span>
                <ExternalLink className="h-3 w-3" />
              </a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="text-gray-300 space-y-2">
              <p>Email: lombaesai@ecampus.ut.ac.id</p>
              <p>Telepon: (021) 123-4567</p>
              <p>Jam Kerja: Sen-Jum 09:00-17:00 WIB</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Lomba Esai. Hak cipta dilindungi. | Kebijakan Privasi | Syarat Layanan</p>
        </div>
      </div>
    </footer>
  );
}
