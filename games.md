---
layout: page
title: Games
---

This page is for some of the cooler games I've made. 

I don't tend to post ongoing projects anywhere, as I find that talking about them makes them harder to work on. However, I am working on a few, and bits of them might have snuck onto the [Artwork](/artwork) page...

## [4ork](https://github.com/Singularity3/fork_game)

A game about doin' crimes through some late 80s terminals.

This is probably the most work I've put into a game so far, and that's mostly because I decided to write an engine instead of using a perfectly good one someone else had made already. Admittedly, I didn't know about Godot at the time, I'm not the biggest fan of Unity, and Unreal seemed...overkill. So I grabbed a framework and set out to try and make Lua do object-oriented things.

I'd recommend anyone who is interested in the technical side of making games to try creating an engine at least once. Just maybe don't do it when you're under time pressure.

There are a lot of puzzles, a few pieces of music, and some...dialogue? Honestly if I had to go back and do it again I would've scrapped a lot of the dialogue; it's pretty rough. But I'm happy with how it's presented, at least!

The repo contains builds for Windows and Mac; I hope you enjoy it!

## [Analog/Digital](https://singularity3.itch.io/analogdigital)

A little dodging game I made for a game jam! Move with the arrow keys, and hold Space to change from analog movement to digital!

Despite being made in a few hours, my playtesters got very competitive over who could hold the high score on my machine. Seems like a good sign in my book.

Uses some leftover music I had from 4ork.

## [Welcome to Benny's](/public/wtb)

A little game about trying to start a pizza franchise on an alien planet. Written in raw JS, for no real reason. What's CSS?

I like to think this game demonstrates that my writing has improved significantly since the 4ork days, though it's probably because I had a lot less to actually write. Also not having to do dialogue helps. Dialogue is a cursed discipline.

If you'd like to play, grab some early contracts so you can keep making pizza, and don't neglect marketing!

## [Magic Tennis](https://github.com/Singularity3/magic-tennis-multiplayer)

Probably the most fun game I've made. Unfortunately, this one requires hosting on a node.js server, and I shut mine down after *somebody* managed to sneak into it and started botting. 

However, if you'd like to host it yourself, go for it! You'll need to install sockets.io and the p5.js libraries onto the server as well.

I'll probably get another server up and running one of these days, but in the meantime, [here's a video of the game in action.](https://www.youtube.com/watch?v=4mEH2Kqu-N8) This was my first time working with netcode for a game, and while it has some unfortunate failings, I did manage to implement functional rollback netcode, which at least puts me above the Street Fighter 5 devs.