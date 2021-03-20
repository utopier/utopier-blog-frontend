import wrapper from '../store';

function HomePage() {
    return <div>Welcome to Next.js!</div>
}

export const getServerSideProps = wrapper.getServerSideProps(async (context: any) => {
	console.log(`redux store : ${context.store}`)
});

export default HomePage