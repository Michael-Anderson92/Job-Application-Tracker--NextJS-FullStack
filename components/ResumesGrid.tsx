"use client";

import './ResumesGrid.css';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { jobTrackerTheme } from '@/lib/ag-grid-theme';
import { useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';

// ✅ REGISTER AG GRID MODULES
ModuleRegistry.registerModules([AllCommunityModule]);

type Resume = {
  id: string;
  name: string;
  version: string;
  focusArea: string;
  fileUrl: string | null;
  createdAt: Date;
};

export function ResumesGrid({ resumes }: { resumes: Resume[] }) {
  const columnDefs: ColDef<Resume>[] = useMemo(() => [
    {
      field: 'name',
      headerName: 'Resume Name',
      flex: 2,
    },
    {
      field: 'version',
      headerName: 'Version',
      flex: 1,
    },
    {
      field: 'focusArea',
      headerName: 'Focus Area',
      flex: 1.5,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<Resume>) => {
        const resume = params.data;
        if (!resume) return null;
        return (
          <div className="flex gap-2 items-center h-full">
            {resume.fileUrl && (
              <button
                onClick={() => window.open(resume.fileUrl || undefined, '_blank')}
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: '#1BA68A', // Teal (changed from blue)
                  color: 'white'
                }}
              >
                Download
              </button>
            )}
          </div>
        );
      },
    },
  ], []);

  return (
    <div className="w-full h-[400px]">
      <AgGridReact
        theme={jobTrackerTheme}
        rowData={resumes}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
      />
    </div>
  );
}