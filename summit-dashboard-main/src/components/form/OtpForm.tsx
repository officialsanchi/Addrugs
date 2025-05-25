import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { verifyOtp } from "@/service/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

export default function OtpForm() {
  interface OtpFormValues {
    otp: string;
  }


  const location = useLocation();
  const email = location.state?.email;
  const router = useNavigate()
  const verify = useMutation({
    mutationFn: (data: OtpFormValues) => verifyOtp({ ...data, email: email }),
    onSuccess: (result) => {
      toast.success(result?.message);
      router('/login')
    },
  });

  const onSubmit = (values: OtpFormValues): void => {
    verify.mutate(values);
  };

  const initialValues = {
    otp: "",
  };

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter email and code below to verify account
        </p>
      </div>
      <div className="grid gap-6 items-center justify-center">
        <InputOTP
          onChange={(value: string) => setFieldValue("otp", value)}
          value={values.otp}
          maxLength={4}
        >
          <InputOTPGroup>
            <InputOTPSlot className="h-[50px] w-[50px]" index={0} />
            <InputOTPSlot className="h-[50px] w-[50px]" index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className="h-[50px] w-[50px]" index={2} />
            <InputOTPSlot className="h-[50px] w-[50px]" index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit">Verify</Button>
      <div className=" underline text-center w-fit mx-auto cursor-pointer text-[14px] hover:font-semibold">
        Resend Otp
      </div>
    </form>
  );
}
