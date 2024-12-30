import ComponentsDatatablesExport from '@/components/manage-headers/components-datatables-export';
import IconBell from '@/components/icon/icon-bell';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Manage Headers of Tables',
};

const ManageHeaders = () => {
    return (
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                {/* <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div> */}
                <span className="ltr:mr-3 rtl:ml-3">Manage Headers of Tables </span>
                {/* <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline" rel="noreferrer">
                    https://www.npmjs.com/package/mantine-datatable
                </a> */}
            </div>
            <ComponentsDatatablesExport />
        </div>
    );
};

export default ManageHeaders;
