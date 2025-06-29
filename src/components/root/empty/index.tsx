import React, { ReactNode } from 'react';

type EmptyProps = {
	isEmpty: boolean;
	children: ReactNode;
	emptyComp: ReactNode;
};
function Empty(props: EmptyProps) {
	if (props.isEmpty) {
		return <>{props.emptyComp}</>;
	}
	return <div>{props.children}</div>;
}

export default Empty;
