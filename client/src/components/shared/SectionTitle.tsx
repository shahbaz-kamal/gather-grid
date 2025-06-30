import React from "react";

type SectionTitleProps = {
  heading: string;
  subheading?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ heading, subheading }) => {
  return (
    <div className="text-center max-w-xl mx-auto mb-6 md:mb-8 font-lora">
      <h2 className="text-3xl md:text-4xl font-bold text-light-accent dark:text-dark-accent leading-tight">
        {heading}
      </h2>
      {subheading && (
        <p className="text-sm md:text-base  uppercase tracking-wider mb-2 text-light-text dark:text-dark-text">
          {subheading}
        </p>
      )}

      <div className="mt-2 w-20 h-[2px] bg-light-accent mx-auto"></div>
    </div>
  );
};

export default SectionTitle;
