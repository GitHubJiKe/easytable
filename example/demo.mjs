import EasyTable from '../dist/index.js';

const columns = [
  { field: 'name', label: '姓名', align: 'left' },
  {
    field: 'age', label: '年龄', align: 'right', render: (col, row) => {
      const cell = document.createElement('span')
      const age = row[col.field]
      cell.innerText = row[col.field] + '岁'
      cell.style.color = age >= 16 ? 'red' : 'green';
      return cell
    }
  },
  {
    field: '操作', label: '操作', align: 'center', render: (col, row) => {
      const cell = document.createElement('span')
      cell.innerText = '删除'
      cell.style.color = 'blue'
      return cell
    }
  }
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
  height: '314px',
  width: '300px',
  onCellClick(col, row, index) {
    if (col.field === '操作') {
      rows.splice(index, 1)
      table.refresh()
    } else {
      console.log(col, row[col.field]);
    }
  },
  onRowClick(row, index) {
    // console.log(row, index);
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

document.querySelector('#sort').addEventListener('click', () => {
  table.sort((a, b) => {
    return b['age'] - a['age']
  })
})