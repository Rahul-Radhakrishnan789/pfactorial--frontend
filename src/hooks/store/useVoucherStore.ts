import { create } from 'zustand';
import api from '@/utils/api';
import toast from '@/utils/toast';
import { VoucherFormValues } from '@/validation/auth.form.validation';

export interface VoucherFilters {

  order: string;
  search: string;
  page: number;
}

interface VoucherState {
  vouchers: VoucherFormValues[];
  singleVoucher: VoucherFormValues | null;
  filters: VoucherFilters;
  pagination: {
    page: number;
    pages: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  error: string | null;
  issuedVouchers: VoucherFormValues[] | any;


  fetchVouchers: () => Promise<void>;
  fetchIssuedVouchers: () => Promise<void>;
  getSingleVoucher: (id: string) => Promise<void>;
  createVoucher: (data: Partial<VoucherFormValues>) => Promise<void>;
  updateVoucher: (id: string, data: Partial<VoucherFormValues>) => Promise<void>;
  deleteVoucher: (id: string) => Promise<void>;
  setFilters: (filters: Partial<VoucherFilters>) => void;
}

const useVoucherStore = create<VoucherState>((set, get) => ({
  vouchers: [],
  singleVoucher: null,
  filters: { order: 'asc', search: '', page: 1 },
  pagination: {
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
    },
  loading: false,
  error: null,
  issuedVouchers: [],

  fetchVouchers: async () => {
    set({ loading: true, error: null });
    try {
      const { search, order , page } = get().filters;
      const query = `search=${encodeURIComponent(search)}&order=${encodeURIComponent(order)}&page=${page}`;
      const response = await api.getAllVouchers(query);

       console.log('data',response.data.data);
      set({ vouchers: response.data.data.data,pagination: response.data.data.pagination ,loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
      toast.error('Error fetching vouchers', 'Failed to fetch vouchers from the server.');
    }
  },

    fetchIssuedVouchers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getIssuedVouchers();
      set({ issuedVouchers: response.data.data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch issued vouchers', loading: false });
      toast.error('Error fetching issued vouchers', 'Failed to fetch issued vouchers from the server.');
    }
  },

  
    getSingleVoucher: async (id: string) => {
    set({ loading: true, error: null });
    try {
      
      const response = await api.getSingleVoucher(id);

      set({ singleVoucher: response?.data?.data?.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
      toast.error('Error fetching voucher', 'Failed to fetch voucher from the server.');
    }
  },



  createVoucher: async (data) => {
    try {
      await api.createVoucher(data);

      toast.success('Voucher created', 'The voucher has been successfully created.');
      get().fetchVouchers();
    } catch (err: any) {
      toast.error('Create failed', 'Failed to create the voucher.');
    }
  },

  updateVoucher: async (id, data) => {
    try {
      await api.updateVoucher(id, data);
      toast.success('Voucher updated', 'The voucher has been successfully updated.');
      get().fetchVouchers();
    } catch (err: any) {
      toast.error('Update failed', 'Failed to update the voucher.');
    }
  },

  deleteVoucher: async (id) => {
    try {
      await api.deleteVoucher(id);
      toast.success('Voucher deleted', 'The voucher has been successfully deleted.');
      get().fetchVouchers();
    } catch (err: any) {
      toast.error('Delete failed', 'Failed to delete the voucher.');
    }
  },

  setFilters: (filters) => {
    set(state => ({ filters: { ...state.filters, ...filters } }));
    get().fetchVouchers();
  },


}));

export default useVoucherStore;