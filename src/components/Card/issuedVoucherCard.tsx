import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, isFutureDate } from "@/utils/formatDate";
import { type IssuedVoucherCardProps } from "@/validation/auth.form.validation";


const IssuedVoucherCard: React.FC<IssuedVoucherCardProps> = ({
  voucher,
  className = "",
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50 ${className}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
              {voucher.voucher.name || "Untitled Voucher"}
            </CardTitle>
            {voucher.voucher.code && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {voucher.voucher.code}
              </span>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Issued to: {voucher.user.name} ({voucher.user.email})
            </p>
          </div>

          <div
            className={`flex items-center space-x-2 transition-all duration-200 ${
              showActions
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >

          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <span className="mr-1">Expiry:</span>
            {isFutureDate(voucher.voucher.expiryDate) ? (
              <>
                <Calendar size={12} className="mr-1" />
                <span>{formatDate(voucher.voucher.expiryDate!)}</span>
              </>
            ) : (
              <span className="text-red-500 font-medium">EXPIRED</span>
            )}
          </div>
          <div className="text-xs">
            Status:{" "}
            <span
              className={`font-medium ${
                voucher.redeemed ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {voucher.redeemed ? "Redeemed" : "Not Redeemed"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssuedVoucherCard;
