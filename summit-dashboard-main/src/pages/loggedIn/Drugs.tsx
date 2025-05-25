import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { useRecoilValue } from "recoil";
// import { UserState } from "@/atoms/userAtom";
import TableDemo from "@/components/TableDemo";
import { useFormik } from "formik";
import { InputNumber } from "primereact/inputnumber";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDrug, getAllDrugs } from "@/service/api";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

export default function Drugs() {
  const [open, setOpen] = useState<Boolean>();
  const getRowData = async (_data: any) => {};

  const createNewDrug = useMutation({
    mutationFn: (data) => createDrug(data),
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["drugs"],
    queryFn: () => getAllDrugs(),
  });

  const onSubmit = (values: any): void => {
    createNewDrug.mutate(values);
    setOpen(false);
  };

  const initialValues = {
    name: "",
    numberOfTablets: 0,
    tabletsPerTime: 0,
    startTime: null,
    endTime: null,
    interval: 0,
  };

  const {
    values,
    isValid,
    handleChange,
    resetForm,
    setFieldValue,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit,
  });

  const sanitizeData = (data: any) =>
    data?.map((item: any) => {
      const { drugId, _id, creatorId, __v, updatedAt, ...rest } = item;
      return {
        name: drugId?.name,
        ...rest,
        _id,
      };
    });

  return (
    <div className="w-full main">
      <TableDemo
        getEmailData={getRowData}
        showSendBtn
        hideBtn={true}
        setDialog={open}
        createItemBtn
        data={sanitizeData(data?.data)}
        name={"Drug"}
        loading={isLoading || createNewDrug.isPending}
      >
        <div className="">
          <form onSubmit={handleSubmit} className="flex flex-col  gap-6">
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name Of Drug</Label>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numberOfTablets">Number Of Tablets</Label>
                <InputNumber
                  id="numberOfTablets"
                  name="numberOfTablets"
                  value={values.numberOfTablets}
                  onValueChange={(e) =>
                    setFieldValue("numberOfTablets", e.value)
                  }
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tabletsPerTime">Tablets Per Time</Label>
                <InputNumber
                  id="tabletsPerTime"
                  name="tabletsPerTime"
                  value={values.tabletsPerTime}
                  onValueChange={(e) =>
                    setFieldValue("tabletsPerTime", e.value)
                  }
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interval">Interval</Label>
                <InputNumber
                  id="interval"
                  name="interval"
                  value={values.interval}
                  onValueChange={(e) => setFieldValue("interval", e.value)}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Day</Label>
                <Calendar
                  id="startTime"
                  name="startTime"
                  value={values.startTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  showTime
                  hourFormat="12"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Day</Label>
                <Calendar
                  id="endTime"
                  name="endTime"
                  value={values.endTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  showTime
                  hourFormat="12"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={!isValid}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </TableDemo>
    </div>
  );
}
