// "use client";

// import './InterviewsGrid.css';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef, ValueGetterParams, ModuleRegistry } from 'ag-grid-community';
// import { AllCommunityModule } from 'ag-grid-community';
// import { jobTrackerTheme } from '@/lib/ag-grid-theme';
// import { useMemo } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';

// // ✅ REGISTER AG GRID MODULES
// ModuleRegistry.registerModules([AllCommunityModule]);

// type Interview = {
//   id: string;
//   round: string;
//   date: Date;
//   interviewer: string | null;
//   outcome: string | null;
//   job: {
//     position: string;
//     company: string;
//   };
// };

// export function InterviewsGrid({ interviews }: { interviews: Interview[] }) {
//   const columnDefs: ColDef<Interview>[] = useMemo(() => [
//     {
//       headerName: 'Company',
//       valueGetter: (params: ValueGetterParams<Interview>) => params.data?.job.company,
//       flex: 1.5,
//     },
//     {
//       headerName: 'Position',
//       valueGetter: (params: ValueGetterParams<Interview>) => params.data?.job.position,
//       flex: 2,
//     },
//     {
//       field: 'round',
//       headerName: 'Round',
//       flex: 1.5,
//     },
//     {
//       field: 'date',
//       headerName: 'Date',
//       flex: 1,
//       valueFormatter: (params) => {
//         return new Date(params.value).toLocaleDateString();
//       },
//       sort: 'desc',
//     },
//     {
//       field: 'interviewer',
//       headerName: 'Interviewer',
//       flex: 1.5,
//     },
//     {
//       field: 'outcome',
//       headerName: 'Outcome',
//       flex: 1,
//       cellStyle: (params) => {
//         if (params.value === 'passed') {
//           return {
//             backgroundColor: '#1BA68A',
//             color: 'white',
//             fontWeight: 'bold'
//           };
//         }
//         if (params.value === 'rejected') {
//           return {
//             backgroundColor: '#113B32',
//             color: 'white',
//             fontWeight: 'normal'
//           };
//         }
//         return undefined;
//       },
//     },
//   ], []);

//   return (
//     <div className="w-full h-[400px]">
//       <AgGridReact
//         theme={jobTrackerTheme}
//         rowData={interviews}
//         columnDefs={columnDefs}
//         defaultColDef={{
//           sortable: true,
//           filter: true,
//           resizable: true,
//         }}
//       />
//     </div>
//   );
// }