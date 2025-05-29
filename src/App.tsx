import React, { useState, useMemo } from 'react';
import ADN from './assets/ADN.png'
import ENA from './assets/ENA.png'
import Aonken from './assets/Aonken.png'
import Codimat from './assets/CODIMAT.png'
import Promar from './assets/promar.png'
import Bull from './assets/bullpadel.png'


// Asegúrate de que Tailwind CSS esté configurado en tu entorno de desarrollo.
// Para una demo rápida, puedes añadir el CDN de Tailwind en tu index.html:
// <script src="https://cdn.tailwindcss.com"></script>

// Importa el componente de estadísticas
// Asegúrate de que la ruta sea correcta según donde guardes PlayerStatisticsCard.tsx
import PlayerStatisticsCard from './components/PlayerStatisticsCard'; 

// --- Interfaces para tipar los datos ---
// Estas interfaces deben ser consistentes con los datos que recibes de Strapi
// y con los datos mock que usas.
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
  club?: { id: number; nombre: string; logo?: string }; // Simplificado para la demo, added logo
  categoriaPrincipal?: { id: number; nombre: string; }; // Simplificado para la demo
}

interface IPareja {
  id?: number;
  jugador1: IJugador; 
  jugador2: IJugador;
  nombrePareja?: string; // Nombre personalizado de la pareja (ej. "Los Invencibles")
}

interface ICategoria {
  nombre: string;
}

interface IPartidoFixture {
  id: number;
  pareja1: IPareja;
  pareja2: IPareja | null;
  resultado: string | null;
  ganador: IPareja | null;
  estado: 'Programado' | 'En Curso' | 'Finalizado' | 'Aplazado' | 'WO';
}

interface IFixture {
  [ronda: string]: IPartidoFixture[];
}

interface ITorneo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Abierto' | 'En Curso' | 'Finalizado' | 'Cancelado';
  categoria: ICategoria[];
  maxParejas?: number;
  fixture?: IFixture;
  clubId: number; // Added clubId to associate tournament with a club
}

interface IClub {
  id: number;
  nombre: string;
  direccion: string;
  logo: string;
  emailContacto?: string;
  telefono?: string;
}

interface IEntradaRanking {
  jugador: IJugador; // Ahora es un objeto IJugador completo
  puntos: number;
  posicion: number;
}

interface ICategoryRanking {
  categoria: ICategoria;
  entradasRanking: IEntradaRanking[];
}

interface IGlobalRankingEntry {
  jugador: IJugador; // Ahora es un objeto IJugador completo
  puntosGlobales: number;
  posicionGlobal: number;
}

interface ISponsor {
  id: number;
  nombre: string;
  logoUrl: string;
  link: string;
}


// --- Datos de Ejemplo (Mock Data) ---
// Estos datos son cruciales para la demo y deben ser consistentes con las interfaces.
const mockClubs: IClub[] = [
  {
    id: 1,
    nombre: 'Padel X3',
    direccion: 'Calle Falsa 123, Ciudad',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtIwvV6zx-Ey8tdb_opAEJruVLj5JedRDhg&s',
    emailContacto: 'info@padelcentral.com',
    telefono: '1122334455'
  },
  {
    id: 2,
    nombre: 'Osaka Padel',
    direccion: 'Avenida Siempre Viva 742, Pueblo',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeniK7L1PW3EjtLetpqz6LFkqd9GfdLXmp2A&s',
    emailContacto: 'contacto@raquetaexpress.com',
    telefono: '9988776655'
  },
];

// Datos de Jugadores completos para mockear las relaciones
const mockPlayersData: IJugador[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    rankingGeneral: 2,
    estadisticas: { partidosJugados: 280, partidosGanados: 200, torneosJugados: 25, torneosGanados: 8 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 1, nombre: '1ra' },
  },
  {
    id: 2,
    nombre: 'Ana',
    apellido: 'García',
    rankingGeneral: 4,
    estadisticas: { partidosJugados: 220, partidosGanados: 150, torneosJugados: 20, torneosGanados: 5 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 1, nombre: '1ra' },
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'Ruiz',
    rankingGeneral: 5,
    estadisticas: { partidosJugados: 180, partidosGanados: 100, torneosJugados: 18, torneosGanados: 2 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 2, nombre: '2da' },
  },
  {
    id: 4,
    nombre: 'Marta',
    apellido: 'López',
    rankingGeneral: 8,
    estadisticas: { partidosJugados: 150, partidosGanados: 80, torneosJugados: 12, torneosGanados: 1 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 2, nombre: '2da' },
  },
  {
    id: 5,
    nombre: 'Franco',
    apellido: 'EquipoUno', 
    rankingGeneral: 10,
    estadisticas: { partidosJugados: 70, partidosGanados: 50, torneosJugados: 8, torneosGanados: 0 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 3, nombre: '3ra' },
  },
  {
    id: 6,
    nombre: 'Lucas',
    apellido: 'EquipoTres', 
    rankingGeneral: 15,
    estadisticas: { partidosJugados: 60, partidosGanados: 40, torneosJugados: 7, torneosGanados: 0 },
    club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo },
    categoriaPrincipal: { id: 3, nombre: '3ra' },
  },
  {
    id: 7,
    nombre: 'Pedro',
    apellido: 'Martínez',
    rankingGeneral: 1,
    estadisticas: { partidosJugados: 300, partidosGanados: 250, torneosJugados: 30, torneosGanados: 10 },
    club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo },
    categoriaPrincipal: { id: 4, nombre: 'A' },
  },
  {
    id: 8,
    nombre: 'Laura',
    apellido: 'Fernández',
    rankingGeneral: 3,
    estadisticas: { partidosJugados: 280, partidosGanados: 200, torneosJugados: 28, torneosGanados: 7 },
    club: { id: 2, nombre: 'Osaka Padel', logo: mockClubs[1].logo },
    categoriaPrincipal: { id: 4, nombre: 'A' },
  },
  // Jugadores adicionales para conformar parejas en el fixture
  { id: 9, nombre: 'Pedro', apellido: 'Gómez', estadisticas: {partidosJugados: 10, partidosGanados: 5}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 10, nombre: 'Sofía', apellido: 'Paz', estadisticas: {partidosJugados: 12, partidosGanados: 6}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 11, nombre: 'Diego', apellido: 'Silva', estadisticas: {partidosJugados: 8, partidosGanados: 3}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 12, nombre: 'Rojas', apellido: 'Elena', estadisticas: {partidosJugados: 15, partidosGanados: 9}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 13, nombre: 'Andrés', apellido: 'Castro', estadisticas: {partidosJugados: 20, partidosGanados: 12}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 14, nombre: 'Lucía', apellido: 'Díaz', estadisticas: {partidosJugados: 18, partidosGanados: 10}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 15, nombre: 'Martín', apellido: 'Vargas', estadisticas: {partidosJugados: 25, partidosGanados: 18}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 16, nombre: 'Paula', apellido: 'Herrera', estadisticas: {partidosJugados: 22, partidosGanados: 15}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 17, nombre: 'Javier', apellido: 'Soto', estadisticas: {partidosJugados: 30, partidosGanados: 20}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 18, nombre: 'Valeria', apellido: 'Romero', estadisticas: {partidosJugados: 28, partidosGanados: 19}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 19, nombre: 'Ricardo', apellido: 'Blanco', estadisticas: {partidosJugados: 35, partidosGanados: 25}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
  { id: 20, nombre: 'Florencia', apellido: 'Moreno', estadisticas: {partidosJugados: 32, partidosGanados: 22}, club: { id: 1, nombre: 'Padel X3', logo: mockClubs[0].logo }, categoriaPrincipal: { id: 1, nombre: '1ra' }},
];

// Define parejas para el fixture, usando los IDs de mockPlayersData
const pair1A: IPareja = { id: 1, jugador1: mockPlayersData[0], jugador2: mockPlayersData[8], nombrePareja: "Los Padelistas" }; // Juan Pérez & Pedro Gómez
const pair1B: IPareja = { id: 2, jugador1: mockPlayersData[1], jugador2: mockPlayersData[9], nombrePareja: "Las Reinas de la Cancha" }; // Ana García & Sofía Paz
const pair2A: IPareja = { id: 3, jugador1: mockPlayersData[2], jugador2: mockPlayersData[10] }; // Carlos Ruiz & Diego Silva
const pair2B: IPareja = { id: 4, jugador1: mockPlayersData[3], jugador2: mockPlayersData[11] }; // Marta López & Elena Rojas
const pair3A: IPareja = { id: 5, jugador1: mockPlayersData[12], jugador2: mockPlayersData[13] }; // Andrés Castro & Lucía Díaz
const pair3B: IPareja = { id: 6, jugador1: mockPlayersData[14], jugador2: mockPlayersData[15] }; // Martín Vargas & Paula Herrera
const pair4A: IPareja = { id: 7, jugador1: mockPlayersData[16], jugador2: mockPlayersData[17] }; // Javier Soto & Valeria Romero
const pair4B: IPareja = { id: 8, jugador1: mockPlayersData[18], jugador2: mockPlayersData[19] }; // Ricardo Blanco & Florencia Moreno

// Parejas genéricas para "Abierto de Invierno"
const genericPair1: IPareja = { id: 20, jugador1: { nombre: 'Equipo', apellido: '1' }, jugador2: { nombre: 'Jugador', apellido: 'X' }};
const genericPair2: IPareja = { id: 21, jugador1: { nombre: 'Equipo', apellido: '2' }, jugador2: { nombre: 'Jugador', apellido: 'Y' }};
const genericPair3: IPareja = { id: 22, jugador1: { nombre: 'Equipo', apellido: '3' }, jugador2: { nombre: 'Jugador', apellido: 'Z' }};
const genericPair4: IPareja = { id: 23, jugador1: { nombre: 'Equipo', apellido: '4' }, jugador2: { nombre: 'Jugador', apellido: 'W' }};
const genericPair5: IPareja = { id: 24, jugador1: { nombre: 'Equipo', apellido: '5' }, jugador2: { nombre: 'Jugador', apellido: 'A' }};
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


const mockTournaments: { [key: number]: ITorneo[] } = {
  1: [ // Club ID 1: Padel X3
    {
      id: 101,
      nombre: 'Torneo de Verano 2024',
      fechaInicio: '2024-07-01',
      fechaFin: '2024-07-15',
      estado: 'En Curso',
      categoria: [{ nombre: '1ra' }],
      maxParejas: 16,
      clubId: 1, // Explicitly linking to club 1
      fixture: {
        octavos: [
          { id: 1, pareja1: pair1A, pareja2: pair2A, resultado: null, ganador: null, estado: 'Programado' },
          { id: 2, pareja1: pair1B, pareja2: pair2B, resultado: '6-3, 6-4', ganador: pair1B, estado: 'Finalizado' },
          { id: 3, pareja1: pair3A, pareja2: pair3B, resultado: null, ganador: null, estado: 'En Curso' },
          { id: 4, pareja1: pair4A, pareja2: pair4B, resultado: null, ganador: null, estado: 'Programado' },
          { id: 5, pareja1: { id: 9, jugador1: mockPlayersData[4], jugador2: mockPlayersData[5] }, pareja2: { id: 10, jugador1: mockPlayersData[6], jugador2: mockPlayersData[7] }, resultado: '7-5, 6-2', ganador: { id: 9, jugador1: mockPlayersData[4], jugador2: mockPlayersData[5] }, estado: 'Finalizado' },
          { id: 6, pareja1: { id: 11, jugador1: mockPlayersData[1], jugador2: mockPlayersData[12] }, pareja2: { id: 12, jugador1: mockPlayersData[13], jugador2: mockPlayersData[14] }, resultado: null, ganador: null, estado: 'Programado' },
          { id: 7, pareja1: { id: 13, jugador1: mockPlayersData[15], jugador2: mockPlayersData[16] }, pareja2: { id: 14, jugador1: mockPlayersData[17], jugador2: mockPlayersData[18] }, resultado: '6-1, 6-0', ganador: { id: 13, jugador1: mockPlayersData[15], jugador2: mockPlayersData[16] }, estado: 'Finalizado' },
          { id: 8, pareja1: { id: 15, jugador1: mockPlayersData[19], jugador2: mockPlayersData[0] }, pareja2: { id: 16, jugador1: mockPlayersData[8], jugador2: mockPlayersData[9] }, resultado: null, ganador: null, estado: 'Programado' },
        ],
        cuartos: [
          { id: 9, pareja1: pair1B, pareja2: { id: 9, jugador1: mockPlayersData[4], jugador2: mockPlayersData[5] }, resultado: null, ganador: null, estado: 'Programado' },
          { id: 10, pareja1: { id: 13, jugador1: mockPlayersData[15], jugador2: mockPlayersData[16] }, pareja2: pair2A, resultado: null, ganador: null, estado: 'Programado' },
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
      clubId: 1, // Explicitly linking to club 1
      fixture: {
        cuartos: [
          { id: 11, pareja1: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, pareja2: { jugador1: { nombre: 'Sofía', apellido: 'Castro' } as IJugador, jugador2: { nombre: 'Laura', apellido: 'Gomez' } as IJugador }, resultado: '6-2, 6-1', ganador: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, estado: 'Finalizado' },
          { id: 12, pareja1: { jugador1: { nombre: 'Luis', apellido: 'Herrera' } as IJugador, jugador2: { nombre: 'Pedro', apellido: 'Ruiz' } as IJugador }, pareja2: { jugador1: { nombre: 'Elena', apellido: 'Vargas' } as IJugador, jugador2: { nombre: 'Carla', apellido: 'Morales' } as IJugador }, resultado: '7-5, 4-6, 6-3', ganador: { jugador1: { nombre: 'Luis', apellido: 'Herrera' } as IJugador, jugador2: { nombre: 'Pedro', apellido: 'Ruiz' } as IJugador }, estado: 'Finalizado' },
          { id: 13, pareja1: { jugador1: { nombre: 'Andrea', apellido: 'Morales' } as IJugador, jugador2: { nombre: 'Julia', apellido: 'Soto' } as IJugador }, pareja2: { jugador1: { nombre: 'Javier', apellido: 'Gonzalez' } as IJugador, jugador2: { nombre: 'Pablo', apellido: 'Lopez' } as IJugador }, resultado: '6-0, 6-0', ganador: { jugador1: { nombre: 'Andrea', apellido: 'Morales' } as IJugador, jugador2: { nombre: 'Julia', apellido: 'Soto' } as IJugador }, estado: 'Finalizado' },
          { id: 14, pareja1: { jugador1: { nombre: 'Mariana', apellido: 'Giménez' } as IJugador, jugador2: { nombre: 'Luciana', apellido: 'Ferrari' } as IJugador }, pareja2: { jugador1: { nombre: 'Pablo', apellido: 'Núñez' } as IJugador, jugador2: { nombre: 'Fernando', apellido: 'Diaz' } as IJugador }, resultado: '6-4, 7-6', ganador: { jugador1: { nombre: 'Mariana', apellido: 'Giménez' } as IJugador, jugador2: { nombre: 'Luciana', apellido: 'Ferrari' } as IJugador }, estado: 'Finalizado' },
        ],
        semifinales: [
          { id: 15, pareja1: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, pareja2: { jugador1: { nombre: 'Luis', apellido: 'Herrera' } as IJugador, jugador2: { nombre: 'Pedro', apellido: 'Ruiz' } as IJugador }, resultado: '6-4, 6-2', ganador: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, estado: 'Finalizado' },
          { id: 16, pareja1: { jugador1: { nombre: 'Andrea', apellido: 'Morales' } as IJugador, jugador2: { nombre: 'Julia', apellido: 'Soto' } as IJugador }, pareja2: { jugador1: { nombre: 'Mariana', apellido: 'Giménez' } as IJugador, jugador2: { nombre: 'Luciana', apellido: 'Ferrari' } as IJugador }, resultado: '7-6, 6-3', ganador: { jugador1: { nombre: 'Andrea', apellido: 'Morales' } as IJugador, jugador2: { nombre: 'Julia', apellido: 'Soto' } as IJugador }, estado: 'Finalizado' },
        ],
        final: [
          { id: 17, pareja1: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, pareja2: { jugador1: { nombre: 'Andrea', apellido: 'Morales' } as IJugador, jugador2: { nombre: 'Julia', apellido: 'Soto' } as IJugador }, resultado: '6-3, 7-5', ganador: { jugador1: { nombre: 'Roberto', apellido: 'Diaz' } as IJugador, jugador2: { nombre: 'Andres', apellido: 'Perez' } as IJugador }, estado: 'Finalizado' },
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
      maxParejas: 25,
      clubId: 1, // Explicitly linking to club 1
      fixture: {
        treintaidosavos: [
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
          { id: 32, pareja1: genericPair25, pareja2: null, resultado: null, ganador: null, estado: 'Programado' },
        ],
        dieciseisavos: [],
        octavos: [],
        cuartos: [],
        semifinales: [],
        final: [],
      }
    }
  ],
  2: [ // Club ID 2: Osaka Padel
    { id: 201, nombre: 'Abierto de Otoño', fechaInicio: '2024-10-05', fechaFin: '2024-10-20', estado: 'Abierto', categoria: [{ nombre: 'A' }, { nombre: 'Mixta' }], clubId: 2 }, // Explicitly linking to club 2
  ],
};

const mockCategoryRankings: { [key: number]: ICategoryRanking[] } = {
  1: [
    { categoria: { nombre: '1ra' }, entradasRanking: [{ jugador: mockPlayersData[0], puntos: 1500, posicion: 1 }, { jugador: mockPlayersData[1], puntos: 1200, posicion: 2 }] },
    { categoria: { nombre: '2da' }, entradasRanking: [{ jugador: mockPlayersData[2], puntos: 900, posicion: 1 }, { jugador: mockPlayersData[3], puntos: 750, posicion: 2 }] },
    { categoria: { nombre: '3ra' }, entradasRanking: [{ jugador: mockPlayersData[4], puntos: 600, posicion: 1 }, { jugador: mockPlayersData[5], puntos: 550, posicion: 2 }] },
  ],
  2: [
    { categoria: { nombre: 'A' }, entradasRanking: [{ jugador: mockPlayersData[6], puntos: 1600, posicion: 1 }, { jugador: mockPlayersData[7], puntos: 1400, posicion: 2 }] },
  ],
};

const mockGlobalRanking: IGlobalRankingEntry[] = [
  { jugador: mockPlayersData[6], puntosGlobales: 3000, posicionGlobal: 1 }, // Pedro Martínez
  { jugador: mockPlayersData[0], puntosGlobales: 2800, posicionGlobal: 2 }, // Juan Pérez
  { jugador: mockPlayersData[7], puntosGlobales: 2500, posicionGlobal: 3 }, // Laura Fernández
  { jugador: mockPlayersData[1], puntosGlobales: 2200, posicionGlobal: 4 }, // Ana García
  { jugador: mockPlayersData[2], puntosGlobales: 1800, posicionGlobal: 5 }, // Carlos Ruiz
];

const mockSponsors: ISponsor[] = [
  { id: 1, nombre: 'ENA', logoUrl: ENA, link: 'https://www.padelpro.com' },
  { id: 2, nombre: 'Raqueta Plus', logoUrl: Aonken, link: 'https://www.raquetaplus.com' },
  { id: 3, nombre: 'Deportes Total', logoUrl: Promar, link: 'https://www.deportestotal.com' },
  { id: 4, nombre: 'ENA', logoUrl:Bull, link: 'https://www.padelpro.com' },
  { id: 5, nombre: 'Raqueta Plus', logoUrl: Codimat, link: 'https://www.raquetaplus.com' },
  { id: 6, nombre: 'Deportes Total', logoUrl: ADN, link: 'https://www.deportestotal.com' },
];


// --- Definición de Temas ---
const themes = {
  classic: {
    // Colores originales (azul, amarillo, blanco)
    bodyBg: 'bg-sky-50',
    headerBg: 'bg-white',
    headerBorder: 'border-amber-400',
    mainTitleColor: 'text-indigo-700',
    clubSelectBorder: 'border-blue-300',
    clubSelectBg: 'bg-white',
    clubSelectText: 'text-gray-800',
    sponsorSectionBg: 'bg-white',
    sponsorSectionBorder: 'border-blue-300',
    sponsorTitleColor: 'text-gray-700',
    clubInfoBg: 'bg-white',
    clubInfoBorder: 'border-amber-300',
    clubLogoBorder: 'border-blue-200',
    clubNameColor: 'text-indigo-600',
    clubInfoTextColor: 'text-gray-600',
    navBg: 'bg-white',
    navBorder: 'border-blue-300',
    tabActiveBg: 'bg-indigo-600',
    tabActiveText: 'text-white',
    tabInactiveBg: 'bg-blue-100',
    tabInactiveText: 'text-blue-700',
    mainContentBg: 'bg-white',
    sectionTitleColor: 'text-gray-700',
    sectionTitleBorder: 'border-amber-400',
    tournamentCardBg: 'bg-blue-50',
    tournamentCardBorder: 'border-blue-200',
    tournamentNameColor: 'text-indigo-700',
    tournamentDateColor: 'text-gray-500',
    tournamentStatusInProgress: 'text-green-600',
    tournamentStatusOpen: 'text-blue-600',
    tournamentStatusOther: 'text-red-600',
    tournamentTextColor: 'text-gray-600',
    fixtureButtonBg: 'bg-amber-500',
    fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-blue-100',
    tableHeaderTextColor: 'text-blue-700',
    tableRowEvenBg: 'bg-white',
    tableRowOddBg: 'bg-blue-50',
    tableRowBorder: 'border-blue-200',
    tableTextColor: 'text-gray-700',
    tableAccentColor: 'text-indigo-700',
    modalBg: 'bg-white',
    modalBorder: 'border-amber-400',
    modalCloseButtonColor: 'text-gray-500',
    modalTitleColor: 'text-indigo-700',
    modalTitleBorder: 'border-blue-400',
    fixtureRoundHeaderColor: 'text-blue-700',
    fixtureRoundHeaderBorder: 'border-amber-300',
    fixtureMatchCardBg: 'bg-white',
    fixtureMatchCardBorder: 'border-blue-200',
    fixtureMatchTextColor: 'text-gray-800',
    fixtureMatchSubtextColor: 'text-gray-600',
    fixtureMatchWinnerColor: 'text-green-700',
    fixtureMatchStatusInProgress: 'text-blue-700',
    fixtureMatchStatusFinalized: 'text-green-700',
    fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-white',
    footerBorder: 'border-blue-300',
    footerTextColor: 'text-gray-500',
  },
  impactful: {
    // Colores agresivos (oscuro, rojo, ámbar)
    bodyBg: 'bg-gray-900',
    headerBg: 'bg-zinc-800',
    headerBorder: 'border-red-600',
    mainTitleColor: 'text-amber-400',
    clubSelectBorder: 'border-red-500',
    clubSelectBg: 'bg-zinc-700',
    clubSelectText: 'text-white',
    sponsorSectionBg: 'bg-white',
    sponsorSectionBorder: 'border-amber-400',
    sponsorTitleColor: 'text-gray-200',
    clubInfoBg: 'bg-zinc-800',
    clubInfoBorder: 'border-red-500',
    clubLogoBorder: 'border-amber-400',
    clubNameColor: 'text-amber-400',
    clubInfoTextColor: 'text-gray-300',
    navBg: 'bg-zinc-800',
    navBorder: 'border-amber-400',
    tabActiveBg: 'bg-red-600',
    tabActiveText: 'text-white',
    tabInactiveBg: 'bg-zinc-700',
    tabInactiveText: 'text-gray-200',
    mainContentBg: 'bg-zinc-800',
    sectionTitleColor: 'text-amber-400',
    sectionTitleBorder: 'border-red-600',
    tournamentCardBg: 'bg-zinc-700',
    tournamentCardBorder: 'border-red-500',
    tournamentNameColor: 'text-red-400',
    tournamentDateColor: 'text-gray-400',
    tournamentStatusInProgress: 'text-green-400',
    tournamentStatusOpen: 'text-amber-400',
    tournamentStatusOther: 'text-gray-400',
    tournamentTextColor: 'text-gray-300',
    fixtureButtonBg: 'bg-red-600',
    fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-red-700',
    tableHeaderTextColor: 'text-white',
    tableRowEvenBg: 'bg-zinc-800',
    tableRowOddBg: 'bg-zinc-700',
    tableRowBorder: 'border-gray-700',
    tableTextColor: 'text-gray-200',
    tableAccentColor: 'text-amber-300',
    modalBg: 'bg-zinc-900',
    modalBorder: 'border-red-600',
    modalCloseButtonColor: 'text-red-400',
    modalTitleColor: 'text-amber-400',
    modalTitleBorder: 'border-red-500',
    fixtureRoundHeaderColor: 'text-red-400',
    fixtureRoundHeaderBorder: 'border-amber-400',
    fixtureMatchCardBg: 'bg-zinc-800',
    fixtureMatchCardBorder: 'border-amber-500',
    fixtureMatchTextColor: 'text-white',
    fixtureMatchSubtextColor: 'text-gray-400',
    fixtureMatchWinnerColor: 'text-green-500',
    fixtureMatchStatusInProgress: 'text-amber-400',
    fixtureMatchStatusFinalized: 'text-green-500',
    fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-zinc-800',
    footerBorder: 'border-red-600',
    footerTextColor: 'text-gray-500',
  },
  middle: {
    // Tema intermedio (verde, blanco, naranja suave)
    bodyBg: 'bg-gray-50',
    headerBg: 'bg-white',
    headerBorder: 'border-green-400',
    mainTitleColor: 'text-green-700',
    clubSelectBorder: 'border-green-300',
    clubSelectBg: 'bg-white',
    clubSelectText: 'text-gray-800',
    sponsorSectionBg: 'bg-white',
    sponsorSectionBorder: 'border-orange-300',
    sponsorTitleColor: 'text-gray-700',
    clubInfoBg: 'bg-white',
    clubInfoBorder: 'border-green-300',
    clubLogoBorder: 'border-orange-200',
    clubNameColor: 'text-green-600',
    clubInfoTextColor: 'text-gray-600',
    navBg: 'bg-white',
    navBorder: 'border-orange-300',
    tabActiveBg: 'bg-green-600',
    tabActiveText: 'text-white',
    tabInactiveBg: 'bg-gray-200',
    tabInactiveText: 'text-gray-700',
    mainContentBg: 'bg-white',
    sectionTitleColor: 'text-green-700',
    sectionTitleBorder: 'border-orange-400',
    tournamentCardBg: 'bg-green-50',
    tournamentCardBorder: 'border-green-200',
    tournamentNameColor: 'text-green-700',
    tournamentDateColor: 'text-gray-500',
    tournamentStatusInProgress: 'text-teal-600',
    tournamentStatusOpen: 'text-orange-600',
    tournamentStatusOther: 'text-red-500',
    tournamentTextColor: 'text-gray-600',
    fixtureButtonBg: 'bg-orange-500',
    fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-green-100',
    tableHeaderTextColor: 'text-green-700',
    tableRowEvenBg: 'bg-white',
    tableRowOddBg: 'bg-green-50',
    tableRowBorder: 'border-green-200',
    tableTextColor: 'text-gray-700',
    tableAccentColor: 'text-orange-600',
    modalBg: 'bg-white',
    modalBorder: 'border-orange-400',
    modalCloseButtonColor: 'text-gray-500',
    modalTitleColor: 'text-green-700',
    modalTitleBorder: 'border-orange-400',
    fixtureRoundHeaderColor: 'text-green-700',
    fixtureRoundHeaderBorder: 'border-orange-300',
    fixtureMatchCardBg: 'bg-white',
    fixtureMatchCardBorder: 'border-green-200',
    fixtureMatchTextColor: 'text-gray-800',
    fixtureMatchSubtextColor: 'text-gray-600',
    fixtureMatchWinnerColor: 'text-teal-700',
    fixtureMatchStatusInProgress: 'text-orange-600',
    fixtureMatchStatusFinalized: 'text-teal-600',
    fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-white',
    footerBorder: 'border-green-300',
    footerTextColor: 'text-gray-500',
  }
};

function App() {
  const [selectedClubId, setSelectedClubId] = useState<number | null>(mockClubs[0].id);
  const [activeTab, setActiveTab] = useState<'torneos' | 'rankingInterno' | 'rankingGlobal' | 'jugadores'>('torneos');
  const [selectedTournamentForFixture, setSelectedTournamentForFixture] = useState<ITorneo | null>(null);
  const [selectedPlayerForStats, setSelectedPlayerForStats] = useState<IJugador | null>(null); 
  const [currentTheme, setCurrentTheme] = useState<'classic' | 'impactful' | 'middle'>('middle');
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false); 

  // New state for player filters and sorting
  const [playerFilterClubId, setPlayerFilterClubId] = useState<number | 'all'>('all');
  const [playerSortOrder, setPlayerSortOrder] = useState<'default' | 'winRateDesc'>('default');


  const selectedClub = mockClubs.find(club => club.id === selectedClubId);
  const clubTournaments = selectedClubId ? mockTournaments[selectedClubId] || [] : [];
  const clubCategoryRankings = selectedClubId ? mockCategoryRankings[selectedClubId] || [] : [];

  const roundOrder = [
    'treintaidosavos', 'dieciseisavos', 'octavos', 'cuartos', 'semifinales', 'final'
  ];

  const theme = themes[currentTheme];

  // Helper function to find club logo by ID
  const getClubLogo = (clubId: number | undefined) => {
    if (!clubId) return null;
    const club = mockClubs.find(c => c.id === clubId);
    return club ? club.logo : null;
  };

  // Function to calculate win rate
  const calculateWinRate = (player: IJugador): number => {
    if (player.estadisticas?.partidosJugados && player.estadisticas.partidosJugados > 0) {
      return (player.estadisticas.partidosGanados || 0) / player.estadisticas.partidosJugados;
    }
    return 0;
  };

  // Memoized and filtered/sorted players list
  const filteredAndSortedPlayers = useMemo(() => {
    let players = [...mockPlayersData];

    // Filter by club
    if (playerFilterClubId !== 'all') {
      players = players.filter(player => player.club?.id === playerFilterClubId);
    }

    // Sort
    if (playerSortOrder === 'winRateDesc') {
      players.sort((a, b) => {
        const winRateA = calculateWinRate(a);
        const winRateB = calculateWinRate(b);
        return winRateB - winRateA; // Descending order
      });
    }
    // Default sorting could be by ranking or name, for now, it's just the order in mockPlayersData
    
    return players;
  }, [playerFilterClubId, playerSortOrder]);


  // Función para manejar el clic en un jugador del ranking
  const handlePlayerClick = (player: IJugador) => {
    setSelectedPlayerForStats(player);
  };

  return (
    <div className={`min-h-screen font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-500 ${theme.bodyBg} ${theme.tableTextColor}`}>
      {/* Selector de Tema Sutil (Flecha Desplegable) */}
      <div className="relative flex justify-center w-full mb-6 z-20"> {/* z-20 para asegurar que esté por encima de otros elementos */}
        <button
          className={` rounded-full  transition-all duration-300 ${theme.tabInactiveBg} hover:bg-opacity-80 flex items-center justify-center`}
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          aria-label="Seleccionar estilo"
        >
          <span className={`text-xl font-bold ${theme.tabInactiveText} transform transition-transform duration-300 ${showThemeSelector ? 'rotate-180' : 'rotate-0'}`}>&#9660;</span> {/* Flecha hacia abajo/arriba */}
        </button>
        {showThemeSelector && (
          <div className={`absolute top-full mt-2 w-48 ${theme.navBg} rounded-md shadow-lg py-1 z-10 origin-top animate-slide-down`}> {/* animate-slide-down */}
            <button
              className={`block w-full text-left px-4 py-2 text-sm font-semibold ${currentTheme === 'classic' ? `${theme.tabActiveBg} ${theme.tabActiveText}` : `${theme.tabInactiveText} hover:bg-gray-100`} transition-colors duration-200`}
              onClick={() => { setCurrentTheme('classic'); setShowThemeSelector(false); }}
            >
              Clásico
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm font-semibold ${currentTheme === 'middle' ? `${theme.tabActiveBg} ${theme.tabActiveText}` : `${theme.tabInactiveText} hover:bg-gray-100`} transition-colors duration-200`}
              onClick={() => { setCurrentTheme('middle'); setShowThemeSelector(false); }}
            >
              Moderno
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm font-semibold ${currentTheme === 'impactful' ? `${theme.tabActiveBg} ${theme.tabActiveText}` : `${theme.tabInactiveText} hover:bg-gray-100`} transition-colors duration-200`}
              onClick={() => { setCurrentTheme('impactful'); setShowThemeSelector(false); }}
            >
              Impactante
            </button>
          </div>
        )}
      </div>

      {/* Encabezado */}
      <header className={`${theme.headerBg} shadow-2xl rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 ${theme.headerBorder}`}>
        <h1 className={`text-3xl sm:text-4xl font-extrabold ${theme.mainTitleColor} drop-shadow-lg`}>
          PÁDEL MANAGER PRO
        </h1>
        {/* Selector de Club */}
        <div className="flex items-center gap-2">
          <label htmlFor="club-select" className={`text-lg font-semibold ${theme.sponsorTitleColor}`}>Arena:</label>
          <select
            id="club-select"
            className={`p-2 border ${theme.clubSelectBorder} rounded-lg shadow-md focus:ring-amber-400 focus:border-amber-400 ${theme.clubSelectBg} ${theme.clubSelectText} transition-all duration-200`}
            value={selectedClubId || ''}
            onChange={(e) => {
              setSelectedClubId(Number(e.target.value));
              setSelectedTournamentForFixture(null);
              setSelectedPlayerForStats(null); // Reset player stats view
            }}
          >
            {mockClubs.map(club => (
              <option key={club.id} value={club.id}>
                {club.nombre}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Sección de Sponsors */}
      <section className={`${theme.sponsorSectionBg} shadow-lg rounded-xl p-4 mb-8 border-b-2 ${theme.sponsorSectionBorder}`}>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700" >ALIADOS ESTRATÉGICOS</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {mockSponsors.map(sponsor => (
            <a key={sponsor.id} href={sponsor.link} target="_blank" rel="noopener noreferrer" className="block transform transition-transform duration-200 hover:scale-110">
              <img
                src={sponsor.logoUrl}
                alt={sponsor.nombre}
                className="h-12 object-contain rounded-md "
                onError={(e) => { e.currentTarget.src = `https://placehold.co/100x50/cccccc/333333?text=${sponsor.nombre.split(' ').map(n => n[0]).join('')}` }}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Información del Club Seleccionado */}
      {selectedClub && (
        <div className={`${theme.clubInfoBg} shadow-lg rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 border-b-2 ${theme.clubInfoBorder}`}>
          <img src={selectedClub.logo} alt={`Logo de ${selectedClub.nombre}`} className={`w-20 h-20 rounded-full border-4 ${theme.clubLogoBorder} object-cover shadow-md`} onError={(e) => { e.currentTarget.src = `https://placehold.co/60x60/cccccc/333333?text=${selectedClub.nombre.split(' ').map(n => n[0]).join('').substring(0,3)}` }} />
          <div>
            <h2 className={`text-2xl font-bold ${theme.clubNameColor}`}>{selectedClub.nombre}</h2>
            <p className={`${theme.clubInfoTextColor}`}>{selectedClub.direccion}</p>
            <p className={`${theme.clubInfoTextColor}`}>Contacto: {selectedClub.emailContacto} | {selectedClub.telefono}</p>
          </div>
        </div>
      )}

      {/* Navegación por Pestañas */}
      <nav className={`${theme.navBg} shadow-lg rounded-xl p-2 mb-8 flex flex-wrap justify-center gap-2 sm:gap-4 border-b-2 ${theme.navBorder}`}>
        <button
          className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${activeTab === 'torneos' ? `${theme.tabActiveBg} ${theme.tabActiveText} shadow-xl` : `${theme.tabInactiveBg} ${theme.tabInactiveText} hover:bg-opacity-80`}`}
          onClick={() => {
            setActiveTab('torneos');
            setSelectedTournamentForFixture(null);
            setSelectedPlayerForStats(null);
          }}
        >
          CAMPEONATOS
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${activeTab === 'rankingInterno' ? `${theme.tabActiveBg} ${theme.tabActiveText} shadow-xl` : `${theme.tabInactiveBg} ${theme.tabInactiveText} hover:bg-opacity-80`}`}
          onClick={() => {
            setActiveTab('rankingInterno');
            setSelectedTournamentForFixture(null);
            setSelectedPlayerForStats(null);
          }}
        >
          RANKING INTERNO
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${activeTab === 'rankingGlobal' ? `${theme.tabActiveBg} ${theme.tabActiveText} shadow-xl` : `${theme.tabInactiveBg} ${theme.tabInactiveText} hover:bg-opacity-80`}`}
          onClick={() => {
            setActiveTab('rankingGlobal');
            setSelectedTournamentForFixture(null);
            setSelectedPlayerForStats(null);
          }}
        >
          RANKING GLOBAL
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${activeTab === 'jugadores' ? `${theme.tabActiveBg} ${theme.tabActiveText} shadow-xl` : `${theme.tabInactiveBg} ${theme.tabInactiveText} hover:bg-opacity-80`}`}
          onClick={() => {
            setActiveTab('jugadores');
            setSelectedTournamentForFixture(null);
            setSelectedPlayerForStats(null);
          }}
        >
          JUGADORES
        </button>
      </nav>

      {/* Contenido de las Pestañas */}
      <main className={`${theme.mainContentBg} shadow-lg rounded-xl p-6`}>
        {activeTab === 'torneos' && (
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>ARENA DE CAMPEONES</h3>
            {clubTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubTournaments.map(tournament => {
                  const tournamentClubLogo = getClubLogo(tournament.clubId); // Get logo for the tournament's club
                  return (
                    <div key={tournament.id} className={`${theme.tournamentCardBg} p-6 rounded-lg shadow-xl border ${theme.tournamentCardBorder} hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between transform hover:scale-105`}>
                      <div>
                        <div className="flex items-center mb-2">
                          {tournamentClubLogo && (
                            <img
                              src={tournamentClubLogo}
                              alt="Club Logo"
                              className="h-8 w-8 mr-2 object-contain rounded-full border border-gray-300"
                              onError={(e) => { e.currentTarget.src = `https://placehold.co/32x32/cccccc/333333?text=Club` }}
                            />
                          )}
                          <h4 className={`text-xl font-bold ${theme.tournamentNameColor}`}>{tournament.nombre.toUpperCase()}</h4>
                        </div>
                        <p className={`text-sm ${theme.tournamentDateColor} mb-2`}>
                          {new Date(tournament.fechaInicio).toLocaleDateString()} - {new Date(tournament.fechaFin).toLocaleDateString()}
                        </p>
                        <p className={`font-semibold ${tournament.estado === 'En Curso' ? theme.tournamentStatusInProgress : tournament.estado === 'Abierto' ? theme.tournamentStatusOpen : theme.tournamentStatusOther} mb-2`}>
                          ESTADO: {tournament.estado.toUpperCase()}
                        </p>
                        <p className={`${theme.tournamentTextColor}`}>CATEGORÍAS: {tournament.categoria.map(cat => cat.nombre).join(', ')}</p>
                        {tournament.maxParejas && (
                          <p className={`${theme.tournamentTextColor}`}>MÁX. PAREJAS: {tournament.maxParejas}</p>
                        )}
                      </div>
                      {tournament.fixture && Object.keys(tournament.fixture).length > 0 && (
                        <button
                          className={`mt-4 w-full ${theme.fixtureButtonBg} ${theme.fixtureButtonText} py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md transform hover:scale-105 font-bold uppercase tracking-wide`}
                          onClick={() => setSelectedTournamentForFixture(tournament)}
                        >
                          VER CUADRO DE JUEGO
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={`${theme.tournamentTextColor} text-center py-8`}>¡NO HAY CAMPEONATOS DISPONIBLES EN ESTA ARENA!</p>
            )}
          </section>
        )}

        {activeTab === 'rankingInterno' && (
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
                            <tr key={`${entry.jugador.nombre}-${entry.jugador.apellido}`}
                                className={`${index % 2 === 0 ? theme.tableRowEvenBg : theme.tableRowOddBg} border-b ${theme.tableRowBorder} last:border-b-0 hover:bg-opacity-75 transition-colors duration-200 cursor-pointer`}
                                onClick={() => handlePlayerClick(entry.jugador)} // Hacer fila clicable
                            >
                              <td className={`py-3 px-4 ${theme.tableTextColor}`}>{entry.posicion}</td>
                              <td className={`py-3 px-4 ${theme.tableTextColor} flex items-center`}>
                                {entry.jugador.club?.logo && (
                                  <img
                                    src={entry.jugador.club.logo}
                                    alt="Club Logo"
                                    className="h-6 w-6 mr-2 object-contain rounded-full border border-gray-300"
                                    onError={(e) => { e.currentTarget.src = `https://placehold.co/24x24/cccccc/333333?text=Club` }}
                                  />
                                )}
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
        )}

        {activeTab === 'rankingGlobal' && (
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>LA CIMA DEL PÁDEL MUNDIAL</h3>
            {mockGlobalRanking.length > 0 ? (
              <div className="overflow-x-auto">
                <table className={`min-w-full ${theme.mainContentBg} rounded-lg shadow-sm`}>
                  <thead className={`${theme.tableHeaderBg}`}>
                    <tr>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tl-lg uppercase`}>Posición Global</th>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} uppercase`}>Jugador</th>
                      <th className={`py-3 px-4 text-left text-sm font-bold ${theme.tableHeaderTextColor} rounded-tr-lg uppercase`}>Puntos Globales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGlobalRanking.map((entry, index) => (
                      <tr key={`${entry.jugador.nombre}-${entry.jugador.apellido}`}
                          className={`${index % 2 === 0 ? theme.tableRowEvenBg : theme.tableRowOddBg} border-b ${theme.tableRowBorder} last:border-b-0 hover:bg-opacity-75 transition-colors duration-200 cursor-pointer`}
                          onClick={() => handlePlayerClick(entry.jugador)} // Hacer fila clicable
                      >
                        <td className={`py-3 px-4 ${theme.tableTextColor}`}>{entry.posicionGlobal}</td>
                        <td className={`py-3 px-4 ${theme.tableTextColor} flex items-center`}>
                          {entry.jugador.club?.logo && (
                            <img
                              src={entry.jugador.club.logo}
                              alt="Club Logo"
                              className="h-6 w-6 mr-2 object-contain rounded-full border border-gray-300"
                              onError={(e) => { e.currentTarget.src = `https://placehold.co/24x24/cccccc/333333?text=Club` }}
                            />
                          )}
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
        )}

        {activeTab === 'jugadores' && (
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" style={{ color: theme.sectionTitleColor, borderColor: theme.sectionTitleBorder }}>PERFILES DE JUGADORES</h3>
            
            {/* Player Filters and Sort Controls */}
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
                    <option key={club.id} value={club.id}>
                      {club.nombre}
                    </option>
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
                  <PlayerStatisticsCard key={player.id} player={player} />
                ))}
              </div>
            ) : (
              <p className={`${theme.tournamentTextColor} text-center py-8`}>No hay perfiles de jugadores disponibles con los filtros actuales.</p>
            )}
          </section>
        )}
      </main>

      {/* Modal de Fixture */}
      {selectedTournamentForFixture && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedTournamentForFixture(null)} // Cierra al clicar fuera
        >
          <div 
            className={`${theme.modalBg} rounded-xl shadow-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative border-4 ${theme.modalBorder} transform scale-95 animate-scale-in`}
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
          >
            <button
              className={`absolute top-4 right-4 ${theme.modalCloseButtonColor} hover:text-opacity-70 text-3xl font-bold transition-transform duration-200 hover:rotate-90`}
              onClick={() => setSelectedTournamentForFixture(null)}
            >
              &times;
            </button>
            <h3 className={`text-2xl font-bold mb-4 border-b-2 ${theme.modalTitleBorder} pb-2`} style={{ color: theme.modalTitleColor }}>
              CUADRO DE JUEGO: {selectedTournamentForFixture.nombre.toUpperCase()} ({selectedTournamentForFixture.categoria.map(cat => cat.nombre).join(', ')})
              {selectedTournamentForFixture.maxParejas && ` - MÁX. ${selectedTournamentForFixture.maxParejas} PAREJAS`}
            </h3>
            {selectedTournamentForFixture.fixture && Object.keys(selectedTournamentForFixture.fixture).length > 0 ? (
              <div className="flex flex-col sm:flex-row justify-around gap-4 overflow-x-auto pb-4">
                {roundOrder.map(rondaKey => {
                  const partidos = selectedTournamentForFixture.fixture?.[rondaKey];
                  if (!partidos || partidos.length === 0) return null;

                  const rondaDisplayName = rondaKey
                    .replace('treintaidosavos', '32AVOS')
                    .replace('dieciseisavos', '16AVOS')
                    .replace('octavos', '8VOS')
                    .replace('cuartos', '4TOS')
                    .replace('semifinales', 'SEMIFINALES')
                    .replace('final', 'FINAL');

                  return (
                    <div key={rondaKey} className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[200px] mb-4`}>
                      <h4 className={`text-lg font-bold mb-2 capitalize border-b-2 ${theme.fixtureRoundHeaderBorder} pb-1`} style={{ color: theme.fixtureRoundHeaderColor }}>
                        {rondaDisplayName}
                      </h4>
                      <div className="space-y-2">
                        {partidos.map(partido => (
                          <div key={partido.id} className={`${theme.fixtureMatchCardBg} p-3 rounded-lg shadow-md border ${theme.fixtureMatchCardBorder}`}>
                            <p className={`text-sm ${theme.fixtureMatchTextColor} font-medium`}>
                              {partido.pareja1.nombrePareja 
                                ? partido.pareja1.nombrePareja 
                                : `${partido.pareja1.jugador1.apellido} / ${partido.pareja1.jugador2.apellido}`}
                            </p>
                            <p className={`text-sm ${theme.fixtureMatchSubtextColor}`}>
                              {partido.pareja2 
                                ? (partido.pareja2.nombrePareja 
                                  ? `VS ${partido.pareja2.nombrePareja}` 
                                  : `VS ${partido.pareja2.jugador1.apellido} / ${partido.pareja2.jugador2.apellido}`) 
                                : 'ESPERANDO RIVAL'}
                            </p>
                            {partido.resultado && (
                              <p className={`text-xs ${theme.fixtureMatchSubtextColor}`}>RESULTADO: {partido.resultado}</p>
                            )}
                            {partido.ganador && (
                              <p className={`text-xs ${theme.fixtureMatchWinnerColor} font-bold`}>
                                GANADOR: {partido.ganador.nombrePareja 
                                  ? partido.ganador.nombrePareja 
                                  : `${partido.ganador.jugador1.apellido} / ${partido.ganador.jugador2.apellido}`}
                              </p>
                            )}
                            {partido.estado && (
                              <p className={`text-xs font-medium ${partido.estado === 'Finalizado' ? theme.fixtureMatchStatusFinalized : partido.estado === 'En Curso' ? theme.fixtureMatchStatusInProgress : theme.fixtureMatchStatusOther}`}>
                                ESTADO: {partido.estado.toUpperCase()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={`${theme.fixtureMatchSubtextColor} text-center py-8`}>¡EL CUADRO DE JUEGO AÚN NO ESTÁ DISPONIBLE PARA ESTE TORNEO!</p>
            )}
          </div>
        </div>
      )}

      {/* Modal de Estadísticas del Jugador */}
      {selectedPlayerForStats && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedPlayerForStats(null)} // Cierra al clicar fuera
        >
          <div 
            className={`${theme.modalBg} rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative border-4 ${theme.modalBorder} transform scale-95 animate-scale-in`}
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
          >
            <button
              className={`absolute top-4 right-4 ${theme.modalCloseButtonColor} hover:text-opacity-70 text-3xl font-bold transition-transform duration-200 hover:rotate-90`}
              onClick={() => setSelectedPlayerForStats(null)}
            >
              &times;
            </button>
            <h3 className={`text-2xl font-bold mb-4 border-b-2 ${theme.modalTitleBorder} pb-2`} style={{ color: theme.modalTitleColor }}>
              ESTADÍSTICAS DE {selectedPlayerForStats.nombre.toUpperCase()} {selectedPlayerForStats.apellido.toUpperCase()}
            </h3>
            <PlayerStatisticsCard player={selectedPlayerForStats} />
          </div>
        </div>
      )}

      {/* Pie de página */}
      <footer className={`text-center text-sm mt-8 p-4 rounded-xl shadow-lg border-t-2 ${theme.footerBg} ${theme.footerBorder} ${theme.footerTextColor}`}>
        © {new Date().getFullYear()} PÁDEL MANAGER PRO. ¡DOMINA LA CANCHA!
      </footer>
    </div>
  );
}

export default App;