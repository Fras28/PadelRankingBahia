// components/Tournaments.tsx
import React from 'react';
import { ITorneo, ITheme } from './general/interfaces';

// Estilos específicos para las tarjetas de torneo, basados en el club
const tournamentCardStyles: { [key: number]: {
  cardBg: string;
  cardBorder: string;
  titleColor: string;
  dateColor: string;
  textColor: string;
  statusInProgress: string;
  statusOpen: string;
  statusOther: string;
  buttonBg: string;
  buttonText: string;
  iconColor: string;
}} = {
  1: { // Padel X3 -> #98F700
    cardBg: 'bg-black',
    cardBorder: 'border-lime-400',
    titleColor: 'text-lime-400',
    dateColor: 'text-gray-400',
    textColor: 'text-gray-200',
    statusInProgress: 'text-green-400',
    statusOpen: 'text-yellow-400',
    statusOther: 'text-gray-400',
    buttonBg: 'bg-lime-500 hover:bg-lime-600',
    buttonText: 'text-black',
    iconColor: 'text-black'
  },
  2: { // Osaka Padel -> #D70300
    cardBg: 'bg-black',
    cardBorder: 'border-red-600',
    titleColor: 'text-red-500',
    dateColor: 'text-gray-400',
    textColor: 'text-gray-200',
    statusInProgress: 'text-green-400',
    statusOpen: 'text-yellow-400',
    statusOther: 'text-gray-400',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    buttonText: 'text-white',
    iconColor: 'text-white'
  },
};

// Estilo por defecto para cualquier otro club
const defaultStyle = {
  cardBg: 'bg-white',
  cardBorder: 'border-gray-300',
  titleColor: 'text-gray-800',
  dateColor: 'text-gray-500',
  textColor: 'text-gray-600',
  statusInProgress: 'text-green-600',
  statusOpen: 'text-blue-600',
  statusOther: 'text-red-600',
  buttonBg: 'bg-gray-800 hover:bg-gray-700',
  buttonText: 'text-white',
  iconColor: 'text-white'
};


interface TournamentsProps {
  clubTournaments: ITorneo[];
  theme: ITheme;
  setSelectedTournamentForFixture: (tournament: ITorneo | null) => void;
  getClubLogo: (clubId: number | undefined) => string | null;
}

const Tournaments: React.FC<TournamentsProps> = ({
  clubTournaments,
  theme,
  setSelectedTournamentForFixture,
  getClubLogo,
}) => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2 " style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>ARENA DE CAMPEONES</h3>
      {clubTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubTournaments.map(tournament => {
            const style = tournament.clubId ? (tournamentCardStyles[tournament.clubId] || defaultStyle) : defaultStyle;
            const tournamentClubLogo = getClubLogo(tournament.clubId);

            return (
              <div key={tournament.id} className={`${style.cardBg} rounded-xl shadow-xl p-6 flex flex-col  border-b-8 ${style.cardBorder} transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-h-[420px]`}>
                
                {/* Logo de fondo */}
                {tournamentClubLogo && (
                  <img
                    src={tournamentClubLogo}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-20 right-0 h-48 w-auto object-contain opacity-10 rounded-full "
                  />
                )}

                {/* Contenido sobre el logo */}
                <div className="relative z-10 flex flex-col h-full w-full">
                  <div className={`w-20 h-20 rounded-full ${style.buttonBg} flex items-center justify-center mb-4 shadow-md border-4 border-white/20  mx-auto `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${style.iconColor}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.89,3.23l2.2,4.89,5.15.42a1.49,1.49,0,0,1,.83,2.54L17.5,14.35l1.24,5.21a1.5,1.5,0,0,1-2.18,1.58L12,18.43,7.44,21.14a1.5,1.5,0,0,1-2.18-1.58L6.5,14.35,2.93,11.08a1.49,1.49,0,0,1,.83-2.54l5.15-.42,2.2-4.89A1.5,1.5,0,0,1,12.89,3.23Z" />
                    </svg>
                  </div>

                  <h4 className={`text-2xl font-bold ${style.titleColor}`}>{tournament.nombre.toUpperCase()}</h4>
                  <p className={`text-sm ${style.dateColor} mt-1`}>{new Date(tournament.fechaInicio).toLocaleDateString()} - {new Date(tournament.fechaFin).toLocaleDateString()}</p>
                  
                  <div className="my-4 ">
                    <p className={`font-semibold text-lg ${
                        tournament.estado === 'En Curso' ? style.statusInProgress 
                      : tournament.estado === 'Abierto' ? style.statusOpen 
                      : style.statusOther
                    }`}>
                      {tournament.estado.toUpperCase()}
                    </p>
                    <p className={`${style.textColor} mt-2`}>CATEGORÍAS: <span className='font-bold'>{tournament.categoria.map(cat => cat.nombre).join(', ')}</span></p>
                    {tournament.maxParejas && (<p className={`${style.textColor}`}>PAREJAS: <span className='font-bold'>{tournament.maxParejas}</span></p>)}
                  </div>

                  {tournament.fixture && Object.keys(tournament.fixture).length > 0 && (
                    <button className={`mt-auto w-full ${style.buttonBg} ${style.buttonText} py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 font-bold uppercase tracking-wider`} onClick={() => setSelectedTournamentForFixture(tournament)}>
                      Ver Cuadro de Juego
                    </button>
                  )}
                </div>
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