import { create } from 'zustand';
import { LoginFormValues } from '@/validation/auth.form.validation';
import api from '@/utils/api';
import toast from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  login: (values: LoginFormValues) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (values) => {
    try {
    //  const navigate = useNavigate();
      const response = await api.login(values);
      const user = response.data.data.admin;

     

      // Save token if needed
      localStorage.setItem('fwtoken', response.data.data.token);
        toast.success('Done',"login successful");
         
        
        // navigate('/');

      set({ user, isAuthenticated: true });
    } catch (err: any) {
        toast.error('Login failed', 'Invalid email or password.');
        console.error('Login failed:', err.response?.data || err.message);
    }
  },

  logout: () => {
    localStorage.removeItem('fwtoken');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
