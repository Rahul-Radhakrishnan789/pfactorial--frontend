import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CustomInputField from "@/components/customInput/customInputField";
import Button from "@/components/button/button";
import CustomTextArea from "@/components/customInput/customTextArea";
import { Switch } from "@/components/ui/switch";
import useVoucherStore from "@/hooks/store/useVoucherStore";
import { useGlobalHookForm } from "@/hooks/useGlobalHookForm";
import {
  CreateVoucherFormValues,
  CreateVoucherSchema,
} from "@/validation/auth.form.validation";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/loader/loader";

const currencies = ["USD", "EUR", "GBP"] as const;

export const CreateVoucherForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const {
    createVoucher,
    updateVoucher,
    getSingleVoucher,
    singleVoucher,
    loading,
  } = useVoucherStore();

  // 1) Fetch voucher if editing
  useEffect(() => {
    if (id) getSingleVoucher(id);
  }, [id, getSingleVoucher]);

  // 2) Setup form with defaults; we'll reset when singleVoucher arrives
  const { methods, handleSubmit } = useGlobalHookForm(
    CreateVoucherSchema,
    {
      name: "",
      description: "",
      expiryDate: "",
      currency: "USD",
      autoGenerate: true,
      code: "",
    },
    async (values: CreateVoucherFormValues) => {
      if (id) await updateVoucher(id, values);
      else await createVoucher(values);
      navigate("/vouchers", { replace: true });
    }
  );



  const {
    reset,
    control,
    watch,
    register,
    formState: { errors },
  } = methods;

  const autoGenerate = watch("autoGenerate");

  useEffect(() => {
    if (id && singleVoucher) {
      reset({
        name: singleVoucher.name,
        description: singleVoucher.description || "",
        expiryDate: new Date(singleVoucher.expiryDate)
          .toISOString()
          .slice(0, 10),
        currency: singleVoucher.currency,
        autoGenerate: !singleVoucher.code,
        code: singleVoucher.code || "",
      });
    }
  }, [id, singleVoucher, reset]);

  if (id && loading) {
    return <p><LoadingSpinner/></p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomInputField
        {...register("name")}
        placeholder="Voucher Name *"
        error={errors.name?.message}
        touched={!!errors.name}
      />

      <CustomTextArea
        {...register("description")}
        placeholder="Description (optional)"
        rows={4}
        error={errors.description?.message}
        touched={!!errors.description}
      />

      <label className="block text-sm font-medium mb-1">Expiry Date *</label>
      <CustomInputField
        {...register("expiryDate")}
        type="date"
        error={errors.expiryDate?.message}
        touched={!!errors.expiryDate}
      />

      <div>
        <label className="block text-sm font-medium mb-1">Currency *</label>
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <select
              {...field}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        />
        {errors.currency && (
          <p className="mt-1 text-xs text-red-600">{errors.currency.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name="autoGenerate"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <span className="text-sm">Auto-generate Code</span>
      </div>

      {!autoGenerate && (
        <CustomInputField
          {...register("code")}
          placeholder="Custom Code *"
          error={errors.code?.message}
          touched={!!errors.code}
        />
      )}

      <Button
        type="submit"
        buttonText={id ? "Update Voucher" : "Create Voucher"}
        className="w-full bg-blue-600 text-white"
      />
    </form>
  );
};
