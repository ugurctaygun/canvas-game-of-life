const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 600;
canvas.height = 600;

const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

function buildGrid() {
    return new Array(columns).fill(null)
    .map(() => 
        new Array(rows).fill(null)
        .map(() => 
            //giving cells boolean value to get random living cells
            Math.floor(Math.random() * 2)
        )
    )
};


let grid = buildGrid();

requestAnimationFrame(update);

function update() {
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(update);
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);
  
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        let numNeighbours = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const x_cell = col + i;
            const y_cell = row + j;
  
            if (x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) {
              const currentNeighbour = grid[col + i][row + j];
              numNeighbours += currentNeighbour;
            }
          }
        }
  
        // rules
        if (cell === 1 && numNeighbours < 2) {
          nextGen[col][row] = 0;
        } else if (cell === 1 && numNeighbours > 3) {
          nextGen[col][row] = 0;
        } else if (cell === 0 && numNeighbours === 3) {
          nextGen[col][row] = 1;
        }
      }
    }
    return nextGen;
  }

function render(grid) {
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            //The number of iterable cells
            const cell = grid[col][row];
            console.log(cell)
            ctx.beginPath();
            //ctx.rect(x,y,width,height)
            ctx.rect(col*resolution, row*resolution,resolution,resolution);
            ctx.fillStyle = cell ? 'black' : "white";
            ctx.fill()
            ctx.stroke()
        }
    }
}