import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  label {
    display: none;
  }
  button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-weight: 400;
    color: ${({ theme }) => theme.blueGreen};
    font-size: 1em;
    background-color: white;
    border-radius: ${(props: any) => props.borderRadius || '10px'};
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: none;
    border: 1px solid ${({ theme }) => theme.blueGreen};
  }
  button:hover {
    width: 100%;
    height: 100%;
    background: #dbedf3;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 20px ${({ theme }) => theme.blueGreen};
  }
  button:focus {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 20px ${({ theme }) => theme.blueGreen};
  }
`;

const Button = ({ id, label, ariaLabel, hidden, type, text, width, height, borderRadius, onClick }: any) => {
  return (
    <>
      <ButtonWrapper style={{ width: width, height: height, borderRadius: borderRadius }}>
        <label htmlFor={id}>{label}</label>
        <button id={id} aria-label={ariaLabel} type={type} hidden={hidden} onClick={onClick}>
          {text}
        </button>
      </ButtonWrapper>
    </>
  );
};

export default Button;
