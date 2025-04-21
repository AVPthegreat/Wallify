
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex justify-center py-8">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="border-wallflix-purple/30 text-white"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>
        
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              className="border-wallflix-purple/30 text-white"
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
            {startPage > 2 && (
              <Button variant="ghost" disabled className="text-white">
                ...
              </Button>
            )}
          </>
        )}
        
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => onPageChange(number)}
            className={cn(
              "border-wallflix-purple/30", 
              currentPage === number 
                ? "bg-wallflix-purple text-white" 
                : "bg-transparent text-white"
            )}
            variant={currentPage === number ? "default" : "outline"}
          >
            {number}
          </Button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Button variant="ghost" disabled className="text-white">
                ...
              </Button>
            )}
            <Button
              variant="outline"
              className="border-wallflix-purple/30 text-white"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          className="border-wallflix-purple/30 text-white"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
