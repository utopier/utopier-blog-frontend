import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';

import { TuiViewerWithForwardedProps } from './TuiViewerWrapper';

interface ViewerPropsWithHandlers extends ViewerProps {
	onChange?(value: string): void;
}

export const Viewer = dynamic<TuiViewerWithForwardedProps>(() => import('./TuiViewerWrapper'), { ssr: false });
export const ViewerWithForwardedRef = React.forwardRef<ViewerType | undefined, ViewerPropsWithHandlers>(
	(props, ref) => <Viewer {...props} forwardedRef={ref as React.MutableRefObject<ViewerType>} />
);

const WysiwygViewer = ({ content }) => {
	const viewerRef = useRef<ViewerType>();
	return (
		<>
			<ViewerWithForwardedRef
				initialValue={content}
				frontMatter={true}
				extendedAutolinks={true}
				useDefaultHTMLSanitizer={true}
				ref={viewerRef}
				// onChange={handleChange}
			/>
		</>
	);
};

export default WysiwygViewer;
