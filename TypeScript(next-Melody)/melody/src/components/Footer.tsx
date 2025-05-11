import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Añade un desplazamiento suave
    });
  };

  return (
    <footer className={`flex flex-col px-10 w-full text-white mt-[150px] max-md:px-5 max-md:mt-8 ${className} bg-[#232323] relative`}>
      {/* White Line at the Top */}
      <div className="w-full h-1 bg-white"></div>

      <h2 className="text-4xl font-bold mb-8 max-md:text-3xl">Shape the NFT Music</h2>
      <div className="flex flex-col gap-6 max-md:gap-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col gap-4 text-lg">
            <div className="font-semibold text-xl">Facebook</div>
            <div className="text-base">Privacy Policy</div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-0">
            <div className="flex flex-grow gap-4 items-center justify-center md:justify-between text-xl">
              <div className="w-full border-t border-white" />
              <div>Twitter</div>
              <div className="w-full border-t border-white" />
              <div>Medium</div>
              <div className="w-full border-t border-white" />
              <div>Contact</div>
            </div>
            <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}   >
              <img
                loading="lazy"
                src="/images/arrow-up-circle 1.svg"
                className="w-8 h-8"
                alt="Back to top"
              />
              <span>Back to the top</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 text-base mt-4 md:mt-8">
          <div className="flex-grow text-center md:text-left">Terms and Conditions</div>
          <div className="text-center md:text-right">2024</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
