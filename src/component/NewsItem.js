import React ,{ Component } from 'react'

export default class NewsItem extends Component{
    render(){
        return (
        <div className="my-3">
            <div className="card" style={{width: "18rem"}}>
            <img src={this.props.imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <p className="card-text">{this.props.description}</p>
                <a href={this.props.Url}  rel="noreferrer" target="_blank" className="btn btn-primary">Read More...</a>
            </div>
            </div>
        </div>
        )
    }
}
