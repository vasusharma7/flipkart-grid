import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 345,
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

export default function Blogs() {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState({ men: [], women: [] });
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${global.config.backendURL}/api/commons/getBlogsData/`)
      .then(res => {
        console.log(res.data.men);
        setData({ ...res.data });
        setLoading(false)
      });
  }, []);
  const Women = () => (
    <>
      <Typography component="h1" variant="h5">
        Women
      </Typography>
      <Grid container className={classes.cardLayout}>
        {data?.women.map(ele => (
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={ele.images[0]}
                title={ele.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h4">
                  {ele.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {ele.content.length > 200
                    ? ele.content.substring(0, 200) + "....."
                    : ele.content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
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
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
  const Men = () => (
    <>
      <Typography component="h1" variant="h5">
        Men
      </Typography>
      <Grid container className={classes.cardLayout}>
        {data?.men.map(ele => {
          if (!ele.images) return;
          return (
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={ele.images[0]}
                  title={ele.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h4">
                    {ele.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {/* {ele.content.length > 200
                        ? ele.content.substring(0, 200) + "....."
                        : ele.content} */}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    window.location = "https://www.apetogentleman.com";
                  }}
                >
                  See More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </>
  );
  loading
    ? (document.getElementsByTagName("body")[0].style.overflow = "hidden")
    : (document.getElementsByTagName("body")[0].style.overflow = "scroll");
  return (
    <>
      {loading ? (
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

      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h3"
            style={{ marginBottom: "5%" }}
          >
            Explore Recent Blogs
          </Typography>
          <Switch>
            <Route path="/home/blogs/men" component={() => <Men />} />
            <Route path="/home/blogs/women" component={() => <Women />} />
            <Route path="/home/blogs">
              <>
                <Grid container className={classes.cardLayout}>
                  <Card
                    className={classes.card}
                    style={{ margin: "3%" }}
                    onClick={() => {
                      history.push({
                        pathname: "/home/blogs/men",
                      });
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={
                          "https://i.dmarge.com/2015/10/GettyImages-904920542-640x400.jpg"
                        }
                        title={"Men"}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h4">
                          {"Men"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        ></Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={e => {
                          e.preventDefault();
                          history.push({
                            pathname: "/home/blogs/men",
                          });
                        }}
                      >
                        Explore
                      </Button>
                    </CardActions>
                  </Card>
                  <Card
                    className={classes.card}
                    style={{ margin: "3%" }}
                    onClick={() => {
                      history.push({
                        pathname: "/home/blogs/women",
                      });
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={
                          "https://cdn.shopify.com/s/files/1/2343/4045/products/womens-elegant-mock-neck-tops-fashion-designer-t-shirts-womens-tops-fashion-designer-t-shirts-blouses-international-womens-clothes_1024x1024.jpg?v=1566548207"
                        }
                        title={"Women"}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h4">
                          {"Women"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {/* {ele.content.length > 200
                        ? ele.content.substring(0, 200) + "....."
                        : ele.content} */}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={e => {
                          e.preventDefault();
                          history.push({
                            pathname: "/home/blogs/women",
                          });
                        }}
                      >
                        Explore
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            </Route>
          </Switch>
        </div>
      </Container>
    </>
  );
}
