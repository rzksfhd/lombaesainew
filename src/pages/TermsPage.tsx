import React from 'react';
import { FileText } from 'lucide-react';

export function TermsPage() {
  const terms = [
    {
      title: 'Persyaratan Peserta',
      content: 'Terbuka untuk semua siswa SMA (kelas 10-12) yang sedang bersekolah di institusi terakreditasi. Peserta harus berusia 15-18 tahun pada saat pengiriman karya.'
    },
    {
      title: 'Panduan Esai',
      content: 'Esai harus 1.000-1.500 kata, karya asli, dan dikirim dalam format PDF. Pilih dari tiga kategori: Penulisan Kreatif, Penelitian Akademik, atau Dampak Sosial.'
    },
    {
      title: 'Aturan Pengiriman',
      content: 'Satu karya per siswa. Esai harus dikirim melalui portal resmi sebelum batas waktu. Pengiriman terlambat tidak akan diterima dalam keadaan apapun.'
    },
    {
      title: 'Kriteria Penilaian',
      content: 'Esai akan dinilai berdasarkan orisinalitas (25%), kualitas penulisan (25%), penelitian/konten (25%), dan dampak/relevansi (25%).'
    },
    {
      title: 'Hak dan Publikasi',
      content: 'Dengan mengirim karya, peserta memberikan izin untuk menerbitkan esai pemenang dalam antologi tahunan dan di situs web kami dengan atribusi yang tepat.'
    }
  ];

  return (
    <section id="terms" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Syarat & Ketentuan</h2>
          <p className="text-xl text-gray-600">
            Silakan tinjau aturan dan panduan lomba
          </p>
        </div>

        <div className="space-y-6">
          {terms.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
