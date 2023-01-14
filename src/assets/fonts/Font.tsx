/* eslint-disable import/no-unresolved */
// Handwritting 2
import Handwritting2Font from './CanadianPenguin.ttf?url';
// Handwritting
import HandwrittingFont from './Sigs.ttf?url';
// Retro
import RetroFont from './technofosiano.ttf?url';
// Doodle
import ChalkFont from './ChalkDash.otf?url';
// Sci-fi
import ScifiFont from './Groupe.otf?url';

// Default fonts
import ComicFont from './comic.ttf?url';
import ComicBoldFont from './comicbd.ttf?url';
import ComicItalicFont from './comici.ttf?url';

const fontImportList = [
	ComicFont,
	ComicBoldFont,
	ComicItalicFont,
	HandwrittingFont,
	Handwritting2Font,
	RetroFont,
	ChalkFont,
	ScifiFont,
];

const fontBufferPromises = Promise.all(
	fontImportList.map(async (font) => {
		const res = await fetch(font);
		return res.arrayBuffer();
	})
);

export default fontBufferPromises;
