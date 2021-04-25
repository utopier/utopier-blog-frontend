import React from 'react';
import styled from '@emotion/styled';

import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';
import Footer from './Footer';

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;

    #content {
        width: 100%;
        padding-top: 10vh;
        padding-left: 170px;
        min-height: 800px;
        z-index:-1;
    }
    @media (max-width: 700px) {
		#content {
            z-index:1;
			padding-left: 0;
		}
    }
`;

interface AppLayoutProps  {
    children: React.ReactNode;
}


const AppLayout = ({children}:AppLayoutProps) => {
   
    return (
        <>  <TopNavigation/>
            <ContentWrapper>
                <LeftNavigation />
                <div id="content">{children}</div>
            </ContentWrapper>
            <Footer/>
        </>
    )
};

export default AppLayout;