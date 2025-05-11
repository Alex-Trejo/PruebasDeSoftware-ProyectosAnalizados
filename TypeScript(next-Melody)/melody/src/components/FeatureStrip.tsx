import React from 'react';
import Marquee from './Marquee';

type FeatureProps = {
  text: string;
};

const Feature: React.FC<FeatureProps> = ({ text }) => (
  <>
    <div className="flex-auto my-auto">{text}</div>
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e21107f2dee2ed0838f97058503ba8801abbaf494e426bf4665fd07d6e8c599?apiKey=a78f6d67d7bc412983425b620122d734&&apiKey=a78f6d67d7bc412983425b620122d734" className="shrink-0 w-9 aspect-square" alt="" />
  </>
);

const FeatureStrip: React.FC = () => (
  <section className="flex gap-5 mt-52 text-2xl font-light text-white uppercase max-md:flex-wrap max-md:mt-10">
  <Marquee />

  </section>
);

export default FeatureStrip;