import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from 'axios';

import { Header } from '../Components';

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setCustomersData(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', marginTop: '96px', backgroundColor: 'white', borderRadius: '24px' }}>
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width='auto'
        style={{ marginTop: '10px' }}  // Inline styling for the grid component
      >
        <ColumnsDirective>
          <ColumnDirective field='name' headerText='Name' width='150' textAlign='Center' />
          <ColumnDirective field='email' headerText='Email' width='150' textAlign='Center' />
          <ColumnDirective field='phone' headerText='Phone' width='150' textAlign='Center' />
          <ColumnDirective field='eventDate' headerText='Event Date' width='150' textAlign='Center' type='date' format='yMd' />
          <ColumnDirective field='eventTime' headerText='Event Time' width='150' textAlign='Center' />
          <ColumnDirective field='eventLocation' headerText='Event Location' width='150' textAlign='Center' />
          <ColumnDirective field='eventType' headerText='Event Type' width='150' textAlign='Center' />
          <ColumnDirective field='eventFor' headerText='Event For' width='150' textAlign='Center' />
          <ColumnDirective field='amount' headerText='Amount' width='150' textAlign='Center' />
          <ColumnDirective field='id' headerText='ID' width='120' textAlign='Center' isPrimaryKey={true} visible={false} />
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
