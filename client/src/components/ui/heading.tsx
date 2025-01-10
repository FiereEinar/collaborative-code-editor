import { PropsWithChildren } from 'react';

export default function Heading({ children }: PropsWithChildren) {
	return <h1 className='text-xl font-bold'>{children}</h1>;
}
