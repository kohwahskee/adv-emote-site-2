/* eslint-disable import/no-unresolved */
import fontBufferPromises from '../../assets/fonts/Font';
import emoteBufferPromises from '../../assets/emotes/Emotes';
import {
	GenericTextTemplate,
	PepegaSignTemplate,
} from './PhotoshopScriptTemplates/Templates';

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
		case 'KanaInsult':
			return 'KanaInsult';
		default:
			return 'lurk';
	}
}

// Promise order:
// 0: Lurk
// 1: PeepoSign
// 2: PeepoSignAnimated
// 3: PepegaSign
// 4: ClapSign
// 5: PepeHazmat
// 6: PET
const lurkBuffer = (async () => (await emoteBufferPromises)[0])();
const peepoSignBuffer = (async () => (await emoteBufferPromises)[1])();
const peepoSignAnimatedBuffer = (async () => (await emoteBufferPromises)[2])();
const pepegaSignBuffer = (async () => (await emoteBufferPromises)[3])();
// const clapSignBuffer = (async () => (await emoteBufferPromises)[4])();
// const pepeHazmatBuffer = (async () => (await emoteBufferPromises)[5])();
// const petBuffer = (async () => (await emoteBufferPromises)[6])();
const kanaInsultBuffer = (async () => (await emoteBufferPromises)[7])();

type Emote_Defaults = Record<
	string,
	{
		psd: Promise<ArrayBuffer>;
		type: 'text' | 'image';
		scriptTemplate: string;
		updateDelay: number;
		exportFormat: 'png' | 'gif';
		font: {
			name: string;
			value: string;
			size: number;
			color: string;
		};
	}
>;

const EMOTE_DEFAULTS: Emote_Defaults = {
	lurk: {
		psd: lurkBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		updateDelay: 100,
		exportFormat: 'png',
		font: {
			name: 'Comic Italic',
			value: 'ComicSansMS-Italic',
			size: 111,
			color: '#000',
		},
	},
	PeepoSign: {
		psd: peepoSignBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		updateDelay: 100,
		exportFormat: 'png',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 108,
			color: '#3c1e14',
		},
	},
	PeepoSignAnimated: {
		psd: peepoSignAnimatedBuffer,
		type: 'text',
		scriptTemplate: GenericTextTemplate,
		updateDelay: 300,
		exportFormat: 'gif',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 108,
			color: '#3c1e14',
		},
	},
	PepegaSign: {
		psd: pepegaSignBuffer,
		type: 'text',
		scriptTemplate: PepegaSignTemplate,
		updateDelay: 500,
		exportFormat: 'gif',
		font: {
			name: 'Comic Regular',
			value: 'ComicSansMS',
			size: 41,
			color: '#000',
		},
	},
	KanaInsult: {
		psd: kanaInsultBuffer,
		type: 'text',
		scriptTemplate: PepegaSignTemplate,
		updateDelay: 500,
		exportFormat: 'gif',
		font: {
			name: 'Handwritting',
			value: 'Sigs',
			size: 111,
			color: '#f36456',
		},
	},
};

type EmoteModifiers = {
	text: string;
	color: string;
	font: string;
	fontSize: number;
};
// Font order:
// 0: Comic
// 1: Comic Bold
// 2: Comic Italic
// 3: Handwritting
// 4: Handwritting 2
// 5: Retro
// 6: Doodle
// 7: Sci-fi
const comicFontBuffer = (async () => (await fontBufferPromises)[0])();
const comicBoldFontBuffer = (async () => (await fontBufferPromises)[1])();
const comicItalicFontBuffer = (async () => (await fontBufferPromises)[2])();
const handWrittingFontBuffer = (async () => (await fontBufferPromises)[3])();
const handwritting2FontBuffer = (async () => (await fontBufferPromises)[4])();
const retroFontBuffer = (async () => (await fontBufferPromises)[5])();
const chalkFontBuffer = (async () => (await fontBufferPromises)[6])();
const scifiFontBuffer = (async () => (await fontBufferPromises)[7])();

// type EmotePresets = 'lurk' | 'sign' | 'signA' | 'clapSign' | 'pepeHazmat' | 'PET' | 'pepegaSign' | 'kanaInsult';
type EmotePresets =
	| 'lurk'
	| 'PeepoSign'
	| 'PeepoSignAnimated'
	| 'PepegaSign'
	| 'KanaInsult';

// Helpers
export { fontMap, EMOTE_DEFAULTS, getEmoteFromParams };

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
