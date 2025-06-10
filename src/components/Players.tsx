// components/Players.tsx
import React, { useMemo, useState } from 'react';
import { IJugador, IClub, ITheme } from './general/interfaces';
import PlayerStatisticsCard from './PlayerStatisticsCard'; // Assuming PlayerStatisticsCard is in components folder

// Propiedades para el componente Players
interface PlayersProps {
  mockPlayersData: IJugador[]; // Todos los datos de jugadores
  mockClubs: IClub[]; // Todos los datos de clubes para el filtro
  theme: ITheme; // Tema actual para aplicar estilos
  handlePlayerClick: (player: IJugador, rank?: number) => void; // Función para manejar el clic en un jugador
}

const Players: React.FC<PlayersProps> = ({
  mockPlayersData,
  mockClubs,
  theme,
  handlePlayerClick,
}) => {
  const [playerFilterClubId, setPlayerFilterClubId] = useState<number | 'all'>('all');
  const [playerSortOrder, setPlayerSortOrder] = useState<'default' | 'winRateDesc'>('default');

  // Helper function to calculate win rate
  const calculateWinRate = (player: IJugador): number => {
    if (player.estadisticas?.partidosJugados && player.estadisticas.partidosJugados > 0) {
      return (player.estadisticas.partidosGanados || 0) / player.estadisticas.partidosJugados;
    }
    return 0;
  };

  // Filter and sort players based on selected criteria
  const filteredAndSortedPlayers = useMemo(() => {
    let players = [...mockPlayersData];
    if (playerFilterClubId !== 'all') {
      players = players.filter(player => player.club?.id === playerFilterClubId);
    }
    if (playerSortOrder === 'winRateDesc') {
      players.sort((a, b) => calculateWinRate(b) - calculateWinRate(a));
    }
    return players;
  }, [playerFilterClubId, playerSortOrder, mockPlayersData]);

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>PERFILES DE JUGADORES</h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="player-club-filter" className={`text-lg font-semibold ${theme.sponsorTitleColor}`}>Filtrar por Arena:</label>
          <select
            id="player-club-filter"
            className={`p-2 border ${theme.clubSelectBorder} rounded-lg shadow-md focus:ring-amber-400 focus:border-amber-400 ${theme.clubSelectBg} ${theme.clubSelectText} transition-all duration-200`}
            value={playerFilterClubId}
            onChange={(e) => setPlayerFilterClubId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="all">Todos los Clubes</option>
            {mockClubs.map(club => (
              <option key={club.id} value={club.id}>{club.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="player-sort-order" className={`text-lg font-semibold ${theme.sponsorTitleColor}`}>Ordenar por:</label>
          <select
            id="player-sort-order"
            className={`p-2 border ${theme.clubSelectBorder} rounded-lg shadow-md focus:ring-amber-400 focus:border-amber-400 ${theme.clubSelectBg} ${theme.clubSelectText} transition-all duration-200`}
            value={playerSortOrder}
            onChange={(e) => setPlayerSortOrder(e.target.value as 'default' | 'winRateDesc')}
          >
            <option value="default">Defecto</option>
            <option value="winRateDesc">Win Rate (Mayor a Menor)</option>
          </select>
        </div>
      </div>
      {filteredAndSortedPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedPlayers.map(player => (
            <div key={player.id} onClick={() => handlePlayerClick(player)}>
              <PlayerStatisticsCard player={player} />
            </div>
          ))}
        </div>
      ) : (
        <p className={`${theme.tournamentTextColor} text-center py-8`}>No hay perfiles de jugadores disponibles con los filtros actuales.</p>
      )}
    </section>
  );
};

export default Players;