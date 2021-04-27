import wrapper from '../store';
import React from 'react';

// 뉴포미즘

// layout(grid, flex)

// Storybook
    // slider
    // dropdown
    // modal
    // animation
    // interactive page

// video
// img
// font

function HomePage() {
    return (
    <>
        <div>
            Home Page
        </div>
    </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	console.log(`redux store : ${context.store}`)
});

export default HomePage