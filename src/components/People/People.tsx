import { Activity } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useGetPeople } from '@/service/usePeople';
import { columnDefs } from './col';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export const People = () => {
  const { data } = useGetPeople();

  const rowData = data?.results;

  return (
    <div className='ag-theme-alpine' style={{ height: '100%', width: '100%' }}>
      <Activity mode={rowData ? 'visible' : 'hidden'}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          domLayout='autoHeight'
        />
      </Activity>
    </div>
  );
};
