import React from 'react';
import { Award } from 'lucide-react';

export function PrizesPage() {
  return (
    <section id="prizes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hadiah & Penghargaan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Esai terbaik layak mendapat penghargaan terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Juara Pertama</h3>
            <p className="text-3xl font-bold text-yellow-600 mb-4">Rp 30.000.000</p>
            <ul className="text-gray-600 space-y-2">
              <li>Beasiswa universitas</li>
              <li>Trofi dan sertifikat</li>
              <li>Kesempatan publikasi</li>
              <li>Program mentoring</li>
            </ul>
          </div>

          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Juara Kedua</h3>
            <p className="text-3xl font-bold text-gray-600 mb-4">Rp 22.500.000</p>
            <ul className="text-gray-600 space-y-2">
              <li>Beasiswa universitas</li>
              <li>Trofi dan sertifikat</li>
              <li>Akses workshop menulis</li>
              <li>Upacara penghargaan</li>
            </ul>
          </div>

          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Juara Ketiga</h3>
            <p className="text-3xl font-bold text-amber-600 mb-4">Rp 15.000.000</p>
            <ul className="text-gray-600 space-y-2">
              <li>Beasiswa universitas</li>
              <li>Trofi dan sertifikat</li>
              <li>Sumber daya menulis</li>
              <li>Upacara penghargaan</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Penghargaan Tambahan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Juara Harapan (5 pemenang)</h4>
              <p className="text-gray-600">Rp 3.000.000 masing-masing + Sertifikat</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pilihan Favorit</h4>
              <p className="text-gray-600">Rp 4.500.000 + Penghargaan khusus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
