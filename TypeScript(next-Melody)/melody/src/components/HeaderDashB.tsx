import React from 'react';

const HeaderDashB: React.FC = () => {
  return (
    <header className="flex flex-col px-10 pt-3.5 w-full text-white bg-white bg-opacity-10 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between ml-6 max-w-full w-[958px] max-md:flex-wrap">
        <div className="text-xl">
          <span className="font-semibold">Melody</span>
          <br />
          Music Platform
        </div>
        <nav className="flex gap-5 my-auto text-base uppercase whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto">Marketplace</div>
          <div>About</div>
          <div>Dashboard</div>
          <div>Download</div>
        </nav>
      </div>
      <div className="shrink-0 mt-6 h-px border border-white border-solid max-md:max-w-full" />
    </header>
  );
};

export default HeaderDashB;