import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router";
import {
  MenuIcon,
  HomeOutlined as Home,
  Panorama,
  Person,
  ShoppingCart,
} from "@material-ui/icons/";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Redirect } from "react-router-dom";
import MoreIcon from "@material-ui/icons/MoreVert";
import * as action from "../../redux/loginRedux/loginAction";
import * as actionData from "../../redux/dataRedux/dataAction";
import { connect } from "react-redux";
// import Notifications from "react-notification-system-redux";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "contents",
    },
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0, 0, 2),
    height: "100%",
    position: "relative",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header(props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={() => props.logout()}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push({ pathname: "/home/blogs" })}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="secondary"> */}
          <Panorama />
          {/* </Badge> */}
        </IconButton>
        <p>Blogs</p>
      </MenuItem>
      <MenuItem onClick={() => history.push({ pathname: "/home/model" })}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          {/* <Badge badgeContent={11} color="secondary"> */}
          <Person />
          {/* </Badge> */}
        </IconButton>
        <p>Model Arena</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <ShoppingCart />
        </IconButton>
        <p>My Selections</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );
  const onTagsChange = (event, values) => {
    // props.fetchCategory(values.title)
    if(!values) 
      history.push({pathname:`/home/`})
    history.push({pathname:`/home/category/${values.title}`})
  }
  return (
    <div className={classes.grow}>
      {props.loggedOut && <Redirect to="/" />}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Fashion Intelligence"
            onClick={() => history.push({ pathname: "/home" })}
          >
            <Home />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Fashion Intelligence System
          </Typography>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.search}>
            <Autocomplete
              inputProps={{ "aria-label": "search" }}
              placeholder="Search…"
              id="combo-box-demo"
              options={[
                { title: "shirt" },
                { title: "jeans" },
                { title: "dress" },
              ]}
               onChange={onTagsChange}
              getOptionLabel={option => option.title}
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  {...params}
                  label="Search"
                  variant="outlined"
                />
              )}
            />
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            /> */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              onClick={() => history.push({ pathname: "/home/blogs" })}
              aria-label="Blogs"
              color="inherit"
              style={{ borderRadius: "10px" }}
            >
              <Panorama />
              <Typography variant="h6" noWrap>
                Blogs
              </Typography>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              aria-label="Blogs"
              onClick={() => history.push({ pathname: "/home/model" })}
              color="inherit"
              style={{ borderRadius: "10px" }}
            >
              <Person />
              <Typography variant="h6" noWrap>
                Model Arena
              </Typography>
            </IconButton>
            <IconButton
              aria-label="Blogs"
              color="inherit"
              style={{ borderRadius: "10px" }}
            >
              <ShoppingCart />
              <Typography variant="h6" noWrap>
                Selections
              </Typography>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loggedOut: state.loginReducer.loggedOut,
    // error: state.loginReducer.error,
    notifications: state.notifications,
    // loading: state.loginReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: data => dispatch(action.logout()),
    fetchCategory: category => dispatch(actionData.fetchCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
