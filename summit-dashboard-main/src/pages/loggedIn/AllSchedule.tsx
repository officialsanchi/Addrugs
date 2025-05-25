
// import { useRecoilValue } from "recoil";
// import { UserState } from "@/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import { getAllDrugSchedule } from "@/service/api";
import moment from "moment";
import ExpandedTable from "@/components/ExpandedTable";

export default function AllSchedule() {
  // const user = useRecoilValue(UserState);

  const getRowData = async (_data: any) => {
    // setLoading(true);
  };


  const { data, isLoading } = useQuery({
    queryKey: ["drugSchedule"],
    queryFn: () => getAllDrugSchedule(),
  });

  const sanitizeData = (data: any) =>
    data?.map((item: any) => {
      const { drugId, creatorId, __v, updatedAt, startTime, endTime,  ...rest } = item;
      const baseEndTime = moment(item.endTime);
      const endTimePlus5 = baseEndTime.clone().add(10, 'minutes').format();

      return {
        name: drugId?.name,
        startTime: startTime,
        endTime: endTimePlus5,
        ...rest,
        // Optionally include more from drugId if needed:
        // numberOfTablets: drugId?.numberOfTablets,
        // tabletsPerTime: drugId?.tabletsPerTime,
      };
    });

  return (
    <div className="w-full main">
      <ExpandedTable
        getEmailData={getRowData}
        showSendBtn
        hideBtn={true}

        data={sanitizeData(data?.data)}
        name={"Schedule"}
        loading={isLoading}
      />
    </div>
  );
}
