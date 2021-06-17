import styled from '@emotion/styled';

const TagButtonWrapper = styled.div`
  padding: 2px;
  witdh: 100%;
  max-width: 75px;
  button {
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: none;
    margin: 2px;
    cursor: pointer;
    background-color: #dbedf3;
    color: #00818a;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
    border: 0;
    &:foucus {
      box-shadow: 0 0 5px #00818a inset, 0 0 20px #00818a;
    }
    &:hover {
      box-shadow: 0 0 5px #00818a inset, 0 0 20px #00818a;
    }
  }
`;

const TagButton = ({ id, name }) => {
  return (
    <TagButtonWrapper>
      <button id={id}>{name}</button>
    </TagButtonWrapper>
  );
};

export default TagButton;
