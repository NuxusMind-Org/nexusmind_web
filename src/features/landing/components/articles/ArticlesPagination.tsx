import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticlesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ArticlesPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlesPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3 mt-12 select-none">
      {/* Previous Page Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          currentPage === 1
            ? 'border-white/5 text-white/20 bg-transparent cursor-not-allowed'
            : 'border-white/10 text-white/80 hover:text-white hover:border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] text-white font-semibold shadow-lg shadow-[#9f5bff]/20 border-none'
                : 'border border-white/10 text-white/80 hover:text-white hover:border-white/20 bg-white/5 hover:bg-white/10'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          currentPage === totalPages
            ? 'border-white/5 text-white/20 bg-transparent cursor-not-allowed'
            : 'border-white/10 text-white/80 hover:text-white hover:border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer'
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
