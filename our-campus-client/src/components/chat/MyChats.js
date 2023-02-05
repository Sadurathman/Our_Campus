import React, { useState, useEffect } from "react";
// import { useAppContext } from "../context/ChatProvider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import api from "../utils/axios";
import { Button } from "react-bootstrap";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
// import toast from "react-toastify";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { getSender } from "../../config/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserListItem from "./UserListItem";

const MyChats = ({
  selectedChat,
  setSelectedChat,
  fetchAgain,
  chats,
  setChats,
}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchChats = async () => {
    try {
      console.log(selectedChat);
      const { data } = await api.get("/api/v1/chat");
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoggedUser(getUserFromLocalStorage("user"));
    fetchChats();
  }, [fetchAgain]);

  const handleSearch = async () => {
    if (!keyword) {
      // toast.error("Please Provide username");
      return;
    }

    try {
      // setLoading(true);

      const { data } = await api.get(`/users/chat?search=${keyword}`);

      // setLoading(false);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      // setLoadingChat(true);
      console.log(userId);

      const { data } = await api.post(`/api/v1/chat`, { userId });

      console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      // setLoadingChat(false);
      // onClose();
      setUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSearchBox = () =>
    users && users.length < 1 ? (
      <Form onSubmit={handleSearch} className='d-flex' inline>
        <Form.Control
          type='search'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search'
          className='mr-sm-2 ml-sm-5 me-2'
          aria-label='Search'
        />
        <Button onClick={handleSearch} variant='outline-success'>
          Search
        </Button>
      </Form>
    ) : (
      <ListGroup style={{ maxWidth: "30vw", backgroundColor: "blue" }}>
        {users.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))}
      </ListGroup>
    );

  return (
    <Container style={{ display: "flex" }}>
      <Row>
        <Col>
          <h3 className='text-center mt-3 mb-3'>My Chats</h3>
          {/* <div className='d-flex justify-content-between'>
            <GroupChatModal>
              <Button variant='outline-primary'>
                <FontAwesomeIcon icon={faPlus} /> New Group Chat
              </Button>
            </GroupChatModal>
          </div> */}
          {renderSearchBox()}
          <ListGroup className='pt-3 mt-3' style={{ backgroundColor: "#000" }}>
            {chats ? (
              chats.map((chat) => (
                <ListGroup.Item
                  variant='primary'
                  onClick={() => setSelectedChat(chat)}
                  key={chat && chat._id}
                  className='mt-2'
                  style={{
                    backgroundColor:
                      selectedChat === chat
                        ? "rgba(67, 43, 255, 0.8)"
                        : "#808080",
                    color: selectedChat === chat ? "white" : "black",
                    cursor: "pointer",
                  }}
                >
                  {chat && !chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </ListGroup.Item>
              ))
            ) : (
              <ChatLoading />
            )}
          </ListGroup>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <ListGroup>
            {chats ? (
              chats.map((chat) => (
                <ListGroup.Item
                  variant='primary'
                  onClick={() => setSelectedChat(chat)}
                  key={chat && chat._id}
                  style={{
                    backgroundColor:
                      selectedChat === chat
                        ? "rgba(67, 43, 255, 0.8)"
                        : "#808080",
                    color: selectedChat === chat ? "white" : "black",
                    cursor: "pointer",
                  }}
                >
                  {chat && !chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </ListGroup.Item>
              ))
            ) : (
              <ChatLoading />
            )}
          </ListGroup>
        </Col>
      </Row> */}
    </Container>
  );
};

export default MyChats;
