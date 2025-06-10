// themes.ts
// Este archivo define los diferentes temas visuales para la aplicación.

import { ITheme } from './interfaces';

// Definición de temas
export const themes: { [key: string]: ITheme } = {
  classic: {
    bodyBg: 'bg-sky-50', headerBg: 'bg-white', headerBorder: 'border-amber-400', mainTitleColor: 'text-indigo-700',
    clubSelectBorder: 'border-blue-300', clubSelectBg: 'bg-white', clubSelectText: 'text-gray-800',
    sponsorSectionBg: 'bg-white', sponsorSectionBorder: 'border-blue-300', sponsorTitleColor: 'text-gray-700',
    clubInfoBg: 'bg-white', clubInfoBorder: 'border-amber-300', clubLogoBorder: 'border-blue-200', clubNameColor: 'text-indigo-600', clubInfoTextColor: 'text-gray-600',
    navBg: 'bg-white', navBorder: 'border-blue-300', tabActiveBg: 'bg-indigo-600', tabActiveText: 'text-white', tabInactiveBg: 'bg-blue-100', tabInactiveText: 'text-blue-700',
    mainContentBg: 'bg-white', sectionTitleColor: 'text-gray-700', sectionTitleBorder: 'border-amber-400',
    tournamentCardBg: 'bg-blue-50', tournamentCardBorder: 'border-blue-200', tournamentNameColor: 'text-indigo-700', tournamentDateColor: 'text-gray-500',
    tournamentStatusInProgress: 'text-green-600', tournamentStatusOpen: 'text-blue-600', tournamentStatusOther: 'text-red-600', tournamentTextColor: 'text-gray-600',
    fixtureButtonBg: 'bg-amber-500', fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-blue-100', tableHeaderTextColor: 'text-blue-700', tableRowEvenBg: 'bg-white', tableRowOddBg: 'bg-blue-50', tableRowBorder: 'border-blue-200', tableTextColor: 'text-gray-700', tableAccentColor: 'text-indigo-700',
    modalBg: 'bg-white', modalBorder: 'border-amber-400', modalCloseButtonColor: 'text-gray-500', modalTitleColor: 'text-indigo-700', modalTitleBorder: 'border-blue-400',
    fixtureRoundHeaderColor: 'text-blue-700', fixtureRoundHeaderBorder: 'border-amber-300', fixtureMatchCardBg: 'bg-white', fixtureMatchCardBorder: 'border-blue-200', fixtureMatchTextColor: 'text-gray-800', fixtureMatchSubtextColor: 'text-gray-600', fixtureMatchWinnerColor: 'text-green-700',
    fixtureMatchStatusInProgress: 'text-blue-700', fixtureMatchStatusFinalized: 'text-green-700', fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-white', footerBorder: 'border-blue-300', footerTextColor: 'text-gray-500',
  },
  
  // Tema para Padel X3 - Verde neón (#9dff00), negro y blanco
  middle: {
    bodyBg: 'bg-black', 
    headerBg: 'bg-gray-900', 
    headerBorder: 'border-[#9dff00]', 
    mainTitleColor: 'text-[#9dff00]',
    
    clubSelectBorder: 'border-[#9dff00]', 
    clubSelectBg: 'bg-gray-800', 
    clubSelectText: 'text-white',
    
    sponsorSectionBg: 'bg-gray-900', 
    sponsorSectionBorder: 'border-[#9dff00]', 
    sponsorTitleColor: 'text-[#9dff00]',
    
    clubInfoBg: 'bg-gray-900', 
    clubInfoBorder: 'border-[#9dff00]', 
    clubLogoBorder: 'border-[#9dff00]', 
    clubNameColor: 'text-[#9dff00]', 
    clubInfoTextColor: 'text-gray-300',
    
    navBg: 'bg-gray-900', 
    navBorder: 'border-[#9dff00]', 
    tabActiveBg: 'bg-[#9dff00]', 
    tabActiveText: 'text-black', 
    tabInactiveBg: 'bg-gray-700', 
    tabInactiveText: 'text-[#9dff00]',
    
    mainContentBg: 'bg-gray-900', 
    sectionTitleColor: 'text-[#9dff00]', 
    sectionTitleBorder: 'border-[#9dff00]',
    
    tournamentCardBg: 'bg-gray-800', 
    tournamentCardBorder: 'border-[#9dff00]', 
    tournamentNameColor: 'text-[#9dff00]', 
    tournamentDateColor: 'text-gray-400',
    
    tournamentStatusInProgress: 'text-[#9dff00]', 
    tournamentStatusOpen: 'text-[#9dff00]', 
    tournamentStatusOther: 'text-gray-400', 
    tournamentTextColor: 'text-gray-300',
    
    fixtureButtonBg: 'bg-[#9dff00]', 
    fixtureButtonText: 'text-black',
    
    tableHeaderBg: 'bg-[#9dff00]', 
    tableHeaderTextColor: 'text-black', 
    tableRowEvenBg: 'bg-gray-900', 
    tableRowOddBg: 'bg-gray-800', 
    tableRowBorder: 'border-gray-700', 
    tableTextColor: 'text-gray-200', 
    tableAccentColor: 'text-[#9dff00]',
    
    modalBg: 'bg-gray-900', 
    modalBorder: 'border-[#9dff00]', 
    modalCloseButtonColor: 'text-[#9dff00]', 
    modalTitleColor: 'text-[#9dff00]', 
    modalTitleBorder: 'border-[#9dff00]',
    
    fixtureRoundHeaderColor: 'text-[#9dff00]', 
    fixtureRoundHeaderBorder: 'border-[#9dff00]', 
    fixtureMatchCardBg: 'bg-gray-800', 
    fixtureMatchCardBorder: 'border-[#9dff00]', 
    fixtureMatchTextColor: 'text-white', 
    fixtureMatchSubtextColor: 'text-gray-400', 
    fixtureMatchWinnerColor: 'text-[#9dff00]',
    
    fixtureMatchStatusInProgress: 'text-[#9dff00]', 
    fixtureMatchStatusFinalized: 'text-[#9dff00]', 
    fixtureMatchStatusOther: 'text-gray-500',
    
    footerBg: 'bg-gray-900', 
    footerBorder: 'border-[#9dff00]', 
    footerTextColor: 'text-gray-500',
  },
  
  // Tema para Osaka Padel - Rojo, negro y blanco
  impactful: {
    bodyBg: 'bg-black', 
    headerBg: 'bg-gray-900', 
    headerBorder: 'border-red-500', 
    mainTitleColor: 'text-red-500',
    
    clubSelectBorder: 'border-red-500', 
    clubSelectBg: 'bg-gray-800', 
    clubSelectText: 'text-white',
    
    sponsorSectionBg: 'bg-gray-900', 
    sponsorSectionBorder: 'border-red-500', 
    sponsorTitleColor: 'text-red-300',
    
    clubInfoBg: 'bg-gray-900', 
    clubInfoBorder: 'border-red-500', 
    clubLogoBorder: 'border-red-500', 
    clubNameColor: 'text-red-500', 
    clubInfoTextColor: 'text-gray-300',
    
    navBg: 'bg-gray-900', 
    navBorder: 'border-red-500', 
    tabActiveBg: 'bg-red-600', 
    tabActiveText: 'text-white', 
    tabInactiveBg: 'bg-gray-700', 
    tabInactiveText: 'text-red-300',
    
    mainContentBg: 'bg-gray-900', 
    sectionTitleColor: 'text-red-500', 
    sectionTitleBorder: 'border-red-500',
    
    tournamentCardBg: 'bg-gray-800', 
    tournamentCardBorder: 'border-red-500', 
    tournamentNameColor: 'text-red-500', 
    tournamentDateColor: 'text-gray-400',
    
    tournamentStatusInProgress: 'text-red-400', 
    tournamentStatusOpen: 'text-red-300', 
    tournamentStatusOther: 'text-gray-400', 
    tournamentTextColor: 'text-gray-300',
    
    fixtureButtonBg: 'bg-red-600', 
    fixtureButtonText: 'text-white',
    
    tableHeaderBg: 'bg-red-600', 
    tableHeaderTextColor: 'text-white', 
    tableRowEvenBg: 'bg-gray-900', 
    tableRowOddBg: 'bg-gray-800', 
    tableRowBorder: 'border-gray-700', 
    tableTextColor: 'text-gray-200', 
    tableAccentColor: 'text-red-400',
    
    modalBg: 'bg-gray-900', 
    modalBorder: 'border-red-500', 
    modalCloseButtonColor: 'text-red-400', 
    modalTitleColor: 'text-red-500', 
    modalTitleBorder: 'border-red-500',
    
    fixtureRoundHeaderColor: 'text-red-500', 
    fixtureRoundHeaderBorder: 'border-red-500', 
    fixtureMatchCardBg: 'bg-gray-800', 
    fixtureMatchCardBorder: 'border-red-500', 
    fixtureMatchTextColor: 'text-white', 
    fixtureMatchSubtextColor: 'text-gray-400', 
    fixtureMatchWinnerColor: 'text-red-400',
    
    fixtureMatchStatusInProgress: 'text-red-300', 
    fixtureMatchStatusFinalized: 'text-red-400', 
    fixtureMatchStatusOther: 'text-gray-500',
    
    footerBg: 'bg-gray-900', 
    footerBorder: 'border-red-500', 
    footerTextColor: 'text-gray-500',
  }
};