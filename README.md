# maph.js

A scratchbuilt matrix / vector math library for javascript. Just another learning opportunity. 

The goal here is not a good program that others might use. That's been done, and many times over, in ways more performant than mine, and in ways more powerful than mine.

The goal is to allow myself to get a more intimate understanding of a section of mathematics that I didn't pick up well in school. Also maybe get working on 3d graphics from the low level by using a library I wrote myself. That'd be cool. 

I wrote this library and it's unit tests almost a year ago, and since then I've learned a lot about proper coding standards and behaviours in Javascript. Now that it's going up on github, I'll be looking over it for ways to improve.

For testing I had to write an approximate comparison function to account for a lot of floating point rounding errors. The raw numbers compared against as expected values were all computed by hand (with a calculator where appropriate), rather than by a javascript interpreter. Tolerances are generally set at .01 units. 
