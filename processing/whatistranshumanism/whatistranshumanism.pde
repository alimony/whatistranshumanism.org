// Draw a random mesh in one of the window corners.
// Used for the top and bottom graphics on whatistranshumanism.org.
//
// INSTRUCTIONS:
//
// * Click a quadrant of the window to draw towards that corner.
// * Resize the window to set the image size.
// * Press space to save the current image to disk.
// * Hold tab to see the current window size.

import megamu.mesh.*;

int MIN_NUMBER_OF_POINTS = 20;
int MAX_NUMBER_OF_POINTS = 100;
int FUZZY = 50;

float[][] points;
float[][] edges;

// Keep track of where we last clicked to determine in which "quadrant" to draw.
float clickedX;
float clickedY;

// Keep track of window size to determine how much to rescale points on resize.
float currentWidth;
float currentHeight;

// Keep track of last generated coordinates so we can rescale them.
float currentX;
float currentY;

// Used to name all saved/exported images in consecutive order.
int counter = 0;

boolean displayCurrentSize = false;

void setup() {
  size(500, 150);

  // Allow resizing of window.
  if (frame != null) {
    frame.setResizable(true);
  }
  registerMethod("pre", this);
  currentWidth = width;
  currentHeight = height;

  // Should be the same color as body border top color in style.css
  stroke(51);
  strokeWeight(2);

  smooth();

  // Initialize to upper right "quadrant".
  clickedX = width;
  clickedY = 0;

  // Setup the font used for displaying window size.
  PFont f = createFont("Arial", 20, true);
  textFont(f);
  fill(200, 0, 0);

  generatePoints();
}

void pre() {
  if (currentWidth != width || currentHeight != height) {
    float scaleX = width / currentWidth;
    float scaleY = height / currentHeight;
    
    // Loop over all points and scale them.
    for (int i = 0; i < points.length; i++) {
      points[i][0] = points[i][0] * scaleX;
      points[i][1] = points[i][1] * scaleY;
    }
    
    currentX = currentX * scaleX;
    currentY = currentY * scaleY;
    currentWidth = width;
    currentHeight = height;
    
    updateEdges();
  }
}

void updateEdges() {
  Delaunay delauney = new Delaunay(points);
  edges = delauney.getEdges();
}

void generatePoints() {
  // We will use a different number of points each time.
  int numberOfPoints = round(random(MIN_NUMBER_OF_POINTS, MAX_NUMBER_OF_POINTS));
  points = new float[numberOfPoints][2];

  for (int i = 0; i < numberOfPoints; i++) {
    // Allow X (and later on Y) a bit outside the canvas, which looks better.
    if (clickedX < width / 2) {
      currentX = random(-20, width);
    }
    else {
      currentX = random(0, width + 20);
    }

    float ratio = currentX / width;
    float correspondingY = ratio * height;

    if (clickedX < width / 2) {
      correspondingY = height - correspondingY;
    }

    // Add random factor to the final Y value to avoid a straight diagonal line.
    if (clickedY < height / 2) {
      currentY = random(-20, correspondingY) + random(-FUZZY, FUZZY);
    }
    else {
      // TODO: Does not go outside bounds correctly anymore.
      currentX = width - currentX;
      currentY = random(correspondingY, height + 20) + random(-FUZZY, FUZZY);
    }

    points[i][0] = currentX;
    points[i][1] = currentY;
  }
  
  updateEdges();
}

void draw() {
  // Should be the same color as body background color in style.css
  background(249, 249, 245);

  for (int i = 0; i < edges.length; i++) {
    float startX = edges[i][0];
    float startY = edges[i][1];
    float endX = edges[i][2];
    float endY = edges[i][3];
    line(startX, startY, endX, endY);
  }
  
  // If resizing window, display current window size in opposite corner of mesh.
  if (displayCurrentSize) {
    float textX;
    float textY;
    int textAlignX;
    int textAlignY;
    if (clickedX < width / 2) {
      textX = width - 10;
      textAlignX = RIGHT;
    }
    else {
      textX = 10;
      textAlignX = LEFT;
    }
    if (clickedY < height / 2) {
      textY = height - 10;
      textAlignY = BOTTOM;
    }
    else {
      textY = 10;
      textAlignY = TOP;
    }
    textAlign(textAlignX, textAlignY);
    text(round(width) + " × " + round(height), textX, textY);
  }
}

void mouseReleased() {
  clickedX = mouseX;
  clickedY = mouseY;

  generatePoints();
}

// Pressing space will save the current image to disk.
void keyPressed() {
  if (key == ' ') {
    counter++;
    String filename = str(counter) + ".png";
    save(filename);
    println("Saved image " + filename);
  }
  else if (key == TAB) {
    displayCurrentSize = true;
  }
}

void keyReleased() {
  if (key == TAB) {
    displayCurrentSize = false;
  }
}
