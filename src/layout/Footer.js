import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <img src={`${process.env.PUBLIC_URL}/images/footer.jpg`} alt="" />
      </footer>
    </>
  );
};

export default Footer;