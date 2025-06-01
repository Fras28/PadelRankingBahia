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
  impactful: {
    bodyBg: 'bg-gray-900', headerBg: 'bg-zinc-800', headerBorder: 'border-red-600', mainTitleColor: 'text-amber-400',
    clubSelectBorder: 'border-red-500', clubSelectBg: 'bg-zinc-700', clubSelectText: 'text-white',
    sponsorSectionBg: 'bg-zinc-800', sponsorSectionBorder: 'border-amber-400', sponsorTitleColor: 'text-gray-200',
    clubInfoBg: 'bg-zinc-800', clubInfoBorder: 'border-red-500', clubLogoBorder: 'border-amber-400', clubNameColor: 'text-amber-400', clubInfoTextColor: 'text-gray-300',
    navBg: 'bg-zinc-800', navBorder: 'border-amber-400', tabActiveBg: 'bg-red-600', tabActiveText: 'text-white', tabInactiveBg: 'bg-zinc-700', tabInactiveText: 'text-gray-200',
    mainContentBg: 'bg-zinc-800', sectionTitleColor: 'text-amber-400', sectionTitleBorder: 'border-red-600',
    tournamentCardBg: 'bg-zinc-700', tournamentCardBorder: 'border-red-500', tournamentNameColor: 'text-red-400', tournamentDateColor: 'text-gray-400',
    tournamentStatusInProgress: 'text-green-400', tournamentStatusOpen: 'text-amber-400', tournamentStatusOther: 'text-gray-400', tournamentTextColor: 'text-gray-300',
    fixtureButtonBg: 'bg-red-600', fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-red-700', tableHeaderTextColor: 'text-white', tableRowEvenBg: 'bg-zinc-800', tableRowOddBg: 'bg-zinc-700', tableRowBorder: 'border-gray-700', tableTextColor: 'text-gray-200', tableAccentColor: 'text-amber-300',
    modalBg: 'bg-zinc-900', modalBorder: 'border-red-600', modalCloseButtonColor: 'text-red-400', modalTitleColor: 'text-amber-400', modalTitleBorder: 'border-red-500',
    fixtureRoundHeaderColor: 'text-red-400', fixtureRoundHeaderBorder: 'border-amber-400', fixtureMatchCardBg: 'bg-zinc-800', fixtureMatchCardBorder: 'border-amber-500', fixtureMatchTextColor: 'text-white', fixtureMatchSubtextColor: 'text-gray-400', fixtureMatchWinnerColor: 'text-green-500',
    fixtureMatchStatusInProgress: 'text-amber-400', fixtureMatchStatusFinalized: 'text-green-500', fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-zinc-800', footerBorder: 'border-red-600', footerTextColor: 'text-gray-500',
  },
  middle: {
    bodyBg: 'bg-gray-50', headerBg: 'bg-white', headerBorder: 'border-green-400', mainTitleColor: 'text-green-700',
    clubSelectBorder: 'border-green-300', clubSelectBg: 'bg-white', clubSelectText: 'text-gray-800',
    sponsorSectionBg: 'bg-white', sponsorSectionBorder: 'border-orange-300', sponsorTitleColor: 'text-gray-700',
    clubInfoBg: 'bg-white', clubInfoBorder: 'border-green-300', clubLogoBorder: 'border-orange-200', clubNameColor: 'text-green-600', clubInfoTextColor: 'text-gray-600',
    navBg: 'bg-white', navBorder: 'border-orange-300', tabActiveBg: 'bg-green-600', tabActiveText: 'text-white', tabInactiveBg: 'bg-gray-200', tabInactiveText: 'text-gray-700',
    mainContentBg: 'bg-white', sectionTitleColor: 'text-green-700', sectionTitleBorder: 'border-orange-400',
    tournamentCardBg: 'bg-green-50', tournamentCardBorder: 'border-green-200', tournamentNameColor: 'text-green-700', tournamentDateColor: 'text-gray-500',
    tournamentStatusInProgress: 'text-teal-600', tournamentStatusOpen: 'text-orange-600', tournamentStatusOther: 'text-red-500', tournamentTextColor: 'text-gray-600',
    fixtureButtonBg: 'bg-orange-500', fixtureButtonText: 'text-white',
    tableHeaderBg: 'bg-green-100', tableHeaderTextColor: 'text-green-700', tableRowEvenBg: 'bg-white', tableRowOddBg: 'bg-green-50', tableRowBorder: 'border-green-200', tableTextColor: 'text-gray-700', tableAccentColor: 'text-orange-600',
    modalBg: 'bg-white', modalBorder: 'border-orange-400', modalCloseButtonColor: 'text-gray-500', modalTitleColor: 'text-green-700', modalTitleBorder: 'border-orange-400',
    fixtureRoundHeaderColor: 'text-green-700', fixtureRoundHeaderBorder: 'border-orange-300', fixtureMatchCardBg: 'bg-white', fixtureMatchCardBorder: 'border-green-200', fixtureMatchTextColor: 'text-gray-800', fixtureMatchSubtextColor: 'text-gray-600', fixtureMatchWinnerColor: 'text-teal-700',
    fixtureMatchStatusInProgress: 'text-orange-600', fixtureMatchStatusFinalized: 'text-teal-600', fixtureMatchStatusOther: 'text-gray-500',
    footerBg: 'bg-white', footerBorder: 'border-green-300', footerTextColor: 'text-gray-500',
  }
};
