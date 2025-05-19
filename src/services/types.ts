/* eslint-disable @typescript-eslint/no-explicit-any */
import { CODE } from '@/configs/responseCode';

export type ResponseHasNotResponseProps = {
	onSuccess: VoidFunction;
	onError: VoidFunction;
};

export type ResponseHasResponseProps = {
	defaultLoading?: boolean;
	defaultState?: unknown;
	onSuccess: (res: any) => void;
	[name: string]: any;
};
export type ResponseNotData = {
	code: string;
	mess: string;
};
export type ResponseBrowser = {
	code: string | CODE;
	data: unknown;
};
export type PayloadRequestList = {
	from: number;
	limit?: number;
	search?: string;
	[name: string]: unknown;
};

export type ResponseRequest<T> = {
	list: T[];
	total: number;
};

export const initialResponseRequest: ResponseRequest<unknown> = {
	list: [],
	total: 0,
};
export const initialResponseNotData: ResponseNotData = {
	code: CODE.success,
	mess: 'Ok',
};

export type ResponseUpload = {
	link: string;
	name: string;
	createAt: number;
	duration?: number;
};
