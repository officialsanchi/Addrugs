import { UserAuthState } from "@/atoms/authAtom";
import { Navigate, Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { AppSidebar } from "../AppSidebar";

export default function LoggedInLayouts({}) {
  const auth = useRecoilValue(UserAuthState);

  
  return (
    <div>
      {auth && auth?.token?.length > 0 ? (
        <div className="">
          <AppSidebar>
            <div className=" p-2">
              <Outlet />
            </div>
          </AppSidebar>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
