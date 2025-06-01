// components/InternalRanking.tsx
import React from 'react';
import { ICategoryRanking, IJugador, ITheme } from './general/interfaces';
import WinnerIcon from './CrownIcon'; // Assuming CrownIcon is in components folder

// Propiedades para el componente InternalRanking
interface InternalRankingProps {
  clubCategoryRankings: ICategoryRanking[]; // Rankings por categoría del club seleccionado
  theme: ITheme; // Tema actual para aplicar estilos
  handlePlayerClick: (player: IJugador, rank?: number) => void; // Función para manejar el clic en un jugador
}

const InternalRanking: React.FC<InternalRankingProps> = ({
  clubCategoryRankings,
  theme,
  handlePlayerClick,
}) => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>DOMINIO INTERNO POR CATEGORÍA</h3>
      {clubCategoryRankings.length > 0 ? (
        <div className="space-y-8">
          {clubCategoryRankings.map(ranking => (
            <div key={ranking.categoria.nombre} className={`${theme.tournamentCardBg} p-6 rounded-lg shadow-xl border ${theme.tournamentCardBorder}`}>
              <h4 className="text-xl font-bold mb-4" style={{ color: theme.tournamentNameColor }}>CATEGORÍA: {ranking.categoria.nombre.toUpperCase()}</h4>
              <div className="overflow-x-auto">
                <table className={`min-w-full ${theme.mainContentBg} rounded-lg shadow-sm`}>
                  <thead className={`${theme.tableHeaderBg}`}>
                    <tr>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tl-lg uppercase`}>Posición</th>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} uppercase`}>Jugador</th>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tr-lg uppercase`}>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.entradasRanking.map((entry, index) => (
                      <tr key={`${entry.jugador.id}-${ranking.categoria.nombre}`} className={`${index % 2 === 0 ? theme.tableRowEvenBg : theme.tableRowOddBg} border-b ${theme.tableRowBorder} last:border-b-0 hover:bg-opacity-75 transition-colors duration-200 cursor-pointer`} onClick={() => handlePlayerClick(entry.jugador, entry.posicion)}>
                        <td className={`py-3 px-4 ${theme.tableTextColor} font-medium`}>
                          <span className="flex items-center">
                            {entry.posicion === 1 && <WinnerIcon iconType="paddle" color="gold" className="w-6 h-6 mr-2" />}
                            {entry.posicion === 2 && <WinnerIcon iconType="paddle" color="silver" className="w-6 h-6 mr-2" />}
                            {entry.posicion > 2 && <span className="w-6 mr-2"></span>} {/* Placeholder for alignment */}
                            {entry.posicion}
                          </span>
                        </td>
                        <td className={`py-3 px-4 ${theme.tableTextColor} flex items-center`}>
                          {entry.jugador.club?.logo && (<img src={entry.jugador.club.logo} alt="Club Logo" className="h-6 w-6 mr-2 object-contain rounded-full border border-gray-300" onError={(e) => { e.currentTarget.src = `https://placehold.co/24x24/cccccc/333333?text=Club` }}/>)}
                          {entry.jugador.nombre} {entry.jugador.apellido}
                        </td>
                        <td className={`py-3 px-4 ${theme.tableAccentColor} font-bold`}>{entry.puntos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`${theme.tournamentTextColor} text-center py-8`}>¡NADIE HA MARCADO TERRITORIO EN ESTA CATEGORÍA AÚN!</p>
      )}
    </section>
  );
};

export default InternalRanking;
