import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type Props = {
	name: string;
	label: string;
	type?: string;
};

const Input: Component<Props> = ({ name, label, type }) => {
	const { field, form } = useField(name);
	const formHandler = form.formHandler;

	return (
		<div>
			<label for={name}>
				{label}
				{field.required() ? ' *' : ''}
			</label>
			<input
				name={name}
				value={field.value() as string}
				type={type}
				//@ts-ignore
				use:formHandler //still need to properly type the handler
			/>
			<span style={{ display: 'block', color: 'red' }}>{field.error()}</span>
		</div>
	);
};

export default Input;
