import React from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding-top: 10px;
    background-color: #404b69;
`

const Footer = () => {
    return (
        <>
            <FooterWrapper>
				<div>
					<p>Copyright @ 2020- Utopier Inc. </p>
				</div>
			</FooterWrapper>
        </>
    )
};

export default Footer;