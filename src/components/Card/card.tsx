import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Edit, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserSelectModal from "../modal/userSelectModal";
import { type VoucherCardProps } from "@/validation/auth.form.validation";
import api from "@/utils/api";
import toast from "@/utils/toast";
import { formatDate, isFutureDate } from "@/utils/formatDate";
import { truncateContent } from "@/utils/truncateContent";

const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  onEdit,
  onDelete,
  onClick,
  className = "",
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleAddUsers = async (userIds: string[]) => {
    try {
      const response = await api.issueVoucher(voucher._id, userIds);

      if (response.data) {
        toast.success(
          "Users assigned successfully",
          "The users have been successfully assigned to the voucher."
        );
      }
      console.log("Users assigned successfully");
    } catch (error: any) {
      toast.error(
        "Failed to assign users",
        error.response.data.message ||
          "An error occurred while assigning users to the voucher."
      );
      console.error("Failed to assign users:", error);
    }
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50 ${className}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
              {voucher.name || "Untitled Voucher"}
            </CardTitle>
            {voucher.code && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {voucher.code}
              </span>
            )}
          </div>
          <div className="relative">
            {isFutureDate(voucher.expiryDate) && (
              <Button
                className={`p-1 rounded-full hover:bg-gray-200 transition-all duration-200 ${
                  showActions
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserModal(true);
                }}
              >
                <UserPlus size={16} className="text-gray-500" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-gray-600 mb-4 leading-relaxed">
          {truncateContent(voucher?.description)}
        </CardDescription>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4 ">
            <div className="flex items-center text-xs text-gray-500">
             
              {isFutureDate(voucher.expiryDate) ? (
                <>
                 <span className="mr-1">expiry :</span>
              <Calendar size={12} className="mr-1" />
                <span>{formatDate(voucher.expiryDate!)}</span>
                </>
              ) : ("EXPIRED")}
            </div>
            {/* <div className="flex items-center text-xs text-gray-500">
            <Users size={12} className="mr-1" />
            <span>{voucher?.collaborators?.length || 0}</span>
          </div> */}
          </div>

          <div
            className={`flex items-center space-x-2 transition-all duration-200 ${
              showActions
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(voucher);
              }}
              className="p-1.5 rounded-full hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit note"
            >
              <Edit size={14} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(voucher._id);
              }}
              className="p-1.5 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete note"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
      <UserSelectModal
        open={showUserModal}
        onClose={() => setShowUserModal(false)}
        onConfirm={handleAddUsers}
      />
    </Card>
  );
};

export default VoucherCard;
