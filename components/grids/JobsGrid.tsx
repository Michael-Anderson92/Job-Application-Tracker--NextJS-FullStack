"use client";

import './JobsGrid.css';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  ICellRendererParams,
  CellValueChangedEvent,
  ModuleRegistry
} from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { jobTrackerTheme } from '@/lib/ag-grid-theme';
import { colors, buttonVariants } from '@/lib/design-system';
import { useMemo, useState } from 'react';
import { FloatingActionIcons } from './FloatingActionIcons';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';

// ✅ REGISTER AG GRID MODULES
ModuleRegistry.registerModules([AllCommunityModule]);

type Job = {
  id: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  appliedDate: Date;
  lastContact: Date | null;
  nextFollowUp: Date | null;
  salaryRange: string | null;
  jobUrl: string | null;
  website: string | null;
  resumeId: string | null;
  coverLetterUrl: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type JobsGridProps = {
  jobs: Job[];
  onAddJobClick: () => void;
};

export function JobsGrid({ jobs, onAddJobClick }: JobsGridProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Status options for dropdown
  const statusOptions = ['applied', 'screening', 'interview', 'offer', 'rejected'];
  const modeOptions = ['full-time', 'part-time', 'contract', 'internship'];

  // Handle cell value changes - Properly typed for 2025
  const onCellValueChanged = (params: CellValueChangedEvent<Job>) => {
    const updatedJob = params.data;
    console.log('Job updated:', updatedJob);
    console.log('Field changed:', params.colDef.field);
    
    // TODO: Make API call to save changes
    // try {
    //   await fetch(`/api/jobs/${updatedJob.id}`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedJob)
    //   });
    // } catch (error) {
    //   console.error('Failed to update job:', error);
    // }
  };

  // Column Definitions
  const columnDefs: ColDef<Job>[] = useMemo(() => [
    {
      field: 'position',
      headerName: 'Position',
      flex: 2,
      filter: 'agTextColumnFilter',
      pinned: 'left',
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1.5,
      filter: 'agTextColumnFilter',
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      filter: 'agSetColumnFilter',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: statusOptions,
      },
    },
    {
      field: 'mode',
      headerName: 'Type',
      flex: 1,
      filter: 'agSetColumnFilter',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: modeOptions,
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1.5,
      filter: 'agTextColumnFilter',
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'salaryRange',
      headerName: 'Salary',
      flex: 1,
      filter: 'agTextColumnFilter',
      editable: true,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) => params.value || '-',
    },
    {
      field: 'appliedDate',
      headerName: 'Applied',
      flex: 1,
      editable: true,
      // ✅ FIXED: Use agDateCellEditor for JS Date objects (2025 best practice)
      cellEditor: 'agDateCellEditor',
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '-';
      },
      sort: 'desc',
    },
    {
      field: 'lastContact',
      headerName: 'Last Contact',
      flex: 1,
      editable: true,
      // ✅ FIXED: Use agDateCellEditor for JS Date objects
      cellEditor: 'agDateCellEditor',
      valueFormatter: (params) => {
        return params.value 
          ? new Date(params.value).toLocaleDateString() 
          : '-';
      },
    },
    {
      field: 'nextFollowUp',
      headerName: 'Follow Up',
      flex: 1,
      editable: true,
      // ✅ FIXED: Use agDateCellEditor for JS Date objects
      cellEditor: 'agDateCellEditor',
      valueFormatter: (params) => {
        return params.value
          ? new Date(params.value).toLocaleDateString()
          : '-';
      },
    },
    // Actions column removed - using floating icons instead
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
    minWidth: 60,
    wrapText: false,
    autoHeight: false,
  }), []);

  // Empty state when no jobs
  if (jobs.length === 0) {
    return (
      <div className="jobs-grid-empty">
        <svg 
          className="w-24 h-24 mb-4"
          style={{ color: colors.border }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
          No Jobs Yet
        </h3>
        <p className="text-sm mb-4" style={{ color: colors.text }}>
          Start tracking your job applications
        </p>
        <button onClick={onAddJobClick} className={buttonVariants.primary}>
          Add Your First Job
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="jobs-grid-wrapper">
        <AgGridReact
          theme={jobTrackerTheme}
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          animateRows={true}
          rowSelection="multiple"
          enableCellTextSelection={true}
          rowHeight={55}
          suppressHorizontalScroll={false}
          onCellValueChanged={onCellValueChanged}
          singleClickEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          // ✅ 2025 UX improvements
          rowBuffer={10} // Better performance with many rows
          suppressCellFocus={false} // Keep focus outline for accessibility
          // Track pagination changes
          onPaginationChanged={(event) => {
            const api = event.api;
            setCurrentPage(api.paginationGetCurrentPage() + 1); // AG Grid is 0-indexed
            setPageSize(api.paginationGetPageSize());
          }}
        />
      </div>

      {/* Floating Action Icons */}
      <FloatingActionIcons
        jobs={jobs}
        rowHeight={55}
        headerHeight={50}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
}