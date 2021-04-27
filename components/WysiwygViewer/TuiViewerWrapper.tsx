import React from 'react';
import { Viewer, ViewerProps } from '@toast-ui/react-editor';

export interface TuiViewerWithForwardedProps extends ViewerProps {
	forwardedRef?: React.MutableRefObject<Viewer>;
}

export default (props: TuiViewerWithForwardedProps) => <Viewer {...props} ref={props.forwardedRef} />;
