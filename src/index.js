import axios from 'axios';
import React, {} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ''
        };
    }

    handleSubmit = (eventObject) => {
        axios.get(`https://potato-bb.net/BulletinBoard/add`, {
            params: {
                contents: this.state.post
            }
        });
    }

    handleTextChange = (eventObject) => {
        this.setState({post: eventObject.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className='input textarea'>
                    <input value={this.state.post} onChange={this.handleTextChange}/>
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
        const bulletinList = Object.values(this.props.bulletinList);

        const listCreate = bulletinList.map((val, key) => {
            return (
                <div className="bulletin_lists" key={key}>
                    <div className="bulletin_info">
                        {val.bulletin_id} UserId:<a>{val.board_user_id}</a> {val.datetime}
                    </div>
                    <div className="bulletin_contents">
                        {val.contents}
                    </div>
                </div>
            );
        });

        return(<div>{listCreate}</div>);
    }
}

class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: '',
            bulletinList: []
        };
    }

    componentWillMount() {
        axios.get(`https://potato-bb.net/BulletinBoard.json`)
            .then(res => {
                this.setState({
                    bulletinList: res.data.bulletin_list
                });
            });
    }
        
    render() {
        var textareaCheck = '';

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
                <Bulletin
                    bulletinList={this.state.bulletinList}/>
            </div>
        );
    }
}

ReactDOM.render(<Top />, document.getElementById('root'));
