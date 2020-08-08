import React, { Component } from "react";

// import styled from "styled-components";
import Typography from "@material-ui/core/Typography";



class Footer extends Component {
  render() {
    return (
      <div
style={{
  marginTop:"5%",
   display: "flex",
   padding:"10px",
  minHeight: "max-content",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: "#3f51b5",
}}>
  
        <Typography variant="h4" variant="h4">Fashion Intelligence System</Typography>
        <Typography variant="h6" variant="h6">Made By <span style={{color:"black"}}>Team Code Phreaks 26</span></Typography>
</div>
    );
  }
}

export default Footer;