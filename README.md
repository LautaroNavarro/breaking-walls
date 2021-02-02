# Breaking Walls
This is a simple pure JS cross platfrom game.

## Gamepad support
This game support standar mapping Joysticks. The MAC build does not support it (TODO)

## Game mechanism
The objective of the game is destroy as many bricks as possible. You have three lifes. Every time you hit a brick there is a 0.5 probabilty that the background color flips (from black to white, and white to black). You can flip the color manually pressing the flip bg color button. When the background is white you are not going to be able to see the ball neither the paddle, you will need to pay attention to these color flips. Each time you destroy all the bricks from a level, the nevel level is going to contains +1 rows of bricks.

## Screenshots
![alt text](https://github.com/LautaroNavarro/breaking-walls/blob/main/screen_shot_1.png?raw=true)
![alt text](https://github.com/LautaroNavarro/breaking-walls/blob/main/screen_shot_2.png?raw=true)

## Controlls
[ENTER/START] to start the game

[Arrows] to move the paddle

[SPACE/X] to change the background color

## Play it from source code on your machine

First install deps

    npm install

Then run electron

    npm start

## Play it from source code on your browser

    open index.html
