import { Component } from 'solid-js';
import { useField } from 'solid-js-form';

const Input: Component<{ name: string; label: string }> = (props) => {
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
				//@ts-ignore
				use:formHandler //still need to properly type the handler
			/>
			<span style={{ display: 'block', color: 'red' }}>{field.error()}</span>
		</div>
	);
};

export default Input;
