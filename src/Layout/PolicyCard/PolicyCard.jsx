import React from "react";
import DOMPurify from "dompurify";

const PolicyCard = ({pageData}) => {
    const aboutContent = DOMPurify.sanitize(pageData);
    
  return (
    <div>
      <div
        className=" sm:py-sectionSm lg:py-sectionSm px-2 sm:px-4 md:px-6 lg:px-24 bg-secondary rounded-md "
      >
        {aboutContent && (
          <div
            className="blog-content select-none"
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          ></div>
        ) 

        }
      </div>
      
    </div>
  );
};

export default PolicyCard;
