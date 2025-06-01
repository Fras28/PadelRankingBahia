import React from 'react';

// --- Interfaces (idealmente importadas de un archivo de tipos compartido) ---
interface IEstadisticas {
  partidosJugados?: number;
  partidosGanados?: number;
  torneosJugados?: number;
  torneosGanados?: number;
}

interface IJugador {
  id?: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  rankingGeneral?: number;
  estadisticas?: IEstadisticas;
  historialRanking?: any;
  club?: { id: number; nombre: string; logo?: string };
  categoriaPrincipal?: { id: number; nombre: string; };
}

// --- Props del Componente ---
interface PlayerStatisticsCardProps {
  player: IJugador;
  rankInCategory?: number; // Nueva prop para indicar el ranking en su categoría
}

const PlayerStatisticsCard: React.FC<PlayerStatisticsCardProps> = ({ player, rankInCategory }) => {
  const stats = player.estadisticas || {};
  const {
    partidosJugados = 0,
    partidosGanados = 0,
    torneosJugados = 0,
    torneosGanados = 0,
  } = stats;

  const winRate = partidosJugados > 0
    ? ((partidosGanados / partidosJugados) * 100).toFixed(1)
    : '0.0';

  // Determinar estilo basado en el ranking de categoría
  let rankingTier: 'gold' | 'silver' | null = null;
  if (rankInCategory === 1) rankingTier = 'gold';
  else if (rankInCategory === 2) rankingTier = 'silver';

  let cardBorderColor = 'border-green-400'; // Default
  let titleColor = 'text-green-700'; // Default
  let tierBadgeText: string | null = null;
  let tierBadgeBgColor = '';
  let tierBadgeTextColor = 'text-white';

  if (rankingTier === 'gold') {
    cardBorderColor = 'border-yellow-400 shadow-yellow-300/50';
    titleColor = 'text-yellow-600';
    tierBadgeText = 'TOP 1 CATEGORÍA';
    tierBadgeBgColor = 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500';
    tierBadgeTextColor = 'text-black';
  } else if (rankingTier === 'silver') {
    cardBorderColor = 'border-gray-400 shadow-gray-300/50';
    titleColor = 'text-gray-600';
    tierBadgeText = 'TOP 2 CATEGORÍA';
    tierBadgeBgColor = 'bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500';
  }

  return (
    <div className={`bg-white rounded-xl shadow-xl p-6 flex flex-col items-center border-b-8 ${cardBorderColor} max-w-sm mx-auto my-4 transform hover:scale-105 transition-all duration-300 relative`}>
      
      {player.club?.logo && (
        <img
          src={player.club.logo}
          alt={`${player.club.nombre} Logo`}
          className="absolute top-3 left-3 h-10 w-10 object-contain rounded-full border-2 border-gray-200 shadow-sm bg-white p-0.5"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/40x40/cccccc/333333?text=Club` }}
        />
      )}

      {tierBadgeText && (
        <div className={`absolute top-3 right-3 ${tierBadgeBgColor} ${tierBadgeTextColor} text-xs font-bold px-2.5 py-1 rounded-full shadow-lg transform transition-all duration-300 hover:shadow-xl animate-pulse`}>
          {tierBadgeText}
        </div>
      )}

      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-md border-4 border-white mt-8"> {/* mt-8 para espacio si hay badge/logo */}
        {player.nombre.charAt(0).toUpperCase()}{player.apellido.charAt(0).toUpperCase()}
      </div>

      <h2 className={`text-2xl font-bold ${titleColor} mb-1 text-center`}>
        {player.nombre} {player.apellido}
      </h2>
      {player.rankingGeneral !== undefined && (
        <p className="text-lg font-semibold text-orange-500 mb-3">
          Ranking Global: #{player.rankingGeneral}
        </p>
      )}

      <div className="text-center text-gray-600 mb-4 text-sm">
        {player.club && (
          <p>Club: <span className="font-medium text-green-700">{player.club.nombre}</span></p>
        )}
        {player.categoriaPrincipal && (
          <p>Categoría Principal: <span className="font-medium text-orange-600">{player.categoriaPrincipal.nombre}</span></p>
        )}
      </div>

      <div
        className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-center text-white font-bold text-2xl mb-6 shadow-xl"
        style={{
          backgroundColor: '#f97316', // orange-500
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
          <span className="text-xs sm:text-sm font-semibold">Win Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold">{winRate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full text-center">
        {[
          { label: 'Partidos Jugados', value: partidosJugados },
          { label: 'Partidos Ganados', value: partidosGanados },
          { label: 'Torneos Jugados', value: torneosJugados },
          { label: 'Torneos Ganados', value: torneosGanados },
        ].map(stat => (
          <div key={stat.label} className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
            <p className="text-xs text-gray-700">{stat.label}</p>
            <p className="text-lg font-bold text-green-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStatisticsCard;
