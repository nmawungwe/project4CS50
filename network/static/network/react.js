class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {

            score: 0,

        };
    }





      // This syntax ensures `this` is bound within handleClick.  // Warning: this is *experimental* syntax.  
    handleClick = () => {
        this.setState(state=>({
            score: state.score + 1,
        }))
    }
    render() {
        return (
            <div>
                    <button onClick={this.handleClick}>Like</button>{this.state.score}
            </div> 
        );
    }
    

}

ReactDOM.render(<App />, document.querySelector('#App'))