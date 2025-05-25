import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginUserValidation } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/service/api";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { UserAuthState } from "@/atoms/authAtom";
import { UserState } from "@/atoms/userAtom";
export function LoginForm() {
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const router = useNavigate();
  const [_auth, setAuth] = useRecoilState(UserAuthState);
  const [_user, setUser] = useRecoilState(UserState);

  const login = useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: (result) => {
      const { message, otp, auth, ...others } = result;
      toast.success(message);
      if (result?.userStatus == "pending") {
        router("/verify", {
          state: {
            email: values.email,
          },
        });
      }
      setAuth(auth);
      setUser(others);
      router("/home");
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    login.mutate(values);
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: loginUserValidation,
    validateOnMount: true,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit} className="flex flex-col  gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            placeholder="m@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors?.email && (
            <small className=" text-red-500">{errors?.email}</small>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.password && errors?.password && (
            <small className=" text-red-500">{errors?.password}</small>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || login.isPending}
        >
          {login.isPending && <i className="pi pi-spin pi-spinner"></i>}
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
