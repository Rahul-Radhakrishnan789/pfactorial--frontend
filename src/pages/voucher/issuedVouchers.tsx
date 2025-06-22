import React, { useEffect } from "react";
import IssuedVoucherCard from "@/components/Card/issuedVoucherCard";
import useVoucherStore from "@/hooks/store/useVoucherStore";
import LoadingSpinner from "@/components/loader/loader";
import { FileText } from "lucide-react";


const IssuedVouchersPage: React.FC = () => {
 

  const { issuedVouchers, fetchIssuedVouchers, loading,error } = useVoucherStore();

  useEffect(() => {
    fetchIssuedVouchers();
  }, []);

  console.log("issued",issuedVouchers)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="mr-3 text-blue-600" size={28} />
            Issued Vouchers
          </h1>
        </div>
        <p className="text-gray-600 mt-1">
          {issuedVouchers?.length}{" "}
          {issuedVouchers?.length === 1 ? "voucher" : "vouchers"} found
        </p>
      </div>

      <div className="p-6">
        {loading ? (
          <p>
            <LoadingSpinner />
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : issuedVouchers?.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issuedVouchers?.map((v) => (
                <IssuedVoucherCard key={v?._id} voucher={v} />
              ))}
            </div>
          </>
        ) : (
          "No issued vouchers found."
        )}
      </div>
    </div>
  );
};

export default IssuedVouchersPage;
