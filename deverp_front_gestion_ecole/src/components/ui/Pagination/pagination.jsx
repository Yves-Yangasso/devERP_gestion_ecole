import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const Pagination = ({ total, rowsPerPage, currentPage, setCurrentPage, setRowsPerPage }) => {
    const totalPages = Math.ceil(total / rowsPerPage);
    
    // Générer les pages à afficher dynamiquement
    const generatePageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5; // Nombre max de pages affichées en même temps
  
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
      // Ajustement si on est proche de la fin
      if (totalPages > maxPagesToShow && endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    };
  
    return (
      <div className="flex items-center justify-between mt-4 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Lignes par page</span>
          <select 
            className="border rounded px-2 py-1 focus:outline-none focus:border-[#5d87ff]" 
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Réinitialiser à la première page
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
  
        <div className="text-sm text-gray-600">
          {`${(currentPage - 1) * rowsPerPage + 1} à ${Math.min(currentPage * rowsPerPage, total)} dossiers pour ${total}`}
        </div>
  
        <div className="flex gap-2">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} className="text-gray-500" />
          </button>
  
          {/* Affichage dynamique des pages */}
          {generatePageNumbers().map(num => (
            <button 
              key={num} 
              className={`w-8 h-8 flex items-center justify-center rounded ${num === currentPage ? 'bg-[#2a3547] text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
  
          <button 
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  
