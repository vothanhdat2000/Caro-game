document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board'); // Reference to the board container
    const status = document.getElementById('status'); // Reference to the status message
    const resetButton = document.getElementById('reset'); // Reference to the reset button
    const rows = 15; // Number of rows
    const cols = 15; // Number of columns
    let currentPlayer = 'X'; // Current player, starting with 'X'
    let boardState = Array(rows).fill(null).map(() => Array(cols).fill(null)); // Initialize the board state

    // Create the board dynamically
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell'); // Add 'cell' class for styling
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);

            // Handle cell click
            cell.addEventListener('click', () => {
                if (!cell.textContent) { // Ensure the cell is empty
                    cell.textContent = currentPlayer; // Mark the cell
                    cell.classList.add('taken'); // Mark the cell as taken
                    boardState[i][j] = currentPlayer; // Update the board state

                    if (checkWinner(i, j)) { // Check if the current player has won
                        status.textContent = `Player ${currentPlayer} wins!`;
                        board.querySelectorAll('.cell').forEach(c => c.classList.add('taken')); // Disable further moves
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
                        status.textContent = `Player ${currentPlayer}'s turn`; // Update status
                    }
                }
            });
        }
    }

    // Reset the game
    resetButton.addEventListener('click', () => {
        boardState = Array(rows).fill(null).map(() => Array(cols).fill(null)); // Reset board state
        currentPlayer = 'X'; // Reset the current player
        status.textContent = `Player ${currentPlayer}'s turn`; // Reset status
        board.querySelectorAll('.cell').forEach(cell => { // Clear all cells
            cell.textContent = '';
            cell.classList.remove('taken');
        });
    });

    // Function to check for a winner
    function checkWinner(row, col) {
        const directions = [
            { dr: 0, dc: 1 },  // Horizontal
            { dr: 1, dc: 0 },  // Vertical
            { dr: 1, dc: 1 },  // Diagonal down-right
            { dr: 1, dc: -1 }  // Diagonal down-left
        ];

        for (const { dr, dc } of directions) {
            let count = 1;

            // Check forward direction
            for (let k = 1; k < 5; k++) {
                const r = row + dr * k;
                const c = col + dc * k;
                if (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }

            // Check backward direction
            for (let k = 1; k < 5; k++) {
                const r = row - dr * k;
                const c = col - dc * k;
                if (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= 5) return true; // Return true if a player aligns 5 marks
        }

        return false; // No winner
    }
});
