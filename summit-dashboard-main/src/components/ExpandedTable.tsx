import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import moment from "moment";
import { Button } from "./ui/button";
import { EllipsisIcon, PlusIcon } from "lucide-react";

export default function ExpandedTable({
  data,
  name,
  children,
  setDialog,
  createItemBtn,
  loading,
}: any) {
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const products = data ?? [];
  const allColumns =
  data && data?.length > 0
    ? Object.keys(data[0]).filter(
        (key) => !["_id"].includes(key)
      )
    : [];
  // const allColumns =
  //   data && data?.length > 0
  //     ? Object.keys(data[0]).filter(
  //         (key) => !["_id", "creatorId", "__v", "updatedAt"].includes(key)
  //       )
  //     : [];
  // const allColumns =
  //   data?.length > 0 ? Object.keys(data?.[0])?.map((res) => res) : [];

  const formatHeader = (text: string) =>
    text
      ?.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());

  const openNew = () => {
    setProductDialog(true);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const getDialog = () => {
    const data = setDialog;
    console.log(data);
    
    if (!data) {
      hideDialog();
    }
  };

  const leftToolbarTemplate = () => {
    return <div className="flex flex-wrap gap-2"></div>;
  };

  const headerTemplate = (data: any) => {
    return (
        <React.Fragment>
            
            <span className="vertical-align-middle ml-2 font-bold line-height-3">{data.name}</span>
        </React.Fragment>
    );
};

  const actionBodyTemplate = (_rowData: any) => {
    return (
      <>
        <button
          disabled={loading}
          className="btn__sec !border-black/30 !h-[40px]"
        >
           <EllipsisIcon/>
        </button>
      </>
    );
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <span>
        {rowData.createdAt
          ? moment(rowData.createdAt).format("MMMM Do YYYY")
          : ""}
      </span>
    );
  };

  const statusTemplate = (rowData: any) => {
    return (
      <span
        className={`p-1  rounded-xl px-2 ${
          rowData.status == "pending"
            ? "bg-orange-100 text-orange-500"
            : rowData?.status == "taken"
            ? "bg-green-100 text-green-500 "
            : rowData?.status == "missed"
            ? "bg-red-100 text-red-500 "
            : ""
        }`}
      >
        {rowData?.status}
      </span>
    );
  };
  const startTimeTemplate = (rowData: any) => {
    return (
      <span>
        {rowData.startTime
          ? moment(rowData.startTime).format("MMMM Do YYYY, h:mm:ss a")
          : ""}
      </span>
    );
  };
  const endtimeTemplate = (rowData: any) => {
    return (
      <span>
        {rowData.endTime ? moment(rowData.endTime).format("MMMM Do YYYY, h:mm:ss a") : ""}
      </span>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="">
        {createItemBtn ? (
          <Button onClick={openNew}>
            <PlusIcon />
            Create Drug
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  };

  // const tabBodyTemplate = (rowData: any) => {
  //   return (
  //     <div>
  //       {rowData?.requestSent ? (
  //         <span className="text-sm p-1 rounded-full px-3 bg-green-200 text-green-600">
  //           Sent
  //         </span>
  //       ) : (
  //         <span className="text-sm p-1 rounded-full px-2 bg-yellow-200 text-yellow-600">
  //           Pending
  //         </span>
  //       )}
  //     </div>
  //   );
  // };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          className="text-sm"
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  useEffect(() => {
    getDialog();
  }, [setDialog]);

  return (
    <div className="w-full">
      <Toast ref={toast} />
      <h4 className="m-0 font-bold py-3 pb-10 text-xl">List of all {name}</h4>
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={products ?? []}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="_id"
          paginator
          rowGroupMode="subheader" 
          groupRowsBy="name"
          expandableRowGroups 
          rowGroupHeaderTemplate={headerTemplate}
          expandedRows={expandedRows} onRowToggle={(e: any) => setExpandedRows(e.data)}
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} "
          globalFilter={globalFilter}
          header={header}
        >
          {allColumns &&
            allColumns?.map((item) => (
              <Column
                className="text-sm"
                field={item}
                header={formatHeader(item)}
                body={
                  item == "createdAt"
                    ? statusBodyTemplate
                    : item == "endTime"
                    ? endtimeTemplate
                    : item == "startTime"
                    ? startTimeTemplate
                    : item == "status"
                    ? statusTemplate
                    : ""
                }
              ></Column>
            ))}
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        modal
        visible={productDialog}
        draggable={false}
        resizable={false}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`New ${name}`}
        className="p-fluid"
        onHide={hideDialog}
      >
        {children}
      </Dialog>
    </div>
  );
}
