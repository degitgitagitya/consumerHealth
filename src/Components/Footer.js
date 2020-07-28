import React from "react";
import styled from "styled-components";

const ContentFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
`;

function Footer() {
  return (
    <ContentFooter className="bg-info mt-2 pt-5 pb-3">
      <p>De Gitgit Agitya</p>
    </ContentFooter>
  );
}

export default Footer;
