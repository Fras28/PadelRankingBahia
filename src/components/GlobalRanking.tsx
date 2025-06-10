// components/GlobalRanking.tsx
import React from 'react';
import { IGlobalRankingEntry, IJugador, ITheme } from './general/interfaces';
// import WinnerIcon from './CrownIcon'; // Uncomment if you want to use WinnerIcon here

// Propiedades para el componente GlobalRanking
interface GlobalRankingProps {
  mockGlobalRanking: IGlobalRankingEntry[]; // Datos del ranking global
  theme: ITheme; // Tema actual para aplicar estilos
  handlePlayerClick: (player: IJugador, rank?: number) => void; // Función para manejar el clic en un jugador
}

const GlobalRanking: React.FC<GlobalRankingProps> = ({
  mockGlobalRanking,
  theme,
  handlePlayerClick,
}) => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>LA CIMA DEL PÁDEL MUNDIAL</h3>
      {mockGlobalRanking.length > 0 ? (
        <div className="overflow-x-auto">
          <table className={`min-w-full ${theme.mainContentBg} rounded-lg shadow-sm`}>
            <thead className={`${theme.tableHeaderBg}`}>
              <tr>
                <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tl-lg uppercase`}>Ranking</th>
                <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} uppercase`}>Jugador</th>
                <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tr-lg uppercase`}>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {mockGlobalRanking.map((entry, index) => (
                <tr key={`${entry.jugador.id}-global`} className={`${index % 2 === 0 ? theme.tableRowEvenBg : theme.tableRowOddBg} border-b ${theme.tableRowBorder} last:border-b-0 hover:bg-opacity-75 transition-colors duration-200 cursor-pointer`} onClick={() => handlePlayerClick(entry.jugador, entry.posicionGlobal)}>
                  <td className={`py-3 px-4 ${theme.tableTextColor} font-medium`}>
                    <span className="flex items-center">
                        {/* You could add crowns for the global ranking here too if desired */}
                        {/* {entry.posicionGlobal === 1 && <WinnerIcon iconType="paddle" color="gold" className="w-6 h-6 mr-2" />} */}
                        {/* {entry.posicionGlobal === 2 && <WinnerIcon iconType="paddle" color="silver" className="w-6 h-6 mr-2" />} */}
                        {/* {entry.posicionGlobal > 2 && <span className="w-6 mr-2"></span>}  */}
                        {entry.posicionGlobal}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${theme.tableTextColor} flex items-center`}>
                    {entry.jugador.club?.logo && (<img src={entry.jugador.club.logo} alt="Club Logo" className="h-6 w-6 mr-2 object-contain rounded-full border border-gray-300" onError={(e) => { e.currentTarget.src = `https://placehold.co/24x24/cccccc/333333?text=Club` }}/>)}
                    {entry.jugador.nombre} {entry.jugador.apellido}
                  </td>
                  <td className={`py-3 px-4 ${theme.tableAccentColor} font-bold`}>{entry.puntosGlobales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={`${theme.tournamentTextColor} text-center py-8`}>¡EL TRONO GLOBAL ESPERA A SU CAMPEÓN!</p>
      )}
    </section>
  );
};

export default GlobalRanking;
