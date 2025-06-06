import React, { Component } from "react";
import NewsTile from "./NewsTile";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    pageSize: 5,
    category: "general",
    title: "Todays - Top headlines",
    country: "in",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    country: PropTypes.string,
  };
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      page: 1,
      loading: false,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c83dec0a9f67470bac41872953fa1e6e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePre = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=c83dec0a9f67470bac41872953fa1e6e&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNxt = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=c83dec0a9f67470bac41872953fa1e6e&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <h1 style={{ margin: "35px" }} className="text-center">
          {this.props.title}
        </h1>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsTile
                    title={!element.title ? "" : element.title.slice(0, 60)}
                    date={element.publishedAt.slice(0, 10)}
                    author={element.author}
                    desc={
                      !element.description
                        ? ""
                        : element.description.slice(0, 100)
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>

        <div
          style={{
            backgroundColor: "grey",
            padding: "15px",
            borderRadius: "10px",
          }}
          className="d-flex justify-content-between"
        >
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePre}
            type="button"
            className="btn btn-dark"
          >
            &larr; Previous page
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNxt}
            type="button"
            className="btn btn-dark"
          >
            Next page &rarr;
          </button>
        </div>
      </div>
    );
  }
}
