function makeDiagonalRed(table) {
  const rows = Array.from(table.rows);

  for (let row of rows) {
    const cells = Array.from(row.cells);

    for (let cell of cells) {
      if (cell.cellIndex == row.rowIndex) {
        cell.style.backgroundColor = 'red';
      }
    }
  }

  return table;
}
