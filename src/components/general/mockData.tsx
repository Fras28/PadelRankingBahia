// mockData.ts
// Este archivo contiene todos los datos de ejemplo (mock data) para la aplicación.

import ADN from '../../assets/ADN.png';
import ENA from '../../assets/ENA.png';
import Aonken from '../../assets/Aonken.png';
import Codimat from '../../assets/CODIMAT.png';
import Promar from '../../assets/promar.png';
import Bull from '../../assets/bullpadel.png';
import PadelX3 from '../../assets/Logos/X3.png';
import Osaka from '../../assets/Logos/OSAKA.png';

import {
  IClub,
  IJugador,
  IPareja,
  ITorneo,
  ICategoryRanking,
  IGlobalRankingEntry,
  ISponsor
} from './interfaces';

// Datos de clubes de ejemplo
export const mockClubs: IClub[] = [
  {
    id: 1,
    nombre: 'Padel X3',
    direccion: 'Calle Falsa 123, Ciudad',
    logo: PadelX3,
    emailContacto: 'info@padelcentral.com',
    telefono: '1122334455'
  },
  {
    id: 2,
    nombre: 'Osaka Padel',
    direccion: 'Avenida Siempre Viva 742, Pueblo',
    logo: Osaka,
    emailContacto: 'contacto@raquetaexpress.com',
    telefono: '9988776655'
  },
];

// Datos de jugadores de ejemplo
export const mockPlayersData: IJugador[] = [
  // Players for Club 1 (Padel X3)
  { id: 1, nombre: 'Juan', apellido: 'Pérez', rankingGeneral: 2, estadisticas: { partidosJugados: 280, partidosGanados: 200, torneosJugados: 25, torneosGanados: 8 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 2, nombre: 'Ana', apellido: 'García', rankingGeneral: 4, estadisticas: { partidosJugados: 220, partidosGanados: 150, torneosJugados: 20, torneosGanados: 5 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 3, nombre: 'Carlos', apellido: 'Ruiz', rankingGeneral: 5, estadisticas: { partidosJugados: 180, partidosGanados: 100, torneosJugados: 18, torneosGanados: 2 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 2, nombre: '2da' }},
  { id: 4, nombre: 'Marta', apellido: 'López', rankingGeneral: 8, estadisticas: { partidosJugados: 150, partidosGanados: 80, torneosJugados: 12, torneosGanados: 1 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 2, nombre: '2da' }},
  { id: 5, nombre: 'Franco', apellido: 'EquipoUno', rankingGeneral: 10, estadisticas: { partidosJugados: 70, partidosGanados: 50, torneosJugados: 8, torneosGanados: 0 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 3, nombre: '3ra' }},
  { id: 6, nombre: 'Lucas', apellido: 'EquipoTres', rankingGeneral: 15, estadisticas: { partidosJugados: 60, partidosGanados: 40, torneosJugados: 7, torneosGanados: 0 }, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 3, nombre: '3ra' }},
  // Players for Club 2 (Osaka Padel)
  { id: 7, nombre: 'Pedro', apellido: 'Martínez', rankingGeneral: 1, estadisticas: { partidosJugados: 300, partidosGanados: 250, torneosJugados: 30, torneosGanados: 10 }, club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo }, categoriaPrincipal: { id: 4, nombre: '1ra' }},
  { id: 8, nombre: 'Laura', apellido: 'Fernández', rankingGeneral: 3, estadisticas: { partidosJugados: 280, partidosGanados: 200, torneosJugados: 28, torneosGanados: 7 }, club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo }, categoriaPrincipal: { id: 4, nombre: '1ra' }},
  // Additional players to complete rankings and fixtures
  { id: 9, nombre: 'Pedro', apellido: 'Gómez', estadisticas: {partidosJugados: 10, partidosGanados: 5}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 10, nombre: 'Sofía', apellido: 'Paz', estadisticas: {partidosJugados: 12, partidosGanados: 6}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 11, nombre: 'Diego', apellido: 'Silva', estadisticas: {partidosJugados: 8, partidosGanados: 3}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 12, nombre: 'Elena', apellido: 'Rojas', estadisticas: {partidosJugados: 15, partidosGanados: 9}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 2, nombre: '2da' }},
  { id: 13, nombre: 'Andrés', apellido: 'Castro', estadisticas: {partidosJugados: 20, partidosGanados: 12}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 2, nombre: '2da' }},
  { id: 14, nombre: 'Lucía', apellido: 'Díaz', estadisticas: {partidosJugados: 18, partidosGanados: 10}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 2, nombre: '2da' }},
  { id: 15, nombre: 'Martín', apellido: 'Vargas', estadisticas: {partidosJugados: 25, partidosGanados: 18}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 3, nombre: '3ra' }},
  { id: 16, nombre: 'Paula', apellido: 'Herrera', estadisticas: {partidosJugados: 22, partidosGanados: 15}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 3, nombre: '3ra' }},
  { id: 17, nombre: 'Javier', apellido: 'Soto', estadisticas: {partidosJugados: 30, partidosGanados: 20}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 3, nombre: '3ra' }},
  { id: 18, nombre: 'Valeria', apellido: 'Romero', estadisticas: {partidosJugados: 28, partidosGanados: 19}, club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo }, categoriaPrincipal: { id: 4, nombre: '1ra' }},
  { id: 19, nombre: 'Ricardo', apellido: 'Blanco', estadisticas: {partidosJugados: 35, partidosGanados: 25}, club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo }, categoriaPrincipal: { id: 4, nombre: '1ra' }},
  { id: 20, nombre: 'Florencia', apellido: 'Moreno', estadisticas: {partidosJugados: 32, partidosGanados: 22}, club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo }, categoriaPrincipal: { id: 4, nombre: '1ra' }},
];

// Datos de parejas de ejemplo para fixtures
const pair1A: IPareja = { id: 1, jugador1: mockPlayersData[0], jugador2: mockPlayersData[8], nombrePareja: "Los Padelistas" };
const pair1B: IPareja = { id: 2, jugador1: mockPlayersData[1], jugador2: mockPlayersData[9], nombrePareja: "Las Reinas de la Cancha" };
const pair2A: IPareja = { id: 3, jugador1: mockPlayersData[2], jugador2: mockPlayersData[10] };
const pair2B: IPareja = { id: 4, jugador1: mockPlayersData[3], jugador2: mockPlayersData[11] };
const pair3A: IPareja = { id: 5, jugador1: mockPlayersData[12], jugador2: mockPlayersData[13] };
const pair3B: IPareja = { id: 6, jugador1: mockPlayersData[14], jugador2: mockPlayersData[15] };
const pair4A: IPareja = { id: 7, jugador1: mockPlayersData[16], jugador2: mockPlayersData[17] };
const pair4B: IPareja = { id: 8, jugador1: mockPlayersData[18], jugador2: mockPlayersData[19] };

// Generic pairs for larger fixtures
const genericPair1: IPareja = { id: 20, jugador1: { nombre: 'Equipo', apellido: '1' }, jugador2: { nombre: 'Jugador', apellido: 'X' }};
const genericPair2: IPareja = { id: 21, jugador1: { nombre: 'Equipo', apellido: '2' }, jugador2: { nombre: 'Jugador', apellido: 'Y' }};
const genericPair3: IPareja = { id: 22, jugador1: { nombre: 'Equipo', apellido: '3' }, jugador2: { nombre: 'Jugador', apellido: 'Z' }};
const genericPair4: IPareja = { id: 23, jugador1: { nombre: 'Equipo', apellido: '4' }, jugador2: { nombre: 'Jugador', apellido: 'W' }};
const genericPair5: IPareja = { id: 24, jugador1: { nombre: 'Equipo', apellido: '5' }, jugador2: { nombre: 'Jugador', apellido: '1ra' }};
const genericPair6: IPareja = { id: 25, jugador1: { nombre: 'Equipo', apellido: '6' }, jugador2: { nombre: 'Jugador', apellido: 'B' }};
const genericPair7: IPareja = { id: 26, jugador1: { nombre: 'Equipo', apellido: '7' }, jugador2: { nombre: 'Jugador', apellido: 'C' }};
const genericPair8: IPareja = { id: 27, jugador1: { nombre: 'Equipo', apellido: '8' }, jugador2: { nombre: 'Jugador', apellido: 'D' }};
const genericPair9: IPareja = { id: 28, jugador1: { nombre: 'Equipo', apellido: '9' }, jugador2: { nombre: 'Jugador', apellido: 'E' }};
const genericPair10: IPareja = { id: 29, jugador1: { nombre: 'Equipo', apellido: '10' }, jugador2: { nombre: 'Jugador', apellido: 'F' }};
const genericPair11: IPareja = { id: 30, jugador1: { nombre: 'Equipo', apellido: '11' }, jugador2: { nombre: 'Jugador', apellido: 'G' }};
const genericPair12: IPareja = { id: 31, jugador1: { nombre: 'Equipo', apellido: '12' }, jugador2: { nombre: 'Jugador', apellido: 'H' }};
const genericPair13: IPareja = { id: 32, jugador1: { nombre: 'Equipo', apellido: '13' }, jugador2: { nombre: 'Jugador', apellido: 'I' }};
const genericPair14: IPareja = { id: 33, jugador1: { nombre: 'Equipo', apellido: '14' }, jugador2: { nombre: 'Jugador', apellido: 'J' }};
const genericPair15: IPareja = { id: 34, jugador1: { nombre: 'Equipo', apellido: '15' }, jugador2: { nombre: 'Jugador', apellido: 'K' }};
const genericPair16: IPareja = { id: 35, jugador1: { nombre: 'Equipo', apellido: '16' }, jugador2: { nombre: 'Jugador', apellido: 'L' }};
const genericPair17: IPareja = { id: 36, jugador1: { nombre: 'Equipo', apellido: '17' }, jugador2: { nombre: 'Jugador', apellido: 'M' }};
const genericPair18: IPareja = { id: 37, jugador1: { nombre: 'Equipo', apellido: '18' }, jugador2: { nombre: 'Jugador', apellido: 'N' }};
const genericPair19: IPareja = { id: 38, jugador1: { nombre: 'Equipo', apellido: '19' }, jugador2: { nombre: 'Jugador', apellido: 'O' }};
const genericPair20: IPareja = { id: 39, jugador1: { nombre: 'Equipo', apellido: '20' }, jugador2: { nombre: 'Jugador', apellido: 'P' }};
const genericPair21: IPareja = { id: 40, jugador1: { nombre: 'Equipo', apellido: '21' }, jugador2: { nombre: 'Jugador', apellido: 'Q' }};
const genericPair22: IPareja = { id: 41, jugador1: { nombre: 'Equipo', apellido: '22' }, jugador2: { nombre: 'Jugador', apellido: 'R' }};
const genericPair23: IPareja = { id: 42, jugador1: { nombre: 'Equipo', apellido: '23' }, jugador2: { nombre: 'Jugador', apellido: 'S' }};
const genericPair24: IPareja = { id: 43, jugador1: { nombre: 'Equipo', apellido: '24' }, jugador2: { nombre: 'Jugador', apellido: 'T' }};
const genericPair25: IPareja = { id: 44, jugador1: { nombre: 'Equipo', apellido: '25' }, jugador2: { nombre: 'Jugador', apellido: 'U' }};


// Datos de torneos de ejemplo, organizados por ID de club
export const mockTournaments: { [key: number]: ITorneo[] } = {
  1: [ // Club ID 1: Padel X3
    {
      id: 101,
      nombre: 'Torneo de Verano 2024',
      fechaInicio: '2024-07-01',
      fechaFin: '2024-07-15',
      estado: 'En Curso',
      categoria: [{ nombre: '1ra' }],
      maxParejas: 16,
      clubId: 1,
      fixture: {
        octavos: [
          { id: 1, pareja1: pair1A, pareja2: pair2A, resultado: null, ganador: null, estado: 'Programado' },
          { id: 2, pareja1: pair1B, pareja2: pair2B, resultado: '6-3, 6-4', ganador: pair1B, estado: 'Finalizado' },
          { id: 3, pareja1: genericPair1, pareja2: genericPair2, resultado: null, ganador: null, estado: 'Programado' },
          { id: 4, pareja1: genericPair3, pareja2: genericPair4, resultado: null, ganador: null, estado: 'Programado' },
          { id: 5, pareja1: genericPair5, pareja2: genericPair6, resultado: null, ganador: null, estado: 'Programado' },
          { id: 6, pareja1: genericPair7, pareja2: genericPair8, resultado: null, ganador: null, estado: 'Programado' },
          { id: 7, pareja1: genericPair9, pareja2: genericPair10, resultado: null, ganador: null, estado: 'Programado' },
          { id: 8, pareja1: genericPair11, pareja2: genericPair12, resultado: null, ganador: null, estado: 'Programado' },
        ],
        cuartos: [
            { id: 9, pareja1: pair1B, pareja2: { id: 9, jugador1: mockPlayersData[4], jugador2: mockPlayersData[5] }, resultado: null, ganador: null, estado: 'Programado' },
            { id: 10, pareja1: { id: 13, jugador1: mockPlayersData[14], jugador2: mockPlayersData[15] }, pareja2: pair2A, resultado: null, ganador: null, estado: 'Programado' },
            { id: 11, pareja1: genericPair13, pareja2: genericPair14, resultado: null, ganador: null, estado: 'Programado' },
            { id: 12, pareja1: genericPair15, pareja2: genericPair16, resultado: null, ganador: null, estado: 'Programado' },
        ],
        semifinales: [],
        final: [],
      }
    },
    {
      id: 102,
      nombre: 'Copa Primavera',
      fechaInicio: '2024-09-01',
      fechaFin: '2024-09-10',
      estado: 'Finalizado',
      categoria: [{ nombre: '2da' }],
      maxParejas: 8,
      clubId: 1,
      fixture: {
        cuartos: [
          { id: 1, pareja1: pair3A, pareja2: pair3B, resultado: '6-2, 6-3', ganador: pair3A, estado: 'Finalizado' },
          { id: 2, pareja1: pair4A, pareja2: pair4B, resultado: '7-5, 6-4', ganador: pair4A, estado: 'Finalizado' },
          { id: 3, pareja1: genericPair17, pareja2: genericPair18, resultado: '6-1, 6-0', ganador: genericPair17, estado: 'Finalizado' },
          { id: 4, pareja1: genericPair19, pareja2: genericPair20, resultado: '6-4, 7-6', ganador: genericPair19, estado: 'Finalizado' },
        ],
        semifinales: [
          { id: 5, pareja1: pair3A, pareja2: pair4A, resultado: '6-3, 7-5', ganador: pair3A, estado: 'Finalizado' },
          { id: 6, pareja1: genericPair17, pareja2: genericPair19, resultado: '6-2, 6-4', ganador: genericPair17, estado: 'Finalizado' },
        ],
        final: [
          { id: 7, pareja1: pair3A, pareja2: genericPair17, resultado: '6-4, 6-3', ganador: pair3A, estado: 'Finalizado' },
        ],
      }
    },
    {
      id: 103,
      nombre: 'Abierto de Invierno',
      fechaInicio: '2024-08-01',
      fechaFin: '2024-08-10',
      estado: 'Abierto',
      categoria: [{ nombre: '3ra' }],
      maxParejas: 25, // Adjusted to allow more rounds if needed
      clubId: 1,
      fixture: {
        treintaidosavos: [ // Example with more pairs
          { id: 20, pareja1: genericPair1, pareja2: genericPair2, resultado: null, ganador: null, estado: 'Programado' },
          { id: 21, pareja1: genericPair3, pareja2: genericPair4, resultado: null, ganador: null, estado: 'Programado' },
          { id: 22, pareja1: genericPair5, pareja2: genericPair6, resultado: null, ganador: null, estado: 'Programado' },
          { id: 23, pareja1: genericPair7, pareja2: genericPair8, resultado: null, ganador: null, estado: 'Programado' },
          { id: 24, pareja1: genericPair9, pareja2: genericPair10, resultado: null, ganador: null, estado: 'Programado' },
          { id: 25, pareja1: genericPair11, pareja2: genericPair12, resultado: null, ganador: null, estado: 'Programado' },
          { id: 26, pareja1: genericPair13, pareja2: genericPair14, resultado: null, ganador: null, estado: 'Programado' },
          { id: 27, pareja1: genericPair15, pareja2: genericPair16, resultado: null, ganador: null, estado: 'Programado' },
          { id: 28, pareja1: genericPair17, pareja2: genericPair18, resultado: null, ganador: null, estado: 'Programado' },
          { id: 29, pareja1: genericPair19, pareja2: genericPair20, resultado: null, ganador: null, estado: 'Programado' },
          { id: 30, pareja1: genericPair21, pareja2: genericPair22, resultado: null, ganador: null, estado: 'Programado' },
          { id: 31, pareja1: genericPair23, pareja2: genericPair24, resultado: null, ganador: null, estado: 'Programado' },
          { id: 32, pareja1: genericPair25, pareja2: null, resultado: null, ganador: null, estado: 'Programado' }, // Bye
        ],
        dieciseisavos: [], // To be completed if there are winners from thirty-second finals
        octavos: [],
        cuartos: [],
        semifinales: [],
        final: [],
      }
    }
  ],
  2: [ // Club ID 2: Osaka Padel
    { id: 201, nombre: 'Abierto de Otoño', fechaInicio: '2024-10-05', fechaFin: '2024-10-20', estado: 'Abierto', categoria: [{ nombre: '1ra' }, { nombre: 'Mixta' }], clubId: 2 },
  ],
};

// Datos de ranking por categoría de ejemplo, organizados por ID de club
export const mockCategoryRankings: { [key: number]: ICategoryRanking[] } = {
  1: [ // Club Padel X3
    {
      categoria: { nombre: '1ra' },
      entradasRanking: [
        { jugador: mockPlayersData[0], puntos: 1500, posicion: 1 }, // Juan Pérez
        { jugador: mockPlayersData[1], puntos: 1200, posicion: 2 }, // Ana García
        { jugador: mockPlayersData[8], puntos: 1000, posicion: 3 }, // Pedro Gómez
        { jugador: mockPlayersData[9], puntos: 800, posicion: 4 },  // Sofía Paz
        { jugador: mockPlayersData[10], puntos: 700, posicion: 5 }  // Diego Silva
      ]
    },
    {
      categoria: { nombre: '2da' },
      entradasRanking: [
        { jugador: mockPlayersData[2], puntos: 950, posicion: 1 },  // Carlos Ruiz
        { jugador: mockPlayersData[3], puntos: 780, posicion: 2 },  // Marta López
        { jugador: mockPlayersData[11], puntos: 650, posicion: 3 }, // Elena Rojas
        { jugador: mockPlayersData[12], puntos: 550, posicion: 4 }, // Andrés Castro
        { jugador: mockPlayersData[13], puntos: 450, posicion: 5 }  // Lucía Díaz
      ]
    },
    {
      categoria: { nombre: '3ra' },
      entradasRanking: [
        { jugador: mockPlayersData[4], puntos: 600, posicion: 1 },  // Franco EquipoUno
        { jugador: mockPlayersData[5], puntos: 550, posicion: 2 },  // Lucas EquipoTres
        { jugador: mockPlayersData[14], puntos: 500, posicion: 3 }, // Martín Vargas
        { jugador: mockPlayersData[15], puntos: 480, posicion: 4 }, // Paula Herrera
        { jugador: mockPlayersData[16], puntos: 400, posicion: 5 }  // Javier Soto
      ]
    },
  ],
  2: [ // Club Osaka Padel
    {
      categoria: { nombre: '1ra' },
      entradasRanking: [
        { jugador: mockPlayersData[6], puntos: 1600, posicion: 1 }, // Pedro Martínez
        { jugador: mockPlayersData[7], puntos: 1400, posicion: 2 }, // Laura Fernández
        { jugador: mockPlayersData[17], puntos: 1150, posicion: 3 },// Valeria Romero
        { jugador: mockPlayersData[18], puntos: 950, posicion: 4 }, // Ricardo Blanco
        { jugador: mockPlayersData[19], puntos: 850, posicion: 5 }  // Florencia Moreno
      ]
    },
  ],
};

// Datos de ranking global de ejemplo
export const mockGlobalRanking: IGlobalRankingEntry[] = [
  { jugador: mockPlayersData[6], puntosGlobales: 3000, posicionGlobal: 1 }, // Pedro Martínez
  { jugador: mockPlayersData[0], puntosGlobales: 2800, posicionGlobal: 2 }, // Juan Pérez
  { jugador: mockPlayersData[7], puntosGlobales: 2500, posicionGlobal: 3 }, // Laura Fernández
  { jugador: mockPlayersData[1], puntosGlobales: 2200, posicionGlobal: 4 }, // Ana García
  { jugador: mockPlayersData[2], puntosGlobales: 1800, posicionGlobal: 5 }, // Carlos Ruiz
  // More players can be added to the global ranking if desired
];

// Datos de sponsors de ejemplo
export const mockSponsors: ISponsor[] = [
  { id: 1, nombre: 'ENA', logoUrl: ENA, link: 'https://www.padelpro.com' },
  { id: 2, nombre: 'Aonken', logoUrl: Aonken, link: 'https://www.raquetaplus.com' },
  { id: 3, nombre: 'Promar', logoUrl: Promar, link: 'https://www.deportestotal.com' },
  { id: 4, nombre: 'Bullpadel', logoUrl:Bull, link: 'https://www.padelpro.com' },
  { id: 5, nombre: 'Codimat', logoUrl: Codimat, link: 'https://www.raquetaplus.com' },
  { id: 6, nombre: 'ADN', logoUrl: ADN, link: 'https://www.deportestotal.com' },
];
