import React from 'react';
import ComponentsWidgets from '@/components/manage-cards/components-widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cards Management',
};

const ManageCards = () => {
    return <ComponentsWidgets />;
};

export default ManageCards;
