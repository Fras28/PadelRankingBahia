// components/Tournaments.tsx
import React from 'react';
import { ITorneo, ITheme, IClub } from './general/interfaces';

// Propiedades para el componente Tournaments
interface TournamentsProps {
  clubTournaments: ITorneo[]; // Lista de torneos del club seleccionado
  theme: ITheme; // Tema actual para aplicar estilos
  setSelectedTournamentForFixture: (tournament: ITorneo | null) => void; // Función para establecer el torneo seleccionado para el fixture
  getClubLogo: (clubId: number | undefined) => string | null; // Función para obtener el logo del club
}

const Tournaments: React.FC<TournamentsProps> = ({
  clubTournaments,
  theme,
  setSelectedTournamentForFixture,
  getClubLogo,
}) => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>ARENA DE CAMPEONES</h3>
      {clubTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubTournaments.map(tournament => {
            const tournamentClubLogo = getClubLogo(tournament.clubId); // Obtener el logo del club del torneo
            return (
              <div key={tournament.id} className={`${theme.tournamentCardBg} p-6 rounded-lg shadow-xl border ${theme.tournamentCardBorder} hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between transform hover:scale-105`}>
                <div>
                  <div className="flex items-center mb-2">
                    {tournamentClubLogo && (
                      <img
                        src={tournamentClubLogo}
                        alt="Club Logo"
                        className="h-8 w-8 mr-2 object-contain rounded-full border border-gray-300"
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/32x32/cccccc/333333?text=Club` }} // Fallback image
                      />
                    )}
                    <h4 className={`text-xl font-bold ${theme.tournamentNameColor}`}>{tournament.nombre.toUpperCase()}</h4>
                  </div>
                  <p className={`text-sm ${theme.tournamentDateColor} mb-2`}>{new Date(tournament.fechaInicio).toLocaleDateString()} - {new Date(tournament.fechaFin).toLocaleDateString()}</p>
                  <p className={`font-semibold ${tournament.estado === 'En Curso' ? theme.tournamentStatusInProgress : tournament.estado === 'Abierto' ? theme.tournamentStatusOpen : theme.tournamentStatusOther} mb-2`}>ESTADO: {tournament.estado.toUpperCase()}</p>
                  <p className={`${theme.tournamentTextColor}`}>CATEGORÍAS: {tournament.categoria.map(cat => cat.nombre).join(', ')}</p>
                  {tournament.maxParejas && (<p className={`${theme.tournamentTextColor}`}>MÁX. PAREJAS: {tournament.maxParejas}</p>)}
                </div>
                {tournament.fixture && Object.keys(tournament.fixture).length > 0 && (
                  <button className={`mt-4 w-full ${theme.fixtureButtonBg} ${theme.fixtureButtonText} py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md transform hover:scale-105 font-bold uppercase tracking-wide`} onClick={() => setSelectedTournamentForFixture(tournament)}>VER CUADRO DE JUEGO</button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className={`${theme.tournamentTextColor} text-center py-8`}>¡NO HAY CAMPEONATOS DISPONIBLES EN ESTA ARENA!</p>
      )}
    </section>
  );
};

export default Tournaments;
