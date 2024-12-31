'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import IconFile from '@/components/icon/icon-file';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconPrinter from '@/components/icon/icon-printer';
import { Transition, Dialog, Tab, DialogPanel, TransitionChild } from '@headlessui/react';
import IconX from '@/components/icon/icon-x';
import React, { Fragment, useRef } from 'react';
import IconUser from '@/components/icon/icon-user';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        // address: {
        //     street: '529 Scholes Street',
        //     city: 'Temperanceville',
        //     zipcode: 5235,
        //     geo: {
        //         lat: 23.806115,
        //         lng: 164.677197,
        //     },
        // },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
        action: '',
    },
];

const col = ['id', 'firstName', 'lastName', 'company', 'age', 'dob', 'email', 'phone', 'actions'];

const ComponentsDatatablesExport = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [modal21, setModal21] = useState(false);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';
            records.map((item: any) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };
    return (
        <div>
            {/* Add Header */}
            <div className="mt-3" style={{ display: 'flex', justifyContent: 'end' }}>
                <button type="button" onClick={() => setModal21(true)} className="btn btn-danger">
                    + Add Header
                </button>
                <Transition appear show={modal21} as={Fragment}>
                    <Dialog
                        as="div"
                        open={modal21}
                        onClose={() => {
                            setModal21(false);
                        }}
                    >
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </TransitionChild>
                        <div id="register_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5>Add Header</h5>
                                            <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconUser className="h-5 w-5" />
                                                    </span>
                                                    <input type="text" placeholder="Name" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                                </div>
                                                {/* <div className="relative mb-4">
                                                            <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                <IconAt />
                                                            </span>
                                                            <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" />
                                                        </div>
                                                        <div className="relative mb-4">
                                                            <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                <IconLock className="h-5 w-5" />
                                                            </span>
                                                            <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="password" />
                                                        </div> */}
                                                <button type="button" className="btn btn-primary w-full">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                        {/* <div className="my-4 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div> */}
                                        {/* <div className="mb-5 flex items-center justify-center gap-3">
                                                    <button type="button" className="btn btn-outline-primary flex gap-1">
                                                        <IconFacebook className="h-5 w-5 shrink-0" />
                                                        <span>Facebook</span>
                                                    </button>
                                                    <button type="button" className="btn btn-outline-danger flex gap-1">
                                                        <IconGithub className="shrink-0" />
                                                        <span>Github</span>
                                                    </button>
                                                </div> */}
                                        {/* <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                                                    <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                                                        Already have
                                                        <button type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                                                            Login?
                                                        </button>
                                                    </p>
                                                </div> */}
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center">
                        <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                            CSV
                        </button>
                        <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                            TXT
                        </button>

                        <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                            PRINT
                        </button>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: '#', sortable: true },
                            { accessor: 'firstName', sortable: true },
                            { accessor: 'lastName', sortable: true },
                            { accessor: 'company', title: 'Company', sortable: true },
                            { accessor: 'age', title: 'Age', sortable: true },
                            {
                                accessor: 'dob',
                                title: 'Start Date',
                                sortable: true,
                                render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            },
                            { accessor: 'email', sortable: true },
                            { accessor: 'phone', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Action',
                                render: ({ id }) => (
                                    <div className="flex items-center gap-2">

                                        <div>
                                            <button type="button" onClick={() => setModal21(true)} className="btn btn-icon btn-sm">
                                                <IconEdit className="h-5 w-5 text-blue-500" />
                                            </button>
                                            <Transition appear show={modal21} as={Fragment}>
                                                <Dialog
                                                    as="div"
                                                    open={modal21}
                                                    onClose={() => {
                                                        setModal21(false);
                                                    }}
                                                >
                                                    <TransitionChild
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <div className="fixed inset-0" />
                                                    </TransitionChild>
                                                    <div id="register_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                                        <div className="flex min-h-screen items-start justify-center px-4">
                                                            <TransitionChild
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="opacity-100 scale-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100 scale-100"
                                                                leaveTo="opacity-0 scale-95"
                                                            >
                                                                <DialogPanel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark">
                                                                    <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                                        <h5>Add Header</h5>
                                                                        <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                                                            <IconX />
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-5">
                                                                        <form>
                                                                            <div className="relative mb-4">
                                                                                <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                                    <IconUser className="h-5 w-5" />
                                                                                </span>
                                                                                <input type="text" placeholder="Name" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                                                            </div>
                                                                            {/* <div className="relative mb-4">
                                                            <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                <IconAt />
                                                            </span>
                                                            <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" />
                                                        </div>
                                                        <div className="relative mb-4">
                                                            <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                <IconLock className="h-5 w-5" />
                                                            </span>
                                                            <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="password" />
                                                        </div> */}
                                                                            <button type="button" className="btn btn-primary w-full">
                                                                                Submit
                                                                            </button>
                                                                        </form>
                                                                    </div>
                                                                    {/* <div className="my-4 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div> */}
                                                                    {/* <div className="mb-5 flex items-center justify-center gap-3">
                                                    <button type="button" className="btn btn-outline-primary flex gap-1">
                                                        <IconFacebook className="h-5 w-5 shrink-0" />
                                                        <span>Facebook</span>
                                                    </button>
                                                    <button type="button" className="btn btn-outline-danger flex gap-1">
                                                        <IconGithub className="shrink-0" />
                                                        <span>Github</span>
                                                    </button>
                                                </div> */}
                                                                    {/* <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                                                    <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                                                        Already have
                                                        <button type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                                                            Login?
                                                        </button>
                                                    </p>
                                                </div> */}
                                                                </DialogPanel>
                                                            </TransitionChild>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                        </div>

                                        {/* <button
                                            type="button"
                                            // onClick={() => handleEdit(id)}
                                            className="btn btn-icon btn-sm"
                                        >
                                            <IconEdit className="h-5 w-5 text-blue-500" />
                                        </button> */}

                                        <button
                                            type="button"
                                            // onClick={() => handleDelete(id)}
                                            className="btn btn-icon btn-sm"
                                        >
                                            <IconTrash className="h-5 w-5 text-red-500" />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ComponentsDatatablesExport;
