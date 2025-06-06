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

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
  }

  fetchNews = async (page) => {
    try {
      this.setState({ loading: true });
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      console.log(apiKey);
      if (!apiKey) {
        console.error("API key not found. Check Vercel environment variables.");
      }
      const targetURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        targetURL
      )}`;
      let data = await fetch(url);
      let json = await data.json();
      let parsedData = JSON.parse(json.contents); // this is the actual news data
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        page: page,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ articles: [], loading: false });
    }
  };

  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  handlePre = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNxt = () => {
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page + 1 <= totalPages) {
      this.fetchNews(this.state.page + 1);
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
            this.state.articles &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsTile
                  title={!element.title ? "" : element.title.slice(0, 60)}
                  date={element.publishedAt?.slice(0, 10)}
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
            ))}
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
