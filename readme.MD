NOTE:

1. If react-spring animation doesn't start or behave weirdly on 1st render, make sure to put a FROM property inside of useSpring's instantiation

TODO:

0. Restructure code so when new emote is added, only have to change from one source
1. Fix CSS to work on all browsers
2. Look into performance problems with animations on low-end config
   2.1 Try will-change
3. Look into Rive/Canvas blurred animation issue
4. Reset customizations when different emote preset is selected

HOWTO: WHEN ADDING NEW EMOTE PRESETS:

1. EMOTE_DEFAULTS in EmoteAssets
2. emoteSelections[] in EmoteSelectionPanel
3. update list from getEmoteFromParams() in EmoteAssets
4. type EmotePresets in EmoteAssets
