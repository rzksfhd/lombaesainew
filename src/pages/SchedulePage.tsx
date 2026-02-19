import React from 'react';
import { Calendar } from 'lucide-react';

export function SchedulePage() {
  const events = [
    {
      date: '15 Januari 2025',
      title: 'Pendaftaran Dibuka',
      description: 'Mulai perjalanan Anda dengan mendaftar lomba',
      status: 'upcoming'
    },
    {
      date: '28 Februari 2025',
      title: 'Batas Akhir Pendaftaran',
      description: 'Hari terakhir untuk mendaftar dan mengirim dokumen',
      status: 'upcoming'
    },
    {
      date: '15 Maret 2025',
      title: 'Batas Akhir Pengiriman Esai',
      description: 'Batas akhir pengiriman esai (23:59 WIB)',
      status: 'upcoming'
    },
    {
      date: '10 April 2025',
      title: 'Periode Penjurian',
      description: 'Panel ahli meninjau dan mengevaluasi semua karya',
      status: 'upcoming'
    },
    {
      date: '25 April 2025',
      title: 'Pengumuman Pemenang',
      description: 'Pemenang diumumkan dalam upacara penghargaan',
      status: 'upcoming'
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jadwal Lomba</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tetap mengikuti semua tanggal penting dan batas waktu
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>

            {events.map((event, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-sm font-semibold text-blue-600 mb-2">{event.date}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
