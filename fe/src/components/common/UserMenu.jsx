import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import menuConfig from "../../configs/menuConfig";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfig.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform={"uppercase"}>
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => dispatch(setUser(null))}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform={"uppercase"}>Logout</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
