import styled from '@emotion/styled';
import { Field, ErrorMessage } from 'formik';

const InputWrapper = styled.div`
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	label {
		padding-left: 10px;
	}
	input {
		margin: 10px;
		max-width: 400px;
		width: 70vw;
	}
	margin-bottom: 20px;
	p {
		padding-left: 10px;
		color: #e94560;
	}
`;

const Input = ({ htmlFor, labelText, type }) => {
	return (
		<>
			<InputWrapper>
				<label htmlFor={htmlFor}>{labelText}</label>
				<Field id={htmlFor} name={htmlFor} type={type}  />
				<p>
					<ErrorMessage name={htmlFor} />
				</p>
			</InputWrapper>
		</>
	);
};

export default Input;
