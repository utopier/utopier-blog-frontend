import { useRouter } from 'next/router';

const Tag = () => {
  const router = useRouter();
  const { tagId } = router.query;

  return (
    <>
      <h1>Tag</h1>
      <h2>tagId : {tagId}</h2>
    </>
  );
};

export default Tag;
