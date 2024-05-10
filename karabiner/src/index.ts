import {
  map,
  rule,
  simlayer,
  withMapper,
  NumberKeyValue,
  writeToProfile,
} from 'karabiner.ts'


/*
github: https://github.com/evan-liu/karabiner.ts
docs: https://evan-liu.github.io/karabiner.ts/
*/


writeToProfile('Default profile', [

  /* hyperkey */

  rule('hyperkey').manipulators([
    map('caps_lock').to('r⌘', {right: '⌥⌃⇧'}).toIfAlone('⎋'),
    map('caps_lock', 'l⌥').to('l⌥', {right: '⌘⌥⌃⇧'}),
  ]),

  /* aerospace */

  rule('aerospace').manipulators([
    // switch to window
    map('h', {right: '⌘⌥⌃⇧'}).to$('aerospace focus left'),
    map('j', {right: '⌘⌥⌃⇧'}).to$('aerospace focus down'),
    map('k', {right: '⌘⌥⌃⇧'}).to$('aerospace focus up'),
    map('l', {right: '⌘⌥⌃⇧'}).to$('aerospace focus right'),
    // move to window
    map('h', {left: '⌥', right: '⌘⌥⌃⇧'}).to$('aerospace move left'),
    map('j', {left: '⌥', right: '⌘⌥⌃⇧'}).to$('aerospace move down'),
    map('k', {left: '⌥', right: '⌘⌥⌃⇧'}).to$('aerospace move up'),
    map('l', {left: '⌥', right: '⌘⌥⌃⇧'}).to$('aerospace move right'),

    // switch to workspace
    withMapper(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])((k) =>
      map(k, {right: '⌘⌥⌃⇧'}).to$(`aerospace workspace --auto-back-and-forth ${k}`),
    ),
    // move to workspace
    withMapper(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])((k) =>
      map(k, {left: '⌥', right: '⌘⌥⌃⇧'}).to$(`aerospace move-node-to-workspace ${k} && aerospace workspace ${k}`),
    ),
    // toggle workspace
    map('⇥', {right: '⌘⌥⌃⇧'}).to$('aerospace workspace-back-and-forth'),

    // switch to monitor
    withMapper(['q', 'w', 'e'])((k, i) =>
      map(k, {right: '⌘⌥⌃⇧'}).to$(`aerospace focus-monitor ${i+1}`),
    ),
    // move to monitor
    withMapper(['q', 'w', 'e'])((k, i) =>
      map(k, {left: '⌥', right: '⌘⌥⌃⇧'}).to$(`aerospace move-node-to-monitor ${i+1} && aerospace focus-monitor ${i+1}`),
    ),

    // fullscreen
    map('f', {right: '⌘⌥⌃⇧'}).to$('aerospace fullscreen'),

    // resize windows
    map(']', {right: '⌘⌥⌃⇧'}).to$('aerospace resize smart +50'), // plus
    map('/', {right: '⌘⌥⌃⇧'}).to$('aerospace resize smart -50'), // minus

    // layout windows
    map('t', {right: '⌘⌥⌃⇧'}).to$('aerospace layout floating tiling'),
    map('v', {right: '⌘⌥⌃⇧'}).to$('aerospace layout tiles vertical horizontal'),
    map('c', {right: '⌘⌥⌃⇧'}).to$('aerospace layout accordion horizontal vertical'),
  ]),

  simlayer('a', 'aerospace').manipulators([
    // reload aerospace config
    map('r').to$('aerospace reload-config && osascript -e \'display notification with title "reloaded aerospace config"\''),
    // edit aerospace config
    map('c').to$('code ~/dev/dots/.aerospace.toml'),
  ]),

  /* karabiner */

  simlayer('k', 'karabiner').manipulators([
    // paste modifier keys
    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
      map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    // paste special keys
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
      map(k).toPaste(k),
    ),
    // reload karabiner config
    map('r').to$('cd ~/dev/dots/karabiner/ && npm run build && osascript -e \'display notification with title "reloaded karabiner config"\''),
    // edit karabiner config
    map('c').to$('code ~/dev/dots/karabiner/src/index.ts'),
  ]),

  /* raycast */

  simlayer('r', 'raycast').manipulators([
    // open clipboard history
    map('h').to$('open raycast://extensions/raycast/clipboard-history/clipboard-history'),
    // open screenshots
    map('s').to$('open raycast://extensions/raycast/screenshots/search-screenshots'),
    // search files
    map('f').to$('open raycast://extensions/raycast/file-search/search-files'),
    // party with confetti
    map('p').to$('open raycast://extensions/raycast/raycast/confetti'),
    // open finder directory in terminal
    map('t').to$('open raycast://extensions/yedongze/terminalfinder/finderToWarp'),
    // open terminal directory in finder
    map('d').to$('open raycast://extensions/yedongze/terminalfinder/warpToFinder'),
  ])

])