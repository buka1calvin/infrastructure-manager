import React from "react";
import { SelectedPage } from "../shared/variables";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

export const LinkP = ({ page, selectedPage, setSelectedPage }) => {
    
  const lowerCasePage = page.toLocaleLowerCase().replace(/ /g, "");
  return (
    <AnchorLink
      className={`${selectedPage === lowerCasePage ? "text-[#09B294]" : ""}
      transition duration-500 hover:text-[gray]`}
      href= {`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
     <Link to="/">{page}</Link>   
    </AnchorLink>
  );
};

