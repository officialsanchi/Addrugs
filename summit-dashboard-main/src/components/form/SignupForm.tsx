import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUserValidation } from "@/lib/validation";
import { registerUser } from "@/service/api";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupForm() {
  interface SignupFormValues {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    confirmPassword: string;
  }

  const router = useNavigate();
  const register = useMutation({
    mutationFn: (data: SignupFormValues) => registerUser(data),
    onSuccess: (result) => {
      toast.success(result.message);
      router("/verify", {
        state: {
          email: values.email,
        },
      });
    },
  });

  const onSubmit = (values: SignupFormValues): void => {
    register.mutate(values);
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
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
    validationSchema: registerUserValidation,
    validateOnMount: true,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Register your email below to create your account
        </p>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={values?.fullName}
            type="text"
            autoComplete="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.fullName && errors?.fullName && (
            <small className=" text-red-500">{errors?.fullName}</small>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={values?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors?.email && (
            <small className=" text-red-500">{errors?.email}</small>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="text"
            name="phone"
            autoComplete="phone"
            value={values?.phone}
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.phone && errors?.phone && (
            <small className=" text-red-500">{errors?.phone}</small>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={values?.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.password && errors?.password && (
            <small className=" text-red-500">{errors?.password}</small>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            autoComplete="current-password"
            value={values?.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.confirmPassword && errors?.confirmPassword && (
            <small className=" text-red-500">{errors?.confirmPassword}</small>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || register.isPending}
        >
          {register.isPending && <i className="pi pi-spin pi-spinner"></i>}
          Signup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
