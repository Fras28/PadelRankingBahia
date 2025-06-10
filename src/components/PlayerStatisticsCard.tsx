import React from 'react';

// --- Interfaces (idealmente importadas de un archivo de tipos compartido) ---
interface IEstadisticas {
  partidosJugados?: number;
  partidosGanados?: number;
  torneosJugados?: number;
  torneosGanados?: number;
}

interface IClub {
  id: number;
  nombre: string;
  logo?: string;
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
  club?: IClub;
  categoriaPrincipal?: { id: number; nombre: string; };
}

// Estilos específicos para cada club
const clubStyles: { [key: number]: { cardBg: string; cardBorder: string; titleColor: string; accentColor: string; statBlockBg: string; statBlockBorder: string; textColor: string; initialBg: string; winRateBg: string; }} = {
  1: { // Padel X3 -> #98F700
    cardBg: 'bg-black',
    cardBorder: 'border-lime-400',
    titleColor: 'text-lime-400',
    accentColor: 'text-lime-500',
    statBlockBg: 'bg-gray-800',
    statBlockBorder: 'border-lime-500/20',
    textColor: 'text-gray-200',
    initialBg: 'bg-gradient-to-br from-lime-500 to-green-600',
    winRateBg: '#84cc16' // lime-500
  },
  2: { // Osaka Padel -> #D70300
    cardBg: 'bg-black',
    cardBorder: 'border-red-600',
    titleColor: 'text-red-500',
    accentColor: 'text-red-600',
    statBlockBg: 'bg-gray-800',
    statBlockBorder: 'border-red-500/20',
    textColor: 'text-gray-200',
    initialBg: 'bg-gradient-to-br from-red-500 to-rose-600',
    winRateBg: '#ef4444' // red-500
  },
};

const defaultStyle = {
  cardBg: 'bg-white',
  cardBorder: 'border-green-400',
  titleColor: 'text-green-700',
  accentColor: 'text-orange-600',
  statBlockBg: 'bg-green-50',
  statBlockBorder: 'border-green-200',
  textColor: 'text-gray-600',
  initialBg: 'bg-gradient-to-br from-green-500 to-teal-500',
  winRateBg: '#f97316' // orange-500
};


// --- Props del Componente ---
interface PlayerStatisticsCardProps {
  player: IJugador;
  rankInCategory?: number; // Prop para indicar el ranking en su categoría
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
    
  const style = player.club?.id ? (clubStyles[player.club.id] || defaultStyle) : defaultStyle;

  let rankingTier: 'gold' | 'silver' | null = null;
  if (rankInCategory === 1) rankingTier = 'gold';
  else if (rankInCategory === 2) rankingTier = 'silver';

  let tierBadgeText: string | null = null;
  let tierBadgeBgColor = '';
  let tierBadgeTextColor = 'text-white';

  if (rankingTier === 'gold') {
    tierBadgeText = 'TOP 1 CATEGORÍA';
    tierBadgeBgColor = 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500';
    tierBadgeTextColor = 'text-black';
  } else if (rankingTier === 'silver') {
    tierBadgeText = 'TOP 2 CATEGORÍA';
    tierBadgeBgColor = 'bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500';
  }

  return (
    <div className={`${style.cardBg} rounded-xl shadow-xl p-6 flex flex-col items-center border-b-8 ${style.cardBorder} max-w-sm mx-auto my-4 transform hover:scale-105 transition-all duration-300 relative cursor-pointer min-h-[570px] overflow-hidden`}>
      
      {tierBadgeText && (
        <div className={`absolute top-3 right-3 ${tierBadgeBgColor} ${tierBadgeTextColor} text-xs font-bold px-2.5 py-1 rounded-full shadow-lg transform transition-all duration-300 hover:shadow-xl animate-pulse z-10`}>
          {tierBadgeText}
        </div>
      )}

      <div className={`w-24 h-24 rounded-full ${style.initialBg} flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-md border-4 border-white/20`}>
        {player.nombre.charAt(0).toUpperCase()}{player.apellido.charAt(0).toUpperCase()}
      </div>
      <h2 className={`text-2xl font-bold ${style.titleColor}  text-center`}>
        {player.nombre} {player.apellido}
      </h2>
<div className='flex flex-col-2 items-center gap-4'>
      
      <div className="h-10 flex items-center"> {/* Contenedor de altura fija para Ranking y Categoría */}
        {player.rankingGeneral !== undefined ? (
          <p className={`text-xl font-semibold ${style.accentColor}`}>
            Rank.G: #{player.rankingGeneral}
          </p>
        ) : (
          <p>&nbsp;</p> /* Espacio reservado para mantener la altura */
        )}
      </div>

      <div className={`text-center ${style.textColor} mb-4 text-sm h-10`}> {/* Contenedor de altura fija */}
        {player.club && (
          <p>Club: <span className={`font-medium ${style.titleColor}`}>{player.club.nombre}</span></p>
        )}
        {player.categoriaPrincipal && (
          <p>Categoría: <span className={`font-medium ${style.accentColor}`}>{player.categoriaPrincipal.nombre}</span></p>
        )}
      </div>
      </div>
      <div
        className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-center text-white font-bold text-2xl mb-6 shadow-xl z-10"
        style={{
          backgroundColor: style.winRateBg,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
          <span className="text-xs sm:text-sm font-semibold">Win Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold">{winRate}%</span>
        </div>
      </div>
      {player.club?.logo && (
        <img
          src={player.club.logo}
          alt={`${player.club.nombre} Logo`}
          className="absolute bottom-20 right-41 h-48 w-auto object-contain opacity-10 rounded-full "
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <div className="grid grid-cols-2 gap-3 w-full text-center mt-auto z-10">
        {[
          { label: 'Partidos Jugados', value: partidosJugados },
          { label: 'Partidos Ganados', value: partidosGanados },
          { label: 'Torneos Jugados', value: torneosJugados },
          { label: 'Torneos Ganados', value: torneosGanados },
        ].map(stat => (
          <div key={stat.label} className={`${style.statBlockBg} p-3 rounded-lg shadow-sm border ${style.statBlockBorder}`}>
            <p className={`text-xs ${style.textColor}`}>{stat.label}</p>
            <p className={`text-lg font-bold ${style.accentColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Logo del club en la esquina inferior izquierda */}
    </div>
  );
};

export default PlayerStatisticsCard;