/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  rows = null;
  elem = null;

  constructor(rows) {
    this.rows = rows;
    this.elem = this.template();
  }

  template() {

    const table = document.createElement('table');

    const thead = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
  `
    
    const tbody = document.createElement('tbody');

    table.innerHTML = thead;

    console.log(table);

    for (this.row of this.rows) {

      const tr = document.createElement('tr');
      
      for (let key in this.row) {
        const delElem = document.createElement('td');

        tr.innerHTML = (`${Object.values(this.row).map(key => `<td>${key}</td>`).join('')}`);

        delElem.innerHTML = `<button>X</button>`;
        
        tr.append(delElem);

        delElem.addEventListener('click', () => tr.remove());

        tbody.append(tr);
      }

    }

    table.append(tbody);
    return table;
  }

}
