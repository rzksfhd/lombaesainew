import React, { useState } from 'react';
import { Trophy, Medal, Award, Star, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Winner } from '../hooks/useWinners';

interface WinnerCardProps {
  winner: Winner;
  index: number;
}

export function WinnerCard({ winner, index }: WinnerCardProps) {
  const [shareDropdown, setShareDropdown] = useState(false);

  const getPlacementIcon = (placement: string) => {
    switch (placement) {
      case '1':
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case '2':
        return <Medal className="h-8 w-8 text-gray-500" />;
      case '3':
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return <Star className="h-8 w-8 text-blue-500" />;
    }
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case '1':
        return 'from-yellow-400 to-yellow-600';
      case '2':
        return 'from-gray-400 to-gray-600';
      case '3':
        return 'from-amber-500 to-amber-700';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const handleShare = (platform: string) => {
    const text = `Selamat kepada ${winner.name} yang meraih juara ${winner.placement} dalam Lomba Menulis Esai SMA 2025!`;
    const url = window.location.href;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Tautan berhasil disalin ke clipboard!');
        break;
    }
    setShareDropdown(false);
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        winner.placement === '1' ? 'lg:scale-110 lg:z-10' : ''
      }`}
      style={{
        animationDelay: `${index * 200}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }}
    >
      {/* Placement Badge */}
      <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${getPlacementColor(winner.placement)} rounded-full flex items-center justify-center shadow-lg z-10`}>
        <span className="text-white font-bold text-lg">{winner.placement}</span>
      </div>

      {/* Share Button */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <button
            onClick={() => setShareDropdown(!shareDropdown)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors duration-200"
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>

          {shareDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Bagikan ke Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                <span>Bagikan ke Twitter</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span>Bagikan ke LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <Copy className="h-4 w-4 text-gray-600" />
                <span>Salin Tautan</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={winner.profileImage}
          alt={winner.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Winner Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getPlacementIcon(winner.placement)}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{winner.name}</h3>
              <p className="text-sm text-gray-600">{winner.school} • Kelas {winner.grade}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
              {winner.category}
            </span>
            <h4 className="font-semibold text-gray-900 text-sm leading-tight">
              {winner.achievement}
            </h4>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hadiah</span>
              <span className="font-bold text-green-600">{winner.prize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getPlacementColor(winner.placement)}`}></div>
    </div>
  );
}
