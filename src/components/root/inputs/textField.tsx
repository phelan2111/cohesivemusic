import Localize from '@/langs';
import { Helper } from '@/utils/helper';
import { HTMLInputTypeAttribute, ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface ITextFieldProps
	extends Omit<
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>,
		'onChange' | 'autoFocus'
	> {
	label?: string;
	classNameInput?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	defaultValue?: string;
	type?: HTMLInputTypeAttribute;
	onChange?: (valueInput: string) => void;
	icon?: {
		direction: 'start' | 'end';
		node: ReactNode;
	};
	autoFocus?: boolean;
	messageError?: string;
	classHelperText?: string;
}

function TextField({
	classNameInput = '',
	className = '',
	name = '',
	classHelperText = 'text-red-500',
	type = 'text',
	required = false,
	...props
}: ITextFieldProps) {
	const form = useFormContext();

	const initialValue = useMemo(() => {
		return props.defaultValue ?? form?.getValues()?.[name];
	}, [props.defaultValue, form, name]);
	const messageError = useMemo(() => {
		return form?.formState.errors?.[name]?.message ?? props.messageError;
	}, [form?.formState.errors, name, props.messageError]);

	const [value, setValue] = useState<string>(initialValue);

	const isIconStart = props.icon?.direction === 'start';
	const isIconEnd = props.icon?.direction === 'end';

	const handleChange = (valueInput: string) => {
		setValue(valueInput);
		if (!Helper.isEmpty(name)) {
			form?.setValue(name, valueInput, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		}
	};

	return (
		<div className='flex flex-col gap-1 relative'>
			{props.label && (
				<p className='text-base'>
					{Localize(props.label)}{' '}
					{required && <span className='text-red-500'>(*)</span>}
				</p>
			)}
			<div
				className={`relative flex h-fit bg-white/10 items-center gap-1 hover:bg-white/40 transition-all duration-500 focus-within:bg-white/40 px-2 rounded-sm ${className}`}>
				{isIconStart && props.icon && props.icon.node}
				<input
					value={
						Helper.isEmpty(Localize(JSON.stringify(value)))
							? value
							: Localize(value)
					}
					type={type}
					name={name}
					placeholder={props.placeholder}
					className={`w-full outline-none bg-transparent h-11 text-primary_light text-base ${classNameInput}`}
					{...props}
					onChange={(e) => {
						handleChange(e.currentTarget.value);
						props.onChange && props.onChange(e.currentTarget.value);
					}}
				/>
				{isIconEnd && props.icon && props.icon.node}
			</div>
			{!Helper.isEmpty(messageError) && (
				<p
					className={`text-xs px-2 py-0.5 rounded-3xl italic text-end absolute bottom-0 right-0 translate-y-full ${classHelperText}`}>
					{messageError?.toString()}
				</p>
			)}
		</div>
	);
}

export default TextField;
