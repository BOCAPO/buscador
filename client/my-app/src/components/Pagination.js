import React from 'react';

const Pagination    = ( { newsPerPage, totalNews, paginate } ) => {
  
  const pageNumbers = [];

  for ( let i = 1; i <= Math.ceil( totalNews / newsPerPage ); i++ ) {
    pageNumbers.push( i );
  }

  return (
    <nav className='table-responsive'>
      <ul className='pagination flex-wrap'>
        {pageNumbers.map( number => (
          <li key={number} className='page-item'>
            <a onClick={ () => paginate( number ) } href='#' className='page-link'> 
              {number} 
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

};

export default Pagination;