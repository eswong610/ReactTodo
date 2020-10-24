import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
//import Switch from 'react-switch';
import styled from "styled-components";
import { FaSun, FaMoon } from 'react-icons/fa';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export function ThemeSwitcher () {
  const { toggleTheme, themeMode } = useContext(AppContext);
  console.log("THEME MODE: ", themeMode);
  
  const handleThemeChange = (e) => {
    toggleTheme();
  };

  const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .custom-classname .react-toggle--checked .react-toggle-track {
    background-color: red;
    height: 1200px;
    width: 1200px;
    padding: 30px;
  }
`;
  
  return (
    <Root>
      <h1>Toggle Theme</h1>
      <FormControlLabel
        control={
          <Switch
            checked={themeMode === "lightTheme" ? true : false}
            onChange={handleThemeChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Dark"
      />
      {/* <Switch
        checked={themeMode === "lightTheme" ? true : false}
        className="test"
        height={50}
        width={120}
        checkedIcon={
          <FaSun
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 35,
              paddingLeft: 10,
            }}
            color={themeMode === "lightTheme" ? "white" : "grey"}
            className="light"
          />
        }
        uncheckedIcon={
          <FaMoon
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 35,
              paddingLeft: 24,
            }}
            color={themeMode === "darkTheme" ? "blue" : "blue"}
            className="dark"
          />
        }
        onChange={handleThemeChange}
      /> */}
    </Root>
    
  );
};

export default ThemeSwitcher;




