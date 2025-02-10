import TablePagination from '@mui/material/TablePagination';

export default function BasicTablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[9, 18, 36]}
      component="div"
      count={count} // Total number of items
      page={page} // Current page (controlled by parent)
      onPageChange={onPageChange} // Callback for page changes
      rowsPerPage={rowsPerPage} // Rows per page (controlled by parent)
      onRowsPerPageChange={onRowsPerPageChange} // Callback for rows per page changes
      labelRowsPerPage={
        <span className="hidden sm:inline">Articles per page:</span> || (
          <span className="inline sm:hidden">Articles</span>
        )
      }
      className="my-1"
      sx={{
        '& .MuiTablePagination-selectLabel': {
          fontSize: '1.3rem', // Rows per page label
        },
        '& .MuiTablePagination-select': {
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center', // Align items vertically
          justifyContent: 'center', // Center text horizontally (if needed)
          padding: '2px', // Adjust padding for better alignment
          lineHeight: '1.5', // Dropdown text
        },
        '& .MuiTablePagination-displayedRows': {
          fontSize: '1.3rem', // Next and previous buttons
        },
        '& .MuiTablePagination-selectIcon': {
          color: 'rgb(var(--foreground))', // Next and previous buttons
        },
      }}
    />
  );
}
