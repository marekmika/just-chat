import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

type Props = {
	name: string;
	label: string;
	type?: string;
	ref?: HTMLInputElement;
};

const Input: Component<Props> = (props) => {
	const { field, form } = useField(props.name);
	const formHandler = form.formHandler;

	return (
		<div>
			<label for={props.name}>
				{props.label}
				{field.required() ? ' *' : ''}
			</label>
			<input
				name={props.name}
				value={field.value() as string}
				type={props.type}
				ref={props.ref}
				//@ts-ignore
				use:formHandler //still need to properly type the handler
			/>
			<span style={{ display: 'block', color: 'red' }}>{field.error()}</span>
		</div>
	);
};

export default Input;
