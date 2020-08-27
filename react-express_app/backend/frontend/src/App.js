import React, { Component } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelChange = this.handleDelChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      message: [],
      value: "",
      isLoaded: false,
      delete: "",
    };
  }

  handleChange() {
    let proId = document.getElementById("proId").value;
    let proTitle = document.getElementById("proTitle").value;
    let proDes = document.getElementById("proDes").value;
    let proURL = document.getElementById("proURL").value;
    this.setState({
      value: {
        id: proId,
        title: proTitle,
        description: proDes,
        URL: proURL,
      },
    });
  }
  handleDelChange() {
    var delValue = document.getElementById("delValue").value;
    this.setState({ delete: delValue });
  }
  handleDelete(e) {
    alert(
      "An item was submitted:" + JSON.stringify({ item: this.state.delete })
    );
    fetch("/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: this.state.delete }),
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
  }

  handleSubmit(e) {
    alert(
      "An item was submitted:" + JSON.stringify({ item: this.state.value })
    );
    fetch("/item", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: this.state.value }),
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("/item")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            message: JSON.parse(result.message),
            isLoaded: true,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    const { error, message, isLoaded } = this.state;
    const cardStyle = {
      color: "white",
      backgroundColor: "#283c78",
      width: "50rem",
      margin: "auto",
    };
    const newData = message;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else
      return (
        <div className="App">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
          />
          <p>Message from server: </p>
          <br />
          <Form id="formName" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Enter a new item:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project Title"
                id="proTitle"
                name="title"
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter Project ID"
                id="proId"
                name="id"
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter Project Description"
                id="proDes"
                name="description"
                onChange={this.handleChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter Project URL"
                id="proURL"
                name="URL"
                onChange={this.handleChange}
              />
              <br />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Form onSubmit={this.handleDelete}>
            <Form.Group>
              <Form.Label> You can delete a project Here:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project ID to delete"
                id="delValue"
                name="name"
                onChange={this.handleDelChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <br />
          <div>
            {newData.web_project.map((item) => (
              <div>
                <Card style={cardStyle}>
                  <Card.Body>
                    <Card.Title>Project: {item.title}</Card.Title>
                    <Card.Text>Id: {item.id}</Card.Text>
                    <Card.Text>Description: {item.description}</Card.Text>
                    <Card.Text>Url: {item.URL}</Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </div>
            ))}
            {/* {newData.web_project[0].title} */}
          </div>
        </div>
      );
  }
}

export default App;
