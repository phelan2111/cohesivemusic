/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/named */
import Config from '@/configs';
import { CODE } from '@/configs/responseCode';
import { ToastContext, ToastType } from '@/contexts/toast';
import { Logger } from '@/utils/logger';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { useContext } from 'react';

const config = new Config().getState();

export type requestMiddlewareProps = {
	request: AxiosRequestConfig;
	keyQuery: string[];
};
export type DataResponse<T = object> = {
	code: string;
	data: T;
	message: string;
};
export function requestMiddleware(props: requestMiddlewareProps) {
	const { onToast } = useContext(ToastContext);

	const mutation = useMutation({
		mutationKey: props.keyQuery,
		mutationFn: async (data: unknown) => {
			const hasMethodGet = props.request.method === 'get';
			const promise = await axios({
				...props.request,
				data: hasMethodGet ? undefined : data,
				url: `${config.api.host}${props.request.url}`,
				timeout: 50000,
				params: hasMethodGet ? data : undefined,
			})
				.then((res) => {
					if (res.data?.status === CODE.systemError) {
						onToast({
							theme: ToastType.error,
							label: res.data?.status,
							content: res.data?.message,
						});
					}
					return res.data;
				})
				.catch((err) => {
					Logger.error('requestMiddleware execute axios error', err);
				});

			return promise;
		},
	});
	return mutation;
}
