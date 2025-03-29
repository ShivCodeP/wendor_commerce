import React, { useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Package2 } from "lucide-react";
import { fetchInventory } from "../lib/api";
import ProductCard from "./ProductCard";
import type { Database } from "../lib/database.types";

type InventoryItem = Database["public"]["Tables"]["inventory"]["Row"];

interface ProductGridProps {
  onAddToCart: (item: InventoryItem) => void;
  onViewDetails: (item: InventoryItem) => void;
}

export default function ProductGrid({
  onAddToCart,
  onViewDetails,
}: ProductGridProps) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["inventory"],
      queryFn: ({ pageParam = 1 }) => fetchInventory(pageParam),
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleAddToCart = useCallback(
    (item: InventoryItem) => {
      onAddToCart(item);
    },
    [onAddToCart]
  );

  const handleViewDetails = useCallback(
    (item: InventoryItem) => {
      onViewDetails(item);
    },
    [onViewDetails]
  );

  if (status === "pending") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin">
          <Package2 className="w-8 h-8 text-green-600" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </React.Fragment>
      ))}

      <div ref={ref} className="col-span-full flex justify-center p-4">
        {isFetchingNextPage && (
          <div className="animate-spin">
            <Package2 className="w-6 h-6 text-green-600" />
          </div>
        )}
      </div>
    </div>
  );
}
