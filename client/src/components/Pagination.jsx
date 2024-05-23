import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled(data) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10)

  console.log(page, 'page');
  console.log(pageSize, 'pageSize');

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  }

  if (Object.keys(data).length > 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <select
          value={pageSize}
          onChange={handleChangePageSize}
          style={{ paddingLeft: '30px' }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <div>
          <Pagination count={10} page={page} onChange={handleChange} />
        </div>
      </div>

    );
  }
}