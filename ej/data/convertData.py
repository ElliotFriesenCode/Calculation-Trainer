
import zstandard

with open('./lichess_db_antichess_rated_2023-06.pgn.zst', 'rb') as compressed:
    decomp = zstandard.ZstdDecompressor()
    with open('./lichess_db_antichess_rated_2023-06.pgn.csv', 'wb') as destination:
        decomp.copy_stream(compressed, destination)