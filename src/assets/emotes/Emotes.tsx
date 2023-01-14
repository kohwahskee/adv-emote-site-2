/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-unresolved */
import LurkPSD from './lurk.psd?url';
import PeepoSignPSD from './PeepoSign.psd?url';
import PeepoSignAnimatedPSD from './peepoSignAnimated.psd?url';
import ClapSignPSD from './clapSign.psd?url';
import PepeHazmatPSD from './pepeHazmat.psd?url';
import PETPSD from './PETTHEEMOTE.psd?url';
import PepegaSignPSD from './PepegaSign.psd?url';

const emoteImportList = [
	LurkPSD,
	PeepoSignPSD,
	PeepoSignAnimatedPSD,
	PepegaSignPSD,
	ClapSignPSD,
	PepeHazmatPSD,
	PETPSD,
];

const emoteBufferPromises = Promise.all(
	emoteImportList.map(async (emote) => {
		const res = await fetch(emote);
		return res.arrayBuffer();
	})
);

export default emoteBufferPromises;
