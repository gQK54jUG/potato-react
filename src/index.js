import axios from 'axios';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Input extends React.Component {
    render() {
        return(
            <form>
                <div className='input textarea'>
                    <textarea></textarea>
                </div>
                <div className='submit'>
                    <input type='submit' value='投稿する'/>
                </div>
            </form>
        );
    }
}

class Bulletin extends React.Component {
    render() {
        return(
            <div>

            </div>
        );
    }
}

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: '',
            persons: []
        };
    }

    componentWillMount() {
        axios.get(`https://35.230.56.21/BulletinBoard.json`)
            .then(res => {
                const persons = res.data;
                this.setState({
                    persons: persons
                });
            });
    }
        
    render() {
        var textareaCheck = '';

        console.log(this.state.persons);

        return (
            <div className='top-nav-title'>
                <div>
                    <a href='/'>
                        <span>Potato BB🥔</span>
                    </a>
                </div>
                <div>
                    {textareaCheck}
                </div>
                <Input />
                <Bulletin />
            </div>
        );
    }
}

ReactDOM.render(<Top />, document.getElementById('root'));
