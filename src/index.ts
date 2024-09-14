import { renderRow, renderRows, renderTableHeader } from './utils';

export interface IRow {
  [x: string]: unknown;
}

export type TAlign = 'center' | 'left' | 'right';

export interface IColumn {
  field: string;
  label: string;
  align?: TAlign;
  render?: (col: IColumn, row: IRow) => string | Node;
}

export type CellClickEvent = (col: IColumn, row: IRow, index: number) => void;
export type RowClickEvent = (row: IRow, index: number) => void;
export interface IEasyTableProps {
  columns: IColumn[];
  rows: IRow[];
  el: string | Element;
  width?: string;
  height?: string;
  onCellClick?: CellClickEvent;
  onRowClick?: RowClickEvent;
}

export default class EasyTable {
  #options!: IEasyTableProps;
  #el!: HTMLDivElement;
  constructor(options: IEasyTableProps) {
    this.#options = options;

    if (typeof this.#options.el === 'string') {
      this.#el = document.querySelector(
        this.#options.el,
      )! as unknown as HTMLDivElement;
    } else {
      this.#el = this.#options.el as unknown as HTMLDivElement;
    }
  }

  unmounted = false;

  render() {
    const tableHeader = renderTableHeader(this.#options.columns);
    const easytable = document.createElement('div');
    easytable.classList.add('easytable');

    if (this.#options.width) {
      easytable.style.width = this.#options.width;
    }
    if (this.#el) {
      if (tableHeader) {
        easytable.append(tableHeader);
      } else {
        throw new Error('generate table header failed,please check config');
      }

      const tableRows = renderRows(this.#options);
      const tableContent = document.createElement('div');
      tableContent.classList.add('table-content');
      if (this.#options.height) {
        tableContent.style.height = this.#options.height;
      }
      tableContent.append(...tableRows);
      easytable.append(tableContent);
      this.#el.append(easytable);
      this.unmounted = false;
    } else {
      throw new Error('no el found,please check config');
    }
  }

  unmount() {
    this.unmounted = true;
    this.#el.innerHTML = '';
  }

  sort(sortFunc: (a: IRow, b: IRow) => number) {
    this.#options.rows.sort(sortFunc);
    this.refresh();
  }

  refresh() {
    this.unmount();
    this.render();
  }
}
