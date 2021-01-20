import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import Box from "@material-ui/core/Box";
import Header from "../../components/header/Header";
import FriendList from "../../components/friend/FriendList";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../../components/user/UserList";
import FriendRequestList from "../../components/friend/FriendRequestList";
import { getFriends } from "../../redux/userSlice";
import { Badge } from "@material-ui/core";
import Inbox from "../../components/message/Inbox";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
    backgroundColor: "#222222",
  },
}));

export default function FriendsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user, friends } = useSelector((state) => state.user);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const fetchData = async () => {
      try {
        const { data: messageData } = await axios.get(
          "api/User/GetMessages",
          config
        );
        const { data: usersData } = await axios.get(
          "api/User/GetUsers",
          config
        );
        const { data: friendRequestsData } = await axios.get(
          "api/User/GetFriendRequests",
          config
        );
        setMessages(messageData);
        dispatch(getFriends(user.token));
        setUsers(usersData);
        setFriendRequests(friendRequestsData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [user.token, dispatch, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header />
      <AppBar
        style={{ backgroundColor: "#222222", borderColor: "red" }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="secondary"
          aria-label="scrollable force tabs example"
          centered
        >
          <Tab label="Friends" icon={<PersonIcon />} {...a11yProps(0)} />
          <Tab label="Add Friends" icon={<PersonAddIcon />} {...a11yProps(1)} />
          <Tab
            label="Friend Requests"
            icon={
              <Badge badgeContent={friendRequests.length} color="secondary">
                <PersonPinIcon />
              </Badge>
            }
            {...a11yProps(2)}
          />
          <Tab
            label="Inbox"
            icon={
              <Badge
                badgeContent={
                  messages.filter((message) => !message.read).length
                }
                color="secondary"
              >
                <EmailIcon />
              </Badge>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FriendList friends={friends} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList users={users} friends={friends} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FriendRequestList friendRequests={friendRequests} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Inbox messages={messages} />
      </TabPanel>
    </div>
  );
}
