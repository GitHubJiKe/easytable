import EasyTable from '../dist/index.js';

const columns = [
  { field: 'name', label: '姓名', align: 'center' },
  {
    field: 'age', label: '年龄', align: 'right', render: (col, row) => {
      const cell = document.createElement('span')
      const age = row[col.field]
      cell.innerText = row[col.field] + '岁'
      cell.style.color = age >= 16 ? 'red' : 'green';
      return cell
    }
  },
];

const rows = [
  { name: '小明', age: 14 },
  { name: '小明', age: 16 },
  { name: '小明', age: 17 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
  { name: '小明', age: 15 },
]

const table = new EasyTable({
  el: '#root',
  columns,
  rows,
  height: '300px',
  onCellClick(col, row) {
    console.log(row[col.field]);
  },
  onRowClick(row, index) {
    console.log(row, index);
  }
});

table.render();
document.querySelector('#toogle').addEventListener('click', () => {
  console.log(table.unmounted);
  if (table.unmounted) {
    table.render();
  } else {
    table.unmount()
  }
})
