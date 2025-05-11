import React from 'react';


interface GradientEllipsesProps {
  className?: string;
}

const GradientEllipses: React.FC<GradientEllipsesProps> = ({ className }) => {
  return (
    <div className="absolute top-[-550px] left-[-900px] w-full h-full z-1 ">
      <div className="relative h-[1080.26px]">
        <div className="absolute left-[781.13px] top-0 w-[697.41px] h-[818.52px] bg-gradient-to-br from-[#7000FF] to-[#06FFF0] rounded-full blur-[133.97px] rotate-[54.351deg]"></div>
        <div className="relative w-[904px] h-[845.26px]">
          <div className="absolute left-[571.23px] top-[433.14px] w-[450.25px] h-[587.07px] bg-gradient-to-b from-[#03FB75] to-[#06FFF0] rounded-full blur-[176.73px] rotate-[76.66deg]"></div>
          <div className="absolute left-[417.8px] top-[760.18px] w-[346.55px] h-[346.55px] bg-gradient-to-b from-[#2603FB] to-[#DC06FF] rounded-full blur-[176.73px] rotate-[-22.538deg]"></div>
          <div className="absolute left-[803.91px] top-[235px] w-[433.79px] h-[636.58px] bg-gradient-to-b from-[#FB03F5] to-[#AA9CFF] rounded-full blur-[94.71px] rotate-[76.66deg]"></div>
        </div>
      </div>
    </div>
  );
};

export default GradientEllipses;
