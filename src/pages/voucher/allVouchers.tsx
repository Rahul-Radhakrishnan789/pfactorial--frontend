import React, { useEffect } from "react";
import { Search, Plus, FileText } from "lucide-react";
import VoucherCard from "@/components/Card/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useVoucherStore from "@/hooks/store/useVoucherStore";
import { PaginationControls } from "@/components/pagination/pagination";
import LoadingSpinner from "@/components/loader/loader";

const categories = ["asc", "des"];

const VouchersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    vouchers,
    loading,
    error,
    filters,
    fetchVouchers,
    deleteVoucher,
    setFilters,
    pagination,
  } = useVoucherStore();

  console.log("pagination,", pagination);

  useEffect(() => {
    fetchVouchers();
  }, [filters.order, filters.search, filters.page]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ order: e.target.value });
  };

const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setFilters({ search: searchValue });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="mr-3 text-blue-600" size={28} />
            Vouchers
          </h1>
          <Button onClick={() => navigate("/vouchers/create")}>
            <Plus size={18} className="mr-2" />
            New Voucher
          </Button>
        </div>
        <p className="text-gray-600 mt-1">
          {vouchers?.length} {vouchers?.length === 1 ? "voucher" : "vouchers"}{" "}
          found
        </p>
      </div>

      <div className="p-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search vouchers..."
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={filters.search}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "asc" ? "Ascending" : "descending"}
            </option>
          ))}
        </select>
      </div>

      <div className="p-6">
        {loading ? (
          <p><LoadingSpinner/></p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : vouchers?.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers?.map((v) => (
                <VoucherCard
                  key={v?._id}
                  voucher={v}
                  onEdit={() => navigate(`/vouchers/edit/${v?._id}`)}
                  onDelete={() => deleteVoucher(v?._id)}
                />
              ))}
            </div>

            {pagination?.pages > 1 && (
              <PaginationControls
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <FileText size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium">No vouchers found</h3>
            <p className="text-gray-500 mb-6">
              {filters.order || filters.search !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first voucher to get started"}
            </p>
            <Button onClick={() => navigate("/vouchers/create")}>
              Create Voucher
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VouchersPage;
