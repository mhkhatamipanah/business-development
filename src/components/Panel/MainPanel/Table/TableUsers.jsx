"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

//  NextUI
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Tooltip , Spinner } from "@nextui-org/react";

// Icon
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { EditIcon, EyeIcon, PlusCircleIcon, Trash } from "lucide-react";

const statusOptions = [
  { name: "فعال", uid: "active" },
  { name: "غیرفعال", uid: "inactive" },
  { name: "استراحت", uid: "rest" },
];
const columns = [
  { name: "شناسه", uid: "id_user", sortable: true },
  { name: "نام و نام خانوادگی", uid: "username", sortable: true },
  { name: "شماره تلفن", uid: "phone", sortable: true },
  { name: "نقش", uid: "role", sortable: true },
  { name: "تیم", uid: "team" },
  { name: "ایمیل", uid: "email" },
  { name: "وضعیت", uid: "status", sortable: true },
  { name: "اکشن", uid: "actions" },
];

const statusColorMap = {
  فعال: "success",
  غیرفعال: "danger",
  استراحت: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "role", "status", "actions", "phone", 'id_user'];

export default function TableUsers({ onOpenCreateUser, onOpenDeleteUser, setIdUser , rerender }) {

  const router = useRouter()




  const [data, setData] = useState(null)
  const [countData, setCountData] = useState(null)



  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState(["inactive", "rest", "active"]);

  const [sortDescriptor, setSortDescriptor] = React.useState({});

  let [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);


  useEffect(() => {
    const arrayStatus = Array.from(statusFilter)

    let data = {
      count: true,
      status: arrayStatus,
      ...(filterValue && { search: filterValue }),
    };

    fetch(`/api/user?${(new URLSearchParams(data)).toString()}`, {
    })
      .then((data => data.json()
        .then(res => {
          setCountData(res.message);
        }

        )))


  }, [filterValue, statusFilter , rerender])

  async function getDynamicDataTable(numberPage = page, countForShow = rowsPerPage, sortBy = sortDescriptor.column, sortWay = sortDescriptor.direction) {
    const arrayStatus = Array.from(statusFilter)
    let data = {
      perPage: countForShow,
      page: numberPage,
      status: arrayStatus,
      ...(filterValue && { search: filterValue }),
      ...(sortDescriptor.column && { sortBy: sortBy }),
      ...(sortDescriptor.direction && { sortWay: sortWay }),
    };

    let api = await fetch(
      `/api/user?${(new URLSearchParams(data)).toString()}`,
      {
        method: "GET"
      }
    );
    let apiJson = await api.json();
    setData(apiJson)

  }

  // CountOfTable



  // Pagination setting
  const pages = Math.ceil(countData / rowsPerPage);
  // const _DATA = usePagination(arrayEmpty, rowsPerPage);



  const handleChange = (p) => {
    // getDynamicDataTable(p)
    setPage(p);
    // _DATA.jump(p);
  };


  useEffect(() => {
    getDynamicDataTable(page, rowsPerPage, sortDescriptor.column, sortDescriptor.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDescriptor, page, rowsPerPage, statusFilter , rerender])

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      if (filterValue) {
        getDynamicDataTable(page, rowsPerPage, sortDescriptor.column, sortDescriptor.direction)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [filterValue])

  const renderCell = React.useCallback((user, columnKey) => {
    // console.log(user, columnKey)
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "age":
        return (
          <>
            {user.age}</>
        )
      case "username":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "phone":
        return `${user.phone}`
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {/* {console.log(user.status)} */}
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 " >

            <Tooltip className="font-iranSans_2" content="جزئیات">
              <span onClick={()=>{
                 router.push(`/dashboard/users/${user.id_user}`)
              }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon size={20} />
              </span>
            </Tooltip>
            <Tooltip className="font-iranSans_2" content="ادیت کاربر">
              <span onClick={() => {
                  router.push(`/dashboard/users/edit/${user.id_user}`)
              }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon size={20} />
              </span>
            </Tooltip>
            <Tooltip className="font-iranSans_2" color="danger" content="حذف کاربر">
              <span onClick={() => {
                setIdUser(user.id_user)
                onOpenDeleteUser()
              }} className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash size={20} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
      getDynamicDataTable()
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
    getDynamicDataTable()
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  وضعیت
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize font-iranSans_2">
                    {(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  ستون
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                // disabledKeys={["id"]}
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="font-iranSans_2"
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onPress={onOpenCreateUser} color="primary" endContent={<PlusCircleIcon size={20} />}>
              کاربر جدید
            </Button>
          </div>
        </div>

        {<div className="flex justify-between items-center">
          <span className="text-default-400 text-small">مجموع کاربران:  {countData} </span>
          <label className="flex items-center text-default-400 text-small">
            نمایش در سطر:
            <select
              className="bg-transparent outline-none text-default-400 text-small mr-2"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>}

      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,

    onSearchChange,
    hasSearchFilter,
    countData
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          dir="ltr"
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={handleChange}
        />

      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [selectedKeys, countData, page, pages, hasSearchFilter]);

  return (
    <>
      {(data && data !== null) ?
       <Table

        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: " thStyle",

        }}
        className="font-iranSans_2"
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >

        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn

              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              className="!text-right bg-white "
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"کاربر یافت نشد"} items={data}>
          {(item) => (
            <TableRow style={{ whiteSpace: "nowrap" }} key={item.phone}>
              {(columnKey) =>
                <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
              }
            </TableRow>
          )}
        </TableBody>

      </Table>
    :
    <>
    <div className="w-full h-[500px] flex justify-center items-center">
     <Spinner size="lg" />
    </div>
    </>  
    }
    </>
  );
}
