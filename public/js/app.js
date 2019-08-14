class TimersDashboard extends React.Component {
    state = {
        timers: []
    };

    componentDidMount() {
        this.setState({
            timers: [
                {id: "id1", title: "title1", project: "project1", time: "01:30:58", timerRunning : true},
                {id: "id2", title: "title1", project: "project1", time: "01:30:57", timerRunning : true},
                {id: "id3", title: "title1", project: "project1", time: "01:30:56", timerRunning : true},
                {id: "id4", title: "title1", project: "project1", time: "01:30:55", timerRunning : true},
                {id: "id5", title: "title1", project: "project1", time: "01:30:54", timerRunning : true}
            ]
        });
    }

    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList list={this.state.timers}/>
                    <ToggleableTimerForm/>
                </div>
            </div>
        )
    }

}

class EditableTimerList extends React.Component {

    render() {

        const editableTimersComponents = this.props.list.map(
            timer => <EditableTimer timer={timer} key={'timer' + timer.id}/>
        );
        return (
            <div id="timers">
                {editableTimersComponents}
            </div>
        )
    }
}

class EditableTimer extends React.Component {

    state = {
        isFormOpen: false
    };

    updateTimer = (timer) =>{

    }

    handleStartStop

    render() {
        if (this.state.isFormOpen) {
            return (<TimerForm/>)
        }
        return (<Timer timer={this.props.timer} startStop={this.updateTimer}/>)
    }
}

class TimerForm extends React.Component {

    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field"><label>Title</label><input type="text" value="Clear paper jam"/></div>
                        <div className="field"><label>Project</label><input type="text" value="Office Chores"/></div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button">Update</button>
                            <button className="ui basic red button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


class Timer extends React.Component {


    handleStartStop = ()=>{


    }

    componentDidMount(){
        this.state.timerRunning = this.this.props.timer.timerRunning
    }


    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="header">{this.props.timer.title}</div>
                    <div className="meta">{this.props.timer.project}</div>
                    <div className="center aligned description"><h2>{this.props.timer.time}</h2></div>
                    <div className="extra content">
                        <span className="right floated edit icon">
                            <i className="edit icon"></i>
                        </span>
                        <span className="right floated trash icon">
                            <i className="trash icon"></i>
                        </span>
                    </div>
                </div>
                <div className={"i bottom attached basic button " + this.props.timer.timerRunning ? 'red' : 'green'} onClick={this.handleStartStop}>{this.props.timer.timerRunning ? 'Stop' : 'Start'}</div>
            </div>
        )
    }
}


class ToggleableTimerForm extends React.Component {

    plusSign() {
        return true
    }

    render() {
        if (this.plusSign()) {
            return (
                <div className="ui basic content center aligned segment">
                    <button className="ui basic button icon"><i className="plus icon"></i></button>
                </div>)
        } else {
            return (
                <TimerForm/>
            )
        }
    }
}

ReactDOM.render(
    <TimersDashboard/>
    ,
    document.getElementById('content')
);