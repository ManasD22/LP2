def print_solution(board, n):
    for i in range(n):
        row = ['Q' if board[i] == j else '.' for j in range(n)]
        print(' '.join(row))
    print()

def solve_n_queens_bb(n):
    def solve(row):
        if row == n:
            solutions.append(board[:])
            return

        for col in range(n):
            if not cols[col] and not main_diag[row - col + n - 1] and not anti_diag[row + col]:
                board[row] = col
                cols[col] = main_diag[row - col + n - 1] = anti_diag[row + col] = True

                solve(row + 1)

                # Backtrack
                cols[col] = main_diag[row - col + n - 1] = anti_diag[row + col] = False
                board[row] = -1

    # Structures to keep track of attacks
    cols = [False] * n
    main_diag = [False] * (2 * n - 1)     # row - col + (n - 1)
    anti_diag = [False] * (2 * n - 1)     # row + col
    board = [-1] * n
    solutions = []

    solve(0)
    print(f"\nTotal solutions for {n}-Queens using Branch and Bound: {len(solutions)}\n")
    for sol in solutions:
        print_solution(sol, n)

# Run
try:
    n = int(input("Enter the value of N (number of queens): "))
    if n < 1:
        print("Please enter a positive integer greater than 0.")
    else:
        solve_n_queens_bb(n)
except ValueError:
    print("Invalid input. Please enter an integer.")
