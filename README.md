# Calculation-Trainer
Interactable tree displaying chess positions <br>
  Drag and drop pieces to make a line <br>
  Select a node and make a different move to create a new branch <br>
To run:
  1. Clone the repository
  2. Open the project in Visual Studio Code
  3. Start an http server (enter http-server in a new terminal) <br>


## http-server `/ej` on `eejai42` branch

The eejai42 branch has reverted the original index.html and index.js to match the main branch. (I think ;)

And ej's revisions are split out now, and saved into the /ej folder.

/ej
   /style.css       - has the css content
   /index.html      - has a SUPER bearbones layout (no images or anything pretty like that :P) 
                    - the index.html imports the chess trainer ct-chess export from the ct-chess.js
                    - the index.html also imports a uiHelper.js static class that is used 
                      (given a CTChess object, and a div/console) can either render the current state
                      to the console or to a UI (if given a chess table grid)

  /js               - a directory with javascript focused code including 
    /ct-chess.js    - the main CTChess extension of the chess base class with the CTChess specific business rules
    /ui-helpers.js  - a set of static helper functions that can be passed CTChess objects and do UI stuff with them 