import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 10;
  country = "us";
  render() {
    return (
      <div style={{ backgroundColor: "#404040", color: "white" }}>
        <Router>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  country={this.country}
                  key="general"
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  country={this.country}
                  title="Business - Top Headlines"
                  key="business"
                  pageSize={this.pageSize}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  country={this.country}
                  title="Entertainment - Top Headlines"
                  key="entertainment"
                  pageSize={this.pageSize}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  country={this.country}
                  title="Health - Top Headlines"
                  key="health"
                  pageSize={this.pageSize}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  country={this.country}
                  title="Science - Top Headlines"
                  key="science"
                  pageSize={this.pageSize}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  country={this.country}
                  title="Sports - Top Headlines"
                  key="sports"
                  pageSize={this.pageSize}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  country={this.country}
                  title="Technology - Top Headlines"
                  key="technology"
                  pageSize={this.pageSize}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
