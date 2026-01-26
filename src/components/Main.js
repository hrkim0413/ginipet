import '../styles/main.css';

const Main = () => {
  return (
    <>
      <section className='main-sec1'>
        <img src={`${process.env.PUBLIC_URL}/images/main1.jpg`} alt="" />
      </section>

      <section className='main-sec2'>
        <img src={`${process.env.PUBLIC_URL}/images/shop.jpg`} alt="" />
      </section>

      <section className='main-sec3'>
        <img src={`${process.env.PUBLIC_URL}/images/story.jpg`} alt="" />
      </section>

      <section className='main-sec4'>
        <img src={`${process.env.PUBLIC_URL}/images/in_star.jpg`} alt="" />
      </section>
    </>
  );
};

export default Main;