// App.tsx
import React, { useState, useMemo } from 'react';

// Import interfaces, mock data, and themes
import { IClub, ITorneo, IJugador, ThemeName } from './components/general/interfaces';
import { mockClubs, mockTournaments, mockCategoryRankings, mockGlobalRanking, mockSponsors, mockPlayersData } from './components/general/mockData';
import { themes } from './components/general/themes';
import Morton from './assets/Logos/MORTON.png'

// Import components
import PlayerStatisticsCard from './components/PlayerStatisticsCard';
import WinnerIcon from './components/CrownIcon';
import Tournaments from './components/Tournaments';
import InternalRanking from './components/InternalRanking';
import GlobalRanking from './components/GlobalRanking';
import Players from './components/Players';

// Mapeo de Club ID a nombre de tema
const clubThemeMap: { [key: number]: ThemeName } = {
  1: 'middle',    // Padel X3 -> middle theme
  2: 'impactful', // Osaka Padel -> impactful theme
};

function App() {
  // State variables for application logic
  const [selectedClubId, setSelectedClubId] = useState<number | null>(mockClubs[0].id);
  const [activeTab, setActiveTab] = useState<'torneos' | 'rankingInterno' | 'rankingGlobal' | 'jugadores'>('torneos');
  const [selectedTournamentForFixture, setSelectedTournamentForFixture] = useState<ITorneo | null>(null);
  const [selectedPlayerForStats, setSelectedPlayerForStats] = useState<IJugador | null>(null);
  const [currentPlayerRankForModal, setCurrentPlayerRankForModal] = useState<number | undefined>();

  // El tema se deriva automáticamente del club seleccionado
  const currentThemeName = selectedClubId ? (clubThemeMap[selectedClubId] || 'classic') : 'classic';
  const theme = themes[currentThemeName];

  // Derived state
  const selectedClub = mockClubs.find(club => club.id === selectedClubId);
  const clubTournaments = selectedClubId ? mockTournaments[selectedClubId] || [] : [];
  const clubCategoryRankings = selectedClubId ? mockCategoryRankings[selectedClubId] || [] : [];
  const roundOrder = ['treintaidosavos', 'dieciseisavos', 'octavos', 'cuartos', 'semifinales', 'final'];

  // Helper function to get club logo
  const getClubLogo = (clubId: number | undefined) => {
    if (!clubId) return null;
    const club = mockClubs.find(c => c.id === clubId);
    return club ? club.logo : null;
  };

  // Handler for player click to show statistics modal
  const handlePlayerClick = (player: IJugador, rank?: number) => {
    setSelectedPlayerForStats(player);
    setCurrentPlayerRankForModal(rank);
  };

  return (
    <div className={`min-h-screen font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-500 ${theme.bodyBg} ${theme.tableTextColor}`}>
      {/* Header */}
      <header className={`${theme.headerBg} shadow-2xl rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 ${theme.headerBorder}`}>
        <h1 className={`text-3xl sm:text-4xl font-extrabold ${theme.mainTitleColor} drop-shadow-lg`}>
          PÁDEL MANAGER PRO
        </h1>
        <div className="flex items-center gap-2">
          <label htmlFor="club-select" className={`text-lg font-semibold ${theme.sponsorTitleColor}`}>Club:</label>
          <select
            id="club-select"
            className={`p-2 border ${theme.clubSelectBorder} rounded-lg shadow-md focus:ring-amber-400 focus:border-amber-400 ${theme.clubSelectBg} ${theme.clubSelectText} transition-all duration-200`}
            value={selectedClubId || ''}
            onChange={(e) => {
              const clubId = Number(e.target.value);
              setSelectedClubId(clubId);
              setSelectedTournamentForFixture(null);
              setSelectedPlayerForStats(null);
            }}
          >
            {mockClubs.map(club => (
              <option key={club.id} value={club.id}>{club.nombre}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Sponsors Section */}
      <section className={`${theme.sponsorSectionBg} shadow-lg rounded-xl p-4 mb-8 border-b-2 ${theme.sponsorSectionBorder}`}>
        <h2 className={`text-xl font-bold mb-4 text-center ${currentThemeName === 'impactful' ? theme.sponsorTitleColor : 'text-gray-700'}`}>ALIADOS ESTRATÉGICOS</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {mockSponsors.map(sponsor => (
            <a key={sponsor.id} href={sponsor.link} target="_blank" rel="noopener noreferrer" className="block transform transition-transform duration-200 hover:scale-110 bg-slate-200 rounded-lg">
              <img
                src={sponsor.logoUrl}
                alt={sponsor.nombre}
                className="h-12 object-contain rounded-md"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/100x50/cccccc/333333?text=${sponsor.nombre.split(' ').map(n => n[0]).join('')}` }}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Selected Club Info */}
      {selectedClub && (
        <div className={`${theme.clubInfoBg} shadow-lg rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 border-b-2 ${theme.clubInfoBorder}`}>
          <img src={selectedClub.logo} alt={`Logo de ${selectedClub.nombre}`} className={`w-26 h-20 rounded-full border-4 ${theme.clubLogoBorder} object-cover shadow-md`} onError={(e) => { e.currentTarget.src = `https://placehold.co/80x80/cccccc/333333?text=${selectedClub.nombre.split(' ').map(n=>n[0]).join('').substring(0,3)}`}} />
          <div>
            <h2 className={`text-2xl font-bold ${theme.clubNameColor}`}>{selectedClub.nombre}</h2>
            <p className={`${theme.clubInfoTextColor}`}>{selectedClub.direccion}</p>
            <p className={`${theme.clubInfoTextColor}`}>Contacto: {selectedClub.emailContacto} | {selectedClub.telefono}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <nav className={`${theme.navBg} shadow-lg rounded-xl p-2 mb-8 flex flex-wrap justify-center gap-2 sm:gap-4 border-b-2 ${theme.navBorder}`}>
        {(['torneos', 'rankingInterno', 'rankingGlobal', 'jugadores'] as const).map(tabName => (
          <button
            key={tabName}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${activeTab === tabName ? `${theme.tabActiveBg} ${theme.tabActiveText} shadow-xl` : `${theme.tabInactiveBg} ${theme.tabInactiveText} hover:bg-opacity-80`}`}
            onClick={() => {
              setActiveTab(tabName);
              setSelectedTournamentForFixture(null);
              setSelectedPlayerForStats(null);
            }}
          >
            {tabName === 'rankingInterno' ? 'RANKING INTERNO' : tabName === 'rankingGlobal' ? 'RANKING GLOBAL' : tabName.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <main className={`${theme.mainContentBg} shadow-lg rounded-xl p-6`}>
        {activeTab === 'torneos' && (
          <Tournaments
            clubTournaments={clubTournaments}
            theme={theme}
            setSelectedTournamentForFixture={setSelectedTournamentForFixture}
            getClubLogo={getClubLogo}
          />
        )}

        {activeTab === 'rankingInterno' && (
          <InternalRanking
            clubCategoryRankings={clubCategoryRankings}
            theme={theme}
            handlePlayerClick={handlePlayerClick}
          />
        )}

        {activeTab === 'rankingGlobal' && (
          <GlobalRanking
            mockGlobalRanking={mockGlobalRanking}
            theme={theme}
            handlePlayerClick={handlePlayerClick}
          />
        )}

        {activeTab === 'jugadores' && (
          <Players
            mockPlayersData={mockPlayersData}
            mockClubs={mockClubs}
            theme={theme}
            handlePlayerClick={handlePlayerClick}
          />
        )}
      </main>

      {/* Fixture Modal */}
      {selectedTournamentForFixture && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedTournamentForFixture(null)}>
          <div className={`${theme.modalBg} rounded-xl shadow-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative border-4 ${theme.modalBorder} transform scale-95 animate-scale-in`} onClick={(e) => e.stopPropagation()}>
            <button className={`absolute top-4 right-4 ${theme.modalCloseButtonColor} hover:text-opacity-70 text-3xl font-bold transition-transform duration-200 hover:rotate-90`} onClick={() => setSelectedTournamentForFixture(null)}>&times;</button>
            <h3 className={`text-2xl font-bold mb-4 border-b-2 ${theme.modalTitleBorder} pb-2`} style={{ color: theme.modalTitleColor }}>CUADRO DE JUEGO: {selectedTournamentForFixture.nombre.toUpperCase()} ({selectedTournamentForFixture.categoria.map(cat => cat.nombre).join(', ')}){selectedTournamentForFixture.maxParejas && ` - MÁX. ${selectedTournamentForFixture.maxParejas} PAREJAS`}</h3>
            {selectedTournamentForFixture.fixture && Object.keys(selectedTournamentForFixture.fixture).length > 0 ? (
              <div className="flex flex-col sm:flex-row justify-around gap-4 overflow-x-auto pb-4">
                {roundOrder.map(rondaKey => {
                  const partidos = selectedTournamentForFixture.fixture?.[rondaKey];
                  if (!partidos || partidos.length === 0) return null;
                  const rondaDisplayName = rondaKey.replace('treintaidosavos', '32AVOS').replace('dieciseisavos', '16AVOS').replace('octavos', '8VOS').replace('cuartos', '4TOS').replace('semifinales', 'SEMIFINALES').replace('final', 'FINAL');
                  return (
                    <div key={rondaKey} className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[220px] mb-4`}>
                      <h4 className={`text-lg font-bold mb-2 capitalize border-b-2 ${theme.fixtureRoundHeaderBorder} pb-1`} style={{ color: theme.fixtureRoundHeaderColor }}>{rondaDisplayName}</h4>
                      <div className="space-y-2">
                        {partidos.map(partido => (
                          <div key={partido.id} className={`${theme.fixtureMatchCardBg} p-3 rounded-lg shadow-md border ${theme.fixtureMatchCardBorder}`}>
                            <p className={`text-sm ${theme.fixtureMatchTextColor} font-medium`}>{partido.pareja1.nombrePareja ? partido.pareja1.nombrePareja : `${partido.pareja1.jugador1.apellido} / ${partido.pareja1.jugador2.apellido}`}</p>
                            <p className={`text-sm ${theme.fixtureMatchSubtextColor}`}>{partido.pareja2 ? (partido.pareja2.nombrePareja ? `VS ${partido.pareja2.nombrePareja}` : `VS ${partido.pareja2.jugador1.apellido} / ${partido.pareja2.jugador2.apellido}`) : 'ESPERANDO RIVAL'}</p>
                            {partido.resultado && (<p className={`text-xs ${theme.fixtureMatchSubtextColor}`}>RESULTADO: {partido.resultado}</p>)}
                            {partido.ganador && (<p className={`text-xs ${theme.fixtureMatchWinnerColor} font-bold`}>GANADOR: {partido.ganador.nombrePareja ? partido.ganador.nombrePareja : `${partido.ganador.jugador1.apellido} / ${partido.ganador.jugador2.apellido}`}</p>)}
                            {partido.estado && (<p className={`text-xs font-medium ${partido.estado === 'Finalizado' ? theme.fixtureMatchStatusFinalized : partido.estado === 'En Curso' ? theme.fixtureMatchStatusInProgress : theme.fixtureMatchStatusOther}`}>ESTADO: {partido.estado.toUpperCase()}</p>)}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (<p className={`${theme.fixtureMatchSubtextColor} text-center py-8`}>¡EL CUADRO DE JUEGO AÚN NO ESTÁ DISPONIBLE PARA ESTE TORNEO!</p>)}
          </div>
        </div>
      )}

      {/* Player Statistics Modal */}
      {selectedPlayerForStats && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedPlayerForStats(null)}>
          {/* El fondo del modal ahora es transparente para que la tarjeta de jugador sea el elemento principal */}
          <div className="bg-transparent rounded-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-white hover:text-opacity-70 text-4xl font-bold transition-transform duration-200 hover:rotate-90 z-10" onClick={() => setSelectedPlayerForStats(null)}>&times;</button>
            <PlayerStatisticsCard player={selectedPlayerForStats} rankInCategory={currentPlayerRankForModal} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`text-center text-sm mt-8 p-4 sm:p-6 rounded-xl shadow-lg border-t-2 ${theme.footerBg} ${theme.footerBorder}`}>
  <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
    {/* Contenedor principal para desktop */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
      {/* Texto principal */}
      <div className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 ${theme.footerTextColor}`}>
        <span className="text-xs sm:text-sm">© {new Date().getFullYear()} PÁDEL MANAGER PRO</span>
        <span className="hidden sm:inline">•</span>
        <span className="font-semibold text-sm sm:text-base">¡DOMINA LA CANCHA!</span>
      </div>
      
      {/* Logo Morton */}
      <div className="flex items-center mt-2 sm:mt-0">
        <img 
          src={Morton} 
          width="32" 
          height="32" 
          alt="Morton Logo" 
          className="sm:w-10 sm:h-10 rounded-md shadow-sm hover:scale-110 transition-transform duration-200"
        />
      </div>
    </div>
    
    {/* Línea adicional */}
    <div className={`text-xs ${theme.footerTextColor} opacity-75 px-2`}>
      Desarrollado con ❤️ para la comunidad del pádel
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;