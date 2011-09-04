# SC-Chess

SC-Chess is a chess viewer written using Sproutcore 2.0.  
See a classic game in action [here](http://dmarcotte.github.com/sc-chess/immortal.html),
and a not-so-classic game [here](http://dmarcotte.github.com/sc-chess/amateur.html).

## Purpose

SC-Chess was built to provide a fun, clear way to present a crash course on
Sproutcore 2.

* The presentation can be found in presentation.js.  Some of it may be a bit
vague in the absence of the talky parts, but it should still do a decent job
of exploring the app while pointing to some of the features of Sproutcore 2
and how they work.

* The code corresponding directly to the presentation can be found at the
presentation-v1 tag.

## Todos

* More controls ('previous', 'begin', 'end', 'reset', etc.) would clearly be
nice

* Provide a way to swap between some predefined games

* Related to resetting and loading different games, it would be nice to define
a better interface for the app than
"Chess.gameController.set('gameDefinition', Chess.game);"

* There's a missed opportunity here to show off one of the huge benefits
of using Sproutcore to bring structure to this app:
there should be tests demonstrating how testable the app is

* A .pgn -> Chess.Game parser would be totally badass.  We could even have
a text input so that people can paste in any game they want, and the app
plays it through

* A completely different "view" would be a compelling demonstration of the app
architecture.  Should be easy to instantiate a gameController (but
no SC.Views), and step through it console.logging each move on a text
'board')

* The unicode pieces are fun, but it'd be nice to have some slick images
instead.  In fact, it would be sweet if someone with non-trivial design savvy
gave the whole thing a coat of paint...

* Provide a mobile-friendly view

* Super-ambitious todo: it would be neat to make a version of this which is
actually playable, ideally over the network with a friend.  It could potentially
do fun stuff like 'record' the game as you play for later playback.


## Browser Compatibility
* Runs in all the usual suspects (even IE6!... though the IE6 I tested
with doesn't seem to recognize the unicode chess chars)
* Works on Android, except the game piece font size is jacked
* Haven't tried it on iOS yet...