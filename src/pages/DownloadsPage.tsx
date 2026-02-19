import React from 'react';
import { Download, FileText, Award, CheckCircle, ExternalLink } from 'lucide-react';

export function DownloadsPage() {
  const files = [
    {
      title: 'Panduan Lomba',
      description: 'Aturan lengkap, persyaratan format, dan proses pengiriman',
      fileType: 'PDF',
      size: '2.1 MB',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Template Esai',
      description: 'Template yang sudah diformat dengan margin dan gaya yang tepat',
      fileType: 'DOCX',
      size: '45 KB',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Panduan Penelitian',
      description: 'Cara melakukan penelitian dan mengutip sumber dengan benar',
      fileType: 'PDF',
      size: '1.8 MB',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Panduan Tips Menulis',
      description: 'Saran ahli untuk membuat esai yang menarik',
      fileType: 'PDF',
      size: '3.2 MB',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Pemenang Sebelumnya',
      description: 'Contoh esai dari pemenang lomba sebelumnya',
      fileType: 'PDF',
      size: '5.7 MB',
      icon: <Award className="h-6 w-6" />
    },
    {
      title: 'Daftar Periksa Pengiriman',
      description: 'Daftar periksa praktis untuk memastikan pengiriman lengkap',
      fileType: 'PDF',
      size: '120 KB',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  return (
    <section id="downloads" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unduh Sumber Daya</h2>
          <p className="text-xl text-gray-600">
            Semua yang Anda butuhkan untuk menyiapkan esai pemenang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-blue-600 group-hover:text-blue-700">
                  {file.icon}
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{file.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{file.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{file.fileType}</span>
                <span>{file.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
