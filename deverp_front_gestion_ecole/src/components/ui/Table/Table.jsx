import React from 'react';

const Table = ({ headers, data }) => (
  <table className="bg-white shadow-lg rounded-lg w-full text-xs sm:text-sm md:text-base">
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="py-2 px-4 sm:py-3 sm:px-6 text-center text-[0.75rem] sm:text-[0.875rem] md:text-base"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr
          key={index}
          className={index % 2 === 0 ? 'bg-gray-100' : ''}
        >
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className="py-2 px-4 sm:py-3 sm:px-6 text-center text-[0.75rem] sm:text-[0.875rem] md:text-base"
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;