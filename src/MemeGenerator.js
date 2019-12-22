import React, { Component } from 'react';


class MemeGenerator extends Component {
    constructor(props) {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImage: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state)
    }
componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
        const {memes} = response.data;
        console.log(memes[1])
        this.setState({allMemeImage: memes})
    })
}

handleChange(event){
    console.log("working")
    const {name,value} = event.target;
    this.setState({[name]: value});
    console.log(this.state)
}
handleSubmit(event){
    event.preventDefault();
    const  randNum = Math.floor(Math.random() * this.state.allMemeImage.length);
    const randMemeImg = this.state.allMemeImage[randNum].url;
    this.setState({randomImg: randMemeImg});
}

    render() {
        return (
            <div>
             <form className="meme-form" onSubmit={this.handleSubmit}>
                <input name="topText" type="text" placeholder="top text" value={this.state.topText}  onChange={this.handleChange} />
                <input name="bottomText" type="text" placeholder="bottom text" value={this.state.bottomText} onChange={this.handleChange} />

             <button>Gen</button>
             </form>
            <div className="meme">
                <img  src={this.state.randomImg} alt="" />
                <h2 className="top" >{this.state.topText}</h2>
                <h2 className="bottom" >{this.state.bottomText}</h2>
            </div>
            </div>
        )
    }
}

export default MemeGenerator;