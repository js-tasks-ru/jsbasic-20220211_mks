function highlight(table) {

  const rows = Array.from(table.rows);

  for (let row of rows) {
    const cells = Array.from(row.cells);
    const statusCell = cells[3].dataset.available;
    const genderCell = cells[2].textContent;
    const ageCell = Number(cells[1].textContent);


    for (let cell of cells) {
      if (statusCell) {
        // Классы available, unavailable, hidden
        if (cell.dataset.available == 'true') {
          row.classList.add('available');
        } else if (cell.dataset.available == 'false') {
          row.classList.add('unavailable');
        }
      } else {
        row.setAttribute('hidden', '');
      }

      // Классы male/female
      if (genderCell == 'm') {
        row.classList.add('male');
      } else if (genderCell == 'f'){
        row.classList.add('female');
      }

      // inline-стиль
      if (ageCell < 18) {
        row.style.textDecoration = 'line-through';
      }

    }

  }

  return table;
}
