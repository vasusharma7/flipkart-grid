import { createMuiTheme } from "@material-ui/core";

//Blue and Red "#2E86AB" & "#F24236"

var primary = "#000";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    // primary: {
    //   main: "#2E86AB",
    // },
    background: {
      default: "#202020",
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
    MuiTextField: {
      variant: "outlined",
    },
    MuiCard: {
      elevation: 2,
    },
  },
});

export default theme;
