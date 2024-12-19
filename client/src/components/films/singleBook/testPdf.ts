import React from 'react';
import { OpenFile } from '@react-pdf-viewer/core';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';



const CustomToolbar = (props: ToolbarSlot) => {
    const {
        CurrentPageInput,
        GoToFirstPage,
        GoToLastPage,
        GoToNextPage,
        GoToPreviousPage,
        NumberOfPages,
        ZoomIn,
        ZoomOut,
        // ZoomPopover,
    } = props;

  
};

export {CustomToolbar}

