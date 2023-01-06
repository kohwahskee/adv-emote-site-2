/* eslint-disable import/no-unresolved */
import {
	HandwrittingFont,
	RetroFont,
	ChalkFont,
	Handwritting2Font,
	ScifiFont,
	ComicBoldFont,
	ComicFont,
	ComicItalicFont,
} from '../../assets/fonts/Font';
import {
	LurkPSD,
	PeepoSignPSD,
	PeepoSignAnimatedPSD,
	PepegaSignPSD,
	ClapSignPSD,
	PepeHazmatPSD,
	PETPSD,
} from '../../assets/emotes/Emotes';

import { GenericTextTemplate, PepegaSignTemplate } from './PhotoshopScriptTemplates/Templates';

// fetch every font and convert each one to an array buffer
const fontImportList = [
	HandwrittingFont,
	RetroFont,
	ChalkFont,
	Handwritting2Font,
	ScifiFont,
	ComicFont,
	ComicBoldFont,
	ComicItalicFont,
];
const emoteImportList = [
	LurkPSD,
	PeepoSignPSD,
	PeepoSignAnimatedPSD,
	PepegaSignPSD,
	ClapSignPSD,
	PepeHazmatPSD,
	PETPSD,
];

const fontArrayBufferList = await Promise.all(
	(await Promise.all(fontImportList.map((font) => fetch(font)))).map((font) => font.arrayBuffer())
);
const emoteArrayBufferList = await Promise.all(
	(
		await Promise.all(emoteImportList.map((emote) => fetch(emote)))
	).map((emote) => emote.arrayBuffer())
);

const [
	handWrittingFontBuffer,
	retroFontBuffer,
	chalkFontBuffer,
	handwritting2FontBuffer,
	scifiFontBuffer,
	comicFontBuffer,
	comicBoldFontBuffer,
	comicItalicFontBuffer,
] = fontArrayBufferList;
const [
	lurkPSDBuffer,
	peepoSignPSDBuffer,
	peepoSignAnimatedPSDBuffer,
	pepegaSignPSDBuffer,
	clapSignPSDBuffer,
	pepeHazmatPSDBuffer,
	PETPSDBuffer,
] = emoteArrayBufferList;

const fontMap = {
	Handwritting: 'Sigs',
	Retro: 'Technofosiano',
	Doodle: 'ChalkDash',
	'Sci-fi': 'Groupe',
	'Handwritting 2': 'CanadianPenguin-Regular',
	'Comic Regular': 'ComicSansMS',
	'Comic Bold': 'ComicSansMS-Bold',
	'Comic Italic': 'ComicSansMS-Italic',
};

function getEmoteFromParams(param: string) {
	switch (param) {
		case 'lurk':
			return 'lurk';
		case 'PeepoSign':
			return 'PeepoSign';
		case 'PeepoSignAnimated':
			return 'PeepoSignAnimated';
		case 'PepegaSign':
			return 'PepegaSign';
		default:
			return 'lurk';
	}
}

const EMOTE_DEFAULTS = {
	lurk: {
		psd: lurkPSDBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		exportFormat: 'png',
		font: {
			name: 'Comic Italic',
			value: 'ComicSansMS-Italic',
			size: 111,
			color: '#000',
		},
	},
	PeepoSign: {
		psd: peepoSignPSDBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		exportFormat: 'png',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 108,
			color: '#3c1e14',
		},
	},
	PeepoSignAnimated: {
		psd: peepoSignAnimatedPSDBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		exportFormat: 'gif',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 108,
			color: '#3c1e14',
		},
	},
	PepegaSign: {
		psd: pepegaSignPSDBuffer,
		type: 'text',
		scriptTemplate: PepegaSignTemplate,
		exportFormat: 'gif',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 41,
			color: '#000',
		},
	},
};

type EmoteModifiers = {
	text: string;
	color: string;
	font: string;
	fontSize: number;
};

// type EmotePresets = 'lurk' | 'sign' | 'signA' | 'clapSign' | 'pepeHazmat' | 'PET' | 'pepegaSign';
type EmotePresets = 'lurk' | 'PeepoSign' | 'PeepoSignAnimated' | 'PepegaSign';

// Helpers
export { fontMap, EMOTE_DEFAULTS, getEmoteFromParams };

export {
	lurkPSDBuffer,
	peepoSignPSDBuffer,
	peepoSignAnimatedPSDBuffer,
	clapSignPSDBuffer,
	pepeHazmatPSDBuffer,
	PETPSDBuffer,
	pepegaSignPSDBuffer,
};

// shared fonts
export {
	handWrittingFontBuffer,
	retroFontBuffer,
	chalkFontBuffer,
	handwritting2FontBuffer,
	scifiFontBuffer,
};

// default fonts
export { comicFontBuffer, comicBoldFontBuffer, comicItalicFontBuffer };

export type { EmoteModifiers, EmotePresets };
