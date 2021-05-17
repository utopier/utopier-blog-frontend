import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import "../../node_modules/@toast-ui/editor/dist/toastui-editor.css"
import "../../node_modules/codemirror/lib/codemirror.css"

export interface TuiEditorWithForwardedProps extends EditorProps {
	forwardedRef?: React.MutableRefObject<Editor>;
}

export default (props: TuiEditorWithForwardedProps) => <Editor {...props} ref={props.forwardedRef} />;
