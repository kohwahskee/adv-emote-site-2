NOTE:

1. If react-spring animation doesn't start or behave weirdly on 1st render, make sure to put a FROM property inside of useSpring's instantiation

TODO:

1. Restructure code so when new emote is added, only have to change from one source
2. Look into performance problems with animations on low-end config
   2.1 Try will-change (Tested -> doesn't help much) ✅
3. Add dragging boundary (selection bounces back if out of bound)
4. Emote not loaded when picked from homepage
5. Try hard coding emote links instead of using generateSelectionLinks()

HOWTO: WHEN ADDING NEW EMOTE PRESETS:

1. EMOTE_DEFAULTS in EmoteAssets
2. emoteSelections[] in EmoteSelectionPanel
3. update list from getEmoteFromParams() in EmoteAssets
4. type EmotePresets in EmoteAssets
