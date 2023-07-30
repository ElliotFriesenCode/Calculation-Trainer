import json
from stockfish import Stockfish
from enum import Enum

# Puzzle types as defined in the project
class PuzzleType(Enum):
    IMBALANCE = "imbalance"
    TACTICAL = "tactical"
    POSITIONAL_ADVANTAGE = "positional advantage"
    DEFENSE = "defense"
    NO_BEST_LINE = "no best line"

# Reading the PGN game
def read_pgn_game(game_pgn: str):
    pgn = io.StringIO(game_pgn)
    game = chess.pgn.read_game(pgn)
    return game

# Identifying puzzle positions
def identify_puzzle_positions(game):
    # Initialize engine
    engine = chess.engine.SimpleEngine.popen_uci("/path/to/stockfish")

    # Analyze game and look for dramatic changes in evaluation
    puzzle_positions = []
    board = game.board()
    prev_score = None
    for move in game.mainline_moves():
        board.push(move)
        info = engine.analyse(board, chess.engine.Limit(time=2.0))
        score = info["score"].relative.score()
        if prev_score is not None and abs(score - prev_score) >= 250:  # Pawn is 100 units
            puzzle_positions.append(board.fen())
        prev_score = score

    engine.quit()
    return puzzle_positions

# Generating paths for identified puzzle positions
def generate_paths(puzzle_positions):
    engine = chess.engine.SimpleEngine.popen_uci("/path/to/stockfish")

    puzzle_paths = []
    for fen in puzzle_positions:
        board = chess.Board(fen=fen)
        info = engine.analyse(board, chess.engine.Limit(depth=3))
        puzzle_paths.append(info.get("pv"))

    engine.quit()
    return puzzle_paths

# Deciding if more puzzles can be extracted
def continue_extraction(puzzles):
    # For this basic implementation, we'll only extract one puzzle from each game
    return len(puzzles) < 1

# Serializing the extracted puzzle
def serialize_puzzle(puzzle):
    return json.dumps(puzzle)

# Main function to extract puzzle
def extract_puzzle(game_pgn: str, puzzle_type: PuzzleType) -> str:
    # Initialize Stockfish
    stockfish = Stockfish()

    # Load the PGN game
    game = read_pgn_game(game_pgn)

    # Stage 1: Puzzle Position Identification
    puzzle_positions = identify_puzzle_positions(game)

    # Stage 2: Path Generation
    puzzle_paths = generate_paths(puzzle_positions)

    # Iterate over each potential puzzle until a suitable one is found or none left
    for puzzle_path in puzzle_paths:
        puzzle = {"type": puzzle_type.value, "path": puzzle_path}
        
        # Stage 3: Continue extraction or end
        if not continue_extraction(puzzle):
            break

    # Serialize the puzzle as per the given schema
    serialized_puzzle = serialize_puzzle(puzzle)

    return serialized_puzzle
