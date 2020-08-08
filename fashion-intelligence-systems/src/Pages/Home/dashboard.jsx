import React, { Component } from "react";
import { connect } from "react-redux";

import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@material-ui/core";
import back from "../../assets/back.jpg";
import model from "../../assets/model.jpg";
var items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
    image: back,
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
    image: model,
  },
];

// function Item(props) {
//   return (
//     <Paper>
//       {/* <h2> */}
//       <props.item.image />
//       {/* </h2> */}
//       <props.item.image />

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }
export class dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <>
        <center style={{ marginTop: "2%", marginBottom: "1%" }}>
          <Typography alignJustify alignCenter variant="h4" type="h3">
            What's Trending ?
          </Typography>
        </center>
        <Carousel
          animation={"slide"}
          timeout={{ appear: 2, enter: 1, exit: 1 }}
        >
          <Paper>
            <img
              alt="back"
              src={back}
              style={{ width: "100px !important", height: "100px !important" }}
            />
          </Paper>
          <Paper>
            <img
              alt="model"
              src={model}
              style={{ height: "100px !important", width: "100px !important" }}
            />
          </Paper>
        </Carousel>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
