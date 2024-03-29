import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsList extends Component {
   static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize:5
   }

   static propTypes = {
    country: PropTypes.string,
    categoty: PropTypes.string
   }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
            pageRQ:0,
            totalResults:0
        }

    }

    async update(){
      this.props.setProgress(10);
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f49b9346b9e04f559a1443f5e7d324bd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      this.props.setProgress(30);

      let data= await fetch(url);
      let parsedData=await data.json();
      this.props.setProgress(70);
      this.setState({
       articles:parsedData.articles,
       loading:false,
       pageRQ:Math.ceil(parsedData.totalResults/this.props.pageSize),
       totalResults:parsedData.totalResults
     })
     this.props.setProgress(100);
     }

    async componentDidMount(){
        this.update();
   }

   fetchMoreData=async()=>{
    this.setState({page:this.state.page+1})
    
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f49b9346b9e04f559a1443f5e7d324bd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
  
      let data= await fetch(url);
      let parsedData=await data.json();
  
      this.setState({
       articles:this.state.articles.concat(parsedData.articles),
       pageRQ:Math.ceil(parsedData.totalResults/this.props.pageSize),
       totalResults:parsedData.totalResults
     })
   }
   
  render() {
    return (
      <>
        <h1 className="text-center">Top HeadLines</h1>
        {this.state.loading && <Spinner/>}
     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
       <div className='container'>
      <div className="row">
         {this.state.articles.map((element)=>{
           return (<div className="col-md-4">
            <NewsItem Url={element.url} title={element.title?element.title:"No title"} description={element.description?element.description:"No Description"} imageUrl={element.urlToImage?element.urlToImage:"/"}/>
           </div>)
         })}  
      </div>
      </div>
      </InfiniteScroll>
      </>
    )
  }
}
