# meli0631_9103_Major-Project
## The function I choose -- User Interaction
## About how to interact with the work
Press space button on the keyboard to change background color randomly.
Hovering mouse on the concentric circles will render them move slightly. 
## Inspiration 


## Technical explanation
Based on group work, I add orange inter-circle curves，key-press interactive effect, and mouse-hover interaction fuction. 

For the inter-circle curve：
1. Create drawInterCircleCurves to draw curves around each Sipral Circle.
2. Setting up curves by using curveCount and outerRadius to define size and shape.
3. Looping the curves. Use for loop to iterate curveCount times to draw curves at different angle. Also, use angle offset to calculate curve position. Use map function to transform i to a certian angle range.
4. Calculate start and end point by using statX, startY, endX,endY. And make the start and end point position by the side of outerRadius and shif for PI/5. Draw curves by setting up stroke and strokeWeight. Set up curve start point by using vertex() and make it connect to endX and endY by using quadraticVertex.
6. Create 15 short smooth curves around the circles.

For key-press:
1. Add keyPressed()function and if(key=='') to test the key pressing action.
2. bg color=color(random) for randomly changing color.


For the mouseHover function, this is set to check if the mouse is hovering on the circles and create slight movements.
1. Use dist() to calculate the distance of current mouse position and this.x, this.y.
2. if(distance<this.radius) to check if mouse is hovering on circles.
3. Render this.x and this.y move at the range of (-1,1) to create shaking effect.

## Code reference 
1. The checkMouseHover() function is referenced to this website(https://microstudio.dev/community/help/mouse-hovering/334/)
2. The quadraticVertex() is referenced to the website(https://processing.org/reference/quadraticVertex_.html)