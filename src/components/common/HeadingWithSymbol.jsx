import React from "react";

const HeadingWithSymbol = ({ content, Icon }) => {
  return (
    <div className="flex items-center">
      {Icon && <Icon className="mr-2 text-lg" />}
      <h2 className="text-lg font-bold">{content}</h2>
    </div>
  );
};

export default HeadingWithSymbol;
