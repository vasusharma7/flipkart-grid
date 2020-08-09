import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Grid, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import back from "../../assets/back.jpg";
import model from "../../assets/model.jpg";
import * as action from "../../redux/dataRedux/dataAction";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 250,
    margin: theme.spacing(1),
  },
  media: {
    height: 250,
  },
  paper: {
    maxWidth: "100%",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardLayout: {
    width: "100vw",
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export class dashboard extends Component {
  constructor(props) {
    console.log("hi");
    super(props);
    console.clear();
    console.log(this.props);
    this.props.fetchData();
    this.state = {
      data: [],
    };
  }
  nonTrending = () => {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          className={classes.cardLayout}
          direction={"row"}
          xs={12}
          md={12}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.randomData.non_trending?.map(ele => {
            const id = ele.image.substr(ele.image.indexOf("?") + 1);

            return (
              <Card
                className={classes.card}
                style={{ margin: "1%", height: "max-content" }}
                onClick={() => this.props.history.push(`/home/item/${ele._id}`)}
              >
                <CardActionArea>
                  {/* <CardMedia
                    className={classes.media}
                    image={`https://drive.google.com/thumbnail?${id}`}

                  /> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`https://drive.google.com/thumbnail?${id}`}
                      alt={"non_trending"}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: 250,
                        maxHeight: 350,
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      {ele.colors[0].toUpperCase() +
                        " " +
                        ele.clothing[0].toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Non Trediness Score</strong>{" "}
                      {ele.non_trending_score}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    window.location = "https://vogue.co.uk/";
                  }}
                >
                  See More
                </Button>
              </CardActions> */}
              </Card>
            );
          })}
        </Grid>
      </>
    );
  };
  trending = () => {
    const { classes } = this.props;
    // const history = useHistory();
    return (
      <>
        <Grid
          container
          className={classes.cardLayout}
          direction={"row"}
          xs={12}
          md={12}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.randomData.trending?.map(ele => {
            const id = ele.image.substr(ele.image.indexOf("?") + 1);

            return (
              <Card
                className={classes.card}
                style={{ margin: "1%", height: "max-content" }}
                onClick={() => this.props.history.push(`/home/item/${ele._id}`)}
              >
                <CardActionArea>
                  {/* <CardMedia
                    className={classes.media}
                    image={`https://drive.google.com/thumbnail?${id}`}

                  /> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={ele.image}
                      alt={"trending"}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: 250,
                        maxHeight: 350,
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      {ele.colors[0].toUpperCase() +
                        " " +
                        ele.clothing[0].toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Trediness Score</strong> {ele.trending_score}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    window.location = "https://vogue.co.uk/";
                  }}
                >
                  See More
                </Button>
              </CardActions> */}
              </Card>
            );
          })}
        </Grid>
      </>
    );
  };
  images = [
    "https://cms.qz.com/wp-content/uploads/2017/08/andamen-3.jpg?quality=75&strip=all&w=900&h=600&crop=1",
    "https://selongkarstoriesdotcom.files.wordpress.com/2017/01/italian-men-fashion-sense-sunglasses-and-cup-of-coffee.jpg",
    "https://cdn.nohat.cc/thumb/f/720/4623515516928000.jpg",
    "https://img.freepik.com/free-photo/travel-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-wtih-trendy-hat-sunglass-smiling-blue-pastel-background-copy-space_1258-852.jpg?size=626&ext=jpg",
  ];
  render() {
    const { classes } = this.props;

    this.props.loading
      ? (document.getElementsByTagName("body")[0].style.overflow = "hidden")
      : (document.getElementsByTagName("body")[0].style.overflow = "scroll");
    return (
      <>
        {this.props.loading ? (
          <div
            style={{
              backgroundColor: "#0e111f",
              width: "100vw",
              height: "100vh",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                maxWidth: "800",
                maxHeight: "600",
              }}
              alt="loader"
              src="https://file.mockplus.com/image/2018/04/943d662b-25c9-42d6-9fd2-cc36d2ffab76.gif"
            />
          </div>
        ) : (
          <></>
        )}
        <center style={{ marginTop: "2%", marginBottom: "1%" }}>
          <Typography alignJustify alignCenter variant="h4" type="h3">
            Fashion Itelligence System
          </Typography>
        </center>
        <Carousel
          animation={"slide"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          timeout={{ appear: 1, enter: 500, exit: 500 }}
        >
          {this.images.map(image => (
            <div
              style={{
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
                padding: "2%",
              }}
            >
              <img
                alt="fashion gallery"
                src={image}
                style={{
                  minWidth: "50vw",
                }}
              />
            </div>
          ))}
        </Carousel>
        <Grid container>
          <CssBaseline />
          <Grid container direction={"row"}>
            <Grid
              container
              xs={12}
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                align={"center"}
                component="h4"
                variant="h4"
                style={{ marginBottom: "5%", marginTop: "5%" }}
              >
                Trending - Just In
              </Typography>
              {this.trending()}
            </Grid>
            <Grid
              container
              xs={12}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                align={"center"}
                component="h4"
                variant="h4"
                style={{ marginBottom: "5%", marginTop: "5%" }}
              >
                Lost Trend - Out Of Fashion
              </Typography>

              {this.nonTrending()}

              {/* {console.log(this.props.randomData.non_trending)} */}
            </Grid>
          </Grid>
          {/* </Container> */}
          {/* <Grid container xs={12} spacing={2}>
          <Grid container xs={12} md={6}>
            <div cla
            raphy variant="h4" type="h3">
                Trending - Just In
              </Typography>
            </div>
          </Grid>
          <Grid container xs={12} md={6}></Grid>
        </Grid> */}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  randomData: state.dataReducer.randomData,
  loading: state.dataReducer.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(action.fetchData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(dashboard)));
