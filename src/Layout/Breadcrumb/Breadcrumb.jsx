import React from "react";
import LargeTitle from "../Title/LargeTitle";
import BreadcrumbPath from "./BreadcrumbPath";

const Breadcrumb = ({title , slug}) => {
  return (
    <div className="flex items-center justify-between ">
      <LargeTitle className="font-semibold capitalize" text={title} />
      <BreadcrumbPath slug={slug}/>
    </div>
  );
};

export default Breadcrumb;
