import type { IColumn } from './index.js';
import { renderTableHeader } from './utils.js';
import { test, expect } from 'vitest';

test('renderTableHeader', () => {
  const columns: IColumn[] = [{ field: 'name', label: '姓名' }];
  expect(renderTableHeader(columns)?.innerHTML).toEqual(
    '<div class="header-cell">姓名</div>',
  );
});
