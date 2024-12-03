Workspace: # AOC-2024

## Description

Advent of Code 2024 solutions implemented in TypeScript and JavaScript. Each day is organized into separate folders containing solutions for both parts of the puzzle.

## Project Structure

day-X
part-1-solution.ts
: Solution for Part 1 of Day X
part-2-solution.ts
: Solution for Part 2 of Day X
  -
puzzle.txt
: Puzzle input for Day 1.

## Scripts

- **Build the project**:

  ```sh
  npm run build
  ```

- **Watch for changes and rebuild automatically**:

  ```sh
  npm run watch
  ```

- **Execute solutions**:

  ```sh
  npm run execute -- <day>
  ```

  Replace `<day>` with the day number (e.g., `1` for Day 1).

- **Create a new day folder with solution templates**:

  ```sh
  npm run build-day <day-number>
  ```

## Usage

1. **Install dependencies**:

   ```sh
   npm install
   ```

2. **Build the project**:

   ```sh
   npm run build
   ```

3. **Execute a day's solutions**:

   ```sh
   npm run execute -- <day>
   ```

   Replace `<day>` with the day number you wish to execute.

4. **Add a new day**:

   ```sh
   npm run build-day <day-number>
   ```

   This will create a new folder for the specified day with template solution files.