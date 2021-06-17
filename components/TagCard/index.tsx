import styled from '@emotion/styled';

const TagCardWrapper = styled.li`
  border: 1px solid #dbedf3;
  border-radius: 5px;
  .tags__tagCard--name {
    background-color: #dbedf3;
    color: #00818a;
    height: 20px;
    h2 {
      font-weight: 600;
      text-align: center;
    }
  }
  .tags__tagCard--questions {
    height: 40px;
    display: flex;
    justify-content: center;
    align-conent: center;
  }
  &:foucus {
    box-shadow: 0 0 30px #00818a inset, 0 0 20px #00818a;
  }
  &:hover {
    box-shadow: 0 0 30px #00818a inset, 0 0 50px #00818a;
  }
`;

const TagCard = ({ tagData }: any) => {
  return (
    <TagCardWrapper>
      <div className="tags__tagCard--name">
        <h2>{tagData.name}</h2>
      </div>
      <div className="tags__tagCard--questions">
        <p> {tagData.posts.length} posts</p>
      </div>
    </TagCardWrapper>
  );
};

export default TagCard;
