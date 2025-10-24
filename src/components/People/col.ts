import { Person } from '@/service/usePeople';
import { ColDef } from 'ag-grid-community';

export const columnDefs: ColDef<Person>[] = [
  { headerName: 'Name', field: 'name', sortable: true, filter: true },
  { headerName: 'Height', field: 'height', sortable: true, filter: true },
  { headerName: 'Mass', field: 'mass', sortable: true, filter: true },
  { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
  {
    headerName: 'Birth Year',
    field: 'birth_year',
    sortable: true,
    filter: true,
  },
];
