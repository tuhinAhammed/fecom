import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const BreadcrumbPath = ({ slug , className}) => {
  const location = useLocation();

  // Hide breadcrumb if the pathname matches


  const pathnames = location.pathname.split("/").filter((x) => x);

  const path = location.pathname; 
  const desiredPath = path.substring(0, path.lastIndexOf('/')); 
  if (desiredPath === "/dashboard/order") {
    return <p className="text-[8px] text-theme sm:text-[10px] md:text-[12px]">{location.pathname.split("/")[3]}</p>;
  }
  
  // Split the current pathname into parts
  return (
    <nav className={`  ${className}`}>
      <ul className="flex text-[8px] sm:text-[10px] md:text-[12px]">
        {/* Home Link */}
        <li>
          <NavLink to="/" className="text-theme hover:underline ">
            Home
          </NavLink>
        </li>
        <li className="">
          <ul className="flex items-center">
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={index}>
                  <li className="text-primary px-1">/</li>
                  {slug ? (
                    <li className="">
                      <span className="text-primary  capitalize">{slug}</span>
                    </li>
                  ) : (
                    <li className="">
                      {isLast ? (
                        <span className="text-primary  capitalize">
                          {value}
                        </span>
                      ) : (
                        <NavLink
                          to={to}
                          className="text-theme  hover:underline capitalize"
                        >
                          {value}
                        </NavLink>
                      )}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default BreadcrumbPath;
