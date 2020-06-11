import React from 'react';

const Hero: React.FC = (): React.ReactElement => {
  return (
    <div>
      <div className="hero">
        <img
          src="/Zubora.svg"
          alt="Zubora Sloth"
          className="img-zubora-sloth"
        />
      </div>
      <style jsx>{`
        .hero {
          background: rgb(40, 12, 33);
          background: linear-gradient(
            170deg,
            rgba(40, 12, 33, 1) 0%,
            rgba(40, 12, 33, 1) 38%,
            rgba(153, 92, 28, 1) 100%,
            rgba(191, 101, 7, 1) 100%
          );
        }
        .hero img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 500px;
        }
      `}</style>
    </div>
  );
};

export default Hero;
