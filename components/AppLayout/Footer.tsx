import styled from '@emotion/styled';

const FooterWrapper = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  background-color: #404b69;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <footer>
        <div>
          <p>Copyright @ 2020- Utopier Inc. </p>
        </div>
      </footer>
    </FooterWrapper>
  );
};

export default Footer;
