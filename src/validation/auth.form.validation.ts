import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginFormValues = {
    email: '',
    password: '',
}

export const voucherSchema = z.object({
  name: z.string().min(1),
  description: z.string().max(2000),
  code: z.string().min(1).max(20).optional(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
});

export const VoucherFormValues = {
    name: '',
    description: '',
    code: '',
    currency: 'USD',
}

export const CreateVoucherSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    expiryDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
    currency: z.enum(['USD', 'EUR', 'GBP']),
    autoGenerate: z.boolean(),
    code: z.string().optional(),
  })
  .refine((d) => d.autoGenerate || !!d.code, {
    message: 'Code is required when auto-generate is off',
    path: ['code'],
  });

  export const CreateVoucherFormValues = {
      name: '',
      description: '',
      expiryDate: '',
      currency: 'USD',
      autoGenerate: true,
      code: '',
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface UserSelectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedUserIds: string[]) => void;
}


export interface Voucher {
  _id: string;
  name: string;
  description: string;
  code?: string;
  currency: string;
  expiryDate?: string;
}

export interface VoucherCardProps {
  voucher: Voucher;
  onEdit?: (note: Voucher) => void;
  onDelete?: (noteId: string) => void;
  onClick?: () => void;
  className?: string;
}

interface IssuedVoucher {
  _id: string;
  voucher: {
    _id: string;
    name: string;
    code: string;
    expiryDate?: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  redeemed: boolean;
  issuedAt: string;
}

export interface IssuedVoucherCardProps {
  voucher: IssuedVoucher;
  onEdit?: (voucher: IssuedVoucher) => void;
  onDelete?: (id: string) => void;
  className?: string;
}


export type CreateVoucherFormValues = z.infer<typeof CreateVoucherSchema>;

export type VoucherFormValues = z.infer<typeof voucherSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;