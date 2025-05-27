import React from 'react';

// --- Interfaces para tipar los datos (copiadas de App.tsx para auto-contención) ---
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
  club?: { id: number; nombre: string; }; // Simplificado para la demo
  categoriaPrincipal?: { id: number; nombre: string; }; // Simplificado para la demo
}

interface IEstadisticas {
  partidosJugados?: number;
  partidosGanados?: number;
  torneosJugados?: number;
  torneosGanados?: number;
}

// --- Componente PlayerStatisticsCard ---
interface PlayerStatisticsCardProps {
  player: IJugador;
}

const PlayerStatisticsCard: React.FC<PlayerStatisticsCardProps> = ({ player }) => {
  // Datos de estadísticas con valores por defecto
  const stats = player.estadisticas || {};
  const {
    partidosJugados = 0,
    partidosGanados = 0,
    torneosJugados = 0,
    torneosGanados = 0,
  } = stats;

  // Calcular porcentaje de victorias
  const winRate = partidosJugados > 0 
    ? ((partidosGanados / partidosJugados) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-b-4 border-green-400 max-w-sm mx-auto my-4 transform hover:scale-105 transition-transform duration-300">
      {/* Avatar del Jugador */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-md border-4 border-white">
        {player.nombre.charAt(0).toUpperCase()}{player.apellido.charAt(0).toUpperCase()}
      </div>

      {/* Nombre y Ranking */}
      <h2 className="text-2xl font-bold text-green-700 mb-1 text-center">
        {player.nombre} {player.apellido}
      </h2>
      {player.rankingGeneral !== undefined && (
        <p className="text-xl font-semibold text-orange-600 mb-4">
          Ranking Global: #{player.rankingGeneral}
        </p>
      )}

      {/* Información del Club y Categoría */}
      <div className="text-center text-gray-600 mb-4">
        {player.club && (
          <p className="text-md">Club: <span className="font-medium text-green-700">{player.club.nombre}</span></p>
        )}
        {player.categoriaPrincipal && (
          <p className="text-md">Categoría: <span className="font-medium text-orange-600">{player.categoriaPrincipal.nombre}</span></p>
        )}
      </div>

      {/* Hexágono de Estadísticas Clave (Win Rate) */}
      <div 
        className="relative w-32 h-32 flex items-center justify-center text-center text-white font-bold text-2xl mb-6 shadow-xl"
        style={{
          backgroundColor: '#f97316', // orange-500
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          transform: 'rotate(0deg)', // Para asegurar que el texto no gire con el clip-path
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <span className="text-sm font-semibold text-white">Win Rate</span>
          <span className="text-3xl font-extrabold text-white">{winRate}%</span>
        </div>
      </div>


      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-2 gap-4 w-full text-center">
        <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-700">Partidos Jugados</p>
          <p className="text-xl font-bold text-green-800">{partidosJugados}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-700">Partidos Ganados</p>
          <p className="text-xl font-bold text-green-800">{partidosGanados}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-700">Torneos Jugados</p>
          <p className="text-xl font-bold text-green-800">{torneosJugados}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-700">Torneos Ganados</p>
          <p className="text-xl font-bold text-green-800">{torneosGanados}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatisticsCard;
