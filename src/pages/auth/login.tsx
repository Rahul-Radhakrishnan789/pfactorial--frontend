import Button from '@/components/button/button';
import CustomInputField from '@/components/customInput/customInputField';
import { useGlobalHookForm } from '@/hooks/useGlobalHookForm';
import { loginSchema, LoginFormValues } from '@/validation/auth.form.validation';
import useAuthStore from '@/hooks/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();


  
  const onSubmit = async (values: LoginFormValues) => {
    await login(values);
    navigate('/', { replace: true });
  };


  const { methods, handleSubmit } = useGlobalHookForm(
    loginSchema,
    { email: '', password: '' },
    onSubmit
  );

  const {
    register,
    formState: { errors, touchedFields },
  } = methods;

  return (
    <div className="flex justify-center items-center min-h-screen bold-Inter">
      <div className="flex w-full lg:w-1/2">
        <div className="w-full m-10">
          <h5 className="text-2xl font-bold text-custom-blue mb-5">Login</h5>
          <div className="border-2 border-custom-blue w-full p-8 rounded-md">
            <form onSubmit={handleSubmit}>
              <CustomInputField
                type="email"
                placeholder="Email"
                {...register('email')}
                error={errors.email?.message}
                touched={touchedFields.email}
              />
              <CustomInputField
                type="password"
                placeholder="Password"
                {...register('password')}
                error={errors.password?.message}
                touched={touchedFields.password}
                showForgotPassword={true}
              />
              <Button
                buttonText="Login"
                type="submit"
                className="w-full text-xl cursor-pointer hover:shadow-xl mt-4 text-black bg-custom-green-600 hover:bg-green-600 transition-all duration-300"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
