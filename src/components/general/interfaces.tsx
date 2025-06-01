// interfaces.ts
// Este archivo define todas las interfaces de datos utilizadas en la aplicación.

// Interfaz para las estadísticas de un jugador
export interface IEstadisticas {
  partidosJugados?: number;
  partidosGanados?: number;
  torneosJugados?: number;
  torneosGanados?: number;
}

// Interfaz para un jugador
export interface IJugador {
  id?: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  rankingGeneral?: number;
  estadisticas?: IEstadisticas;
  historialRanking?: any;
  club?: { id: number; nombre: string; logo?: string };
  categoriaPrincipal?: { id: number; nombre: string; };
}

// Interfaz para una pareja de jugadores
export interface IPareja {
  id?: number;
  jugador1: IJugador;
  jugador2: IJugador;
  nombrePareja?: string;
}

// Interfaz para una categoría
export interface ICategoria {
  nombre: string;
}

// Interfaz para un partido dentro de un fixture
export interface IPartidoFixture {
  id: number;
  pareja1: IPareja;
  pareja2: IPareja | null;
  resultado: string | null;
  ganador: IPareja | null;
  estado: 'Programado' | 'En Curso' | 'Finalizado' | 'Aplazado' | 'WO';
}

// Interfaz para el fixture de un torneo (organizado por rondas)
export interface IFixture {
  [ronda: string]: IPartidoFixture[];
}

// Interfaz para un torneo
export interface ITorneo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Abierto' | 'En Curso' | 'Finalizado' | 'Cancelado';
  categoria: ICategoria[];
  maxParejas?: number;
  fixture?: IFixture;
  clubId: number;
}

// Interfaz para un club
export interface IClub {
  id: number;
  nombre: string;
  direccion: string;
  logo: string;
  emailContacto?: string;
  telefono?: string;
}

// Interfaz para una entrada en el ranking por categoría
export interface IEntradaRanking {
  jugador: IJugador;
  puntos: number;
  posicion: number;
}

// Interfaz para el ranking de una categoría específica
export interface ICategoryRanking {
  categoria: ICategoria;
  entradasRanking: IEntradaRanking[];
}

// Interfaz para una entrada en el ranking global
export interface IGlobalRankingEntry {
  jugador: IJugador;
  puntosGlobales: number;
  posicionGlobal: number;
}

// Interfaz para un sponsor
export interface ISponsor {
  id: number;
  nombre: string;
  logoUrl: string;
  link: string;
}

// Interfaz para la estructura de un tema
export interface ITheme {
  bodyBg: string;
  headerBg: string;
  headerBorder: string;
  mainTitleColor: string;
  clubSelectBorder: string;
  clubSelectBg: string;
  clubSelectText: string;
  sponsorSectionBg: string;
  sponsorSectionBorder: string;
  sponsorTitleColor: string;
  clubInfoBg: string;
  clubInfoBorder: string;
  clubLogoBorder: string;
  clubNameColor: string;
  clubInfoTextColor: string;
  navBg: string;
  navBorder: string;
  tabActiveBg: string;
  tabActiveText: string;
  tabInactiveBg: string;
  tabInactiveText: string;
  mainContentBg: string;
  sectionTitleColor: string;
  sectionTitleBorder: string;
  tournamentCardBg: string;
  tournamentCardBorder: string;
  tournamentNameColor: string;
  tournamentDateColor: string;
  tournamentStatusInProgress: string;
  tournamentStatusOpen: string;
  tournamentStatusOther: string;
  tournamentTextColor: string;
  fixtureButtonBg: string;
  fixtureButtonText: string;
  tableHeaderBg: string;
  tableHeaderTextColor: string;
  tableRowEvenBg: string;
  tableRowOddBg: string;
  tableRowBorder: string;
  tableTextColor: string;
  tableAccentColor: string;
  modalBg: string;
  modalBorder: string;
  modalCloseButtonColor: string;
  modalTitleColor: string;
  modalTitleBorder: string;
  fixtureRoundHeaderColor: string;
  fixtureRoundHeaderBorder: string;
  fixtureMatchCardBg: string;
  fixtureMatchCardBorder: string;
  fixtureMatchTextColor: string;
  fixtureMatchSubtextColor: string;
  fixtureMatchWinnerColor: string;
  fixtureMatchStatusInProgress: string;
  fixtureMatchStatusFinalized: string;
  fixtureMatchStatusOther: string;
  footerBg: string;
  footerBorder: string;
  footerTextColor: string;
}

// Tipo para los nombres de los temas
export type ThemeName = 'classic' | 'impactful' | 'middle';
