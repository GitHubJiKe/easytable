import type { CellClickEvent, IColumn, IEasyTableProps, IRow, TAlign } from '.';

export const add = (a: number, b: number) => a + b;

export const renderTableHeader = (columns: IColumn[]) => {
  const len = columns.length;
  const tableHeader = document.createElement('div');
  tableHeader.classList.add('table-header');

  for (let index = 0; index < len; index++) {
    const col = columns[index]!;
    const headerCell = document.createElement('div');
    headerCell.innerText = col.label;
    headerCell.classList.add('header-cell', col.align!);
    tableHeader.append(headerCell);
  }

  return tableHeader;
};

export const renderRow = (
  columns: IColumn[],
  row: IRow,
  onCellClick?: CellClickEvent,
) => {
  const len = columns.length;
  const tableRow = document.createElement('div');
  tableRow.classList.add('table-row');
  for (let index = 0; index < len; index++) {
    const col = columns[index]!;
    const value = col.render ? col.render(col, row) : row[col.field];
    const cell = document.createElement('div');
    cell.classList.add('row-cell', col.align!);
    if (typeof value === 'object') {
      cell.append(value as Node);
    } else {
      cell.innerText = String(value);
    }
    if (onCellClick) {
      cell.addEventListener('click', (e) => {
        onCellClick(col, row);
      });
      cell.style.cursor = 'pointer';
    }
    tableRow.append(cell);
  }

  return tableRow;
};

export const renderRows = (opts: IEasyTableProps) => {
  const { columns, rows, onCellClick, onRowClick } = opts;
  const len = rows.length;
  const result = [];
  for (let index = 0; index < len; index++) {
    const row = rows[index]!;
    const tableRow = renderRow(columns, row, onCellClick);
    if (onRowClick) {
      tableRow.addEventListener('click', (e) => {
        onRowClick(row, index);
      });
    }
    result.push(tableRow);
  }

  return result;
};
