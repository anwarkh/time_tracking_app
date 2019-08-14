class TimersDashboard extends React.Component {
    state = {
        timers: []
    };

    updateTimer = (newTimer) => {
        const newTimersList = this.state.timers.map(timer => {
            if (timer.id === newTimer.id) {
                return newTimer;
            }
            return timer;
        })

        this.setState({
            timers: newTimersList
        })
    }

    handleCreateTimer = (newTimer) => {
        this.setState({
            timers: [...this.state.timers, newTimer]
        })
    }

    componentDidMount() {
        this.setState({
            timers: [
                {id: "id1", title: "title1", project: "project1", time: "01:30:58", timerRunning: false},
                {id: "id2", title: "title1", project: "project1", time: "01:30:57", timerRunning: false},
                {id: "id3", title: "title1", project: "project1", time: "01:30:56", timerRunning: false},
                {id: "id4", title: "title1", project: "project1", time: "23:59:55", timerRunning: true},
                {id: "id5", title: "title1", project: "project1", time: "01:59:54", timerRunning: false}
            ]
        });
    }

    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList list={this.state.timers} updateTimer={this.updateTimer}/>
                    <ToggleableTimerForm createTimer={this.handleCreateTimer}/>
                </div>
            </div>
        )
    }

}

class EditableTimerList extends React.Component {

    updateTimer = (newTimer) => {
        this.props.updateTimer(newTimer)
    }

    render() {

        const editableTimersComponents = this.props.list.map(
            timer => <EditableTimer timer={timer} key={'timer' + timer.id} updateTimer={this.updateTimer}/>
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

    updateTimer = (newTimer) => {
        this.props.updateTimer(newTimer)
    }


    render() {
        if (this.state.isFormOpen) {
            return (<TimerForm/>)
        }
        return (<Timer timer={this.props.timer} startStop={this.updateTimer} updateTimer={this.updateTimer}/>)
    }
}

class TimerForm extends React.Component {

    handleSaveClick = () => {
        this.props.createTimer({
            id: "id1",
            title: "title1",
            project: "project1",
            time: "01:30:58",
            timerRunning: false})
    }


    handleCancelClick = () => {
        this.props.closeForm();
    }

    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field"><label>Title</label><input type="text"/></div>
                        <div className="field"><label>Project</label><input type="text"/></div>
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button"
                                    onClick={this.handleSaveClick}>{this.props.mode === 'update' ? 'Update' : this.props.mode === 'create' ? 'Create' : ''}</button>
                            <button className="ui basic red button" onClick={this.handleCancelClick}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


class Timer extends React.Component {


    handleStartStopButton = () => {
        this.props.updateTimer(Object.assign({}, this.props.timer, {
            timerRunning: !this.props.timer.timerRunning,
        }))

    }


    render() {
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="header">{this.props.timer.title}</div>
                    <div className="meta">{this.props.timer.project}</div>
                    <div className="center aligned description"><DigitalClock timer={this.props.timer}/></div>
                    <div className="extra content">
                        <span className="right floated edit icon">
                            <i className="edit icon"></i>
                        </span>
                        <span className="right floated trash icon">
                            <i className="trash icon"></i>
                        </span>
                    </div>
                </div>
                <div className={'ui bottom attached basic button ' + (this.props.timer.timerRunning ? 'red' : 'green')}
                     onClick={this.handleStartStopButton}>{this.props.timer.timerRunning ? 'Stop' : 'Start'}</div>
            </div>
        )
    }
}

class DigitalClock extends React.Component {
    state = {
        time: new Date()
    }


    incrementTime = () => {
        const time = this.state.time;
        time.setSeconds(time.getSeconds() + 1);

        return time;
    }

    parseDate = (input) => {
        const parts = input.split(':')
        let newDate = new Date()
        newDate.setHours(parts[0])
        newDate.setMinutes(parts[1])
        newDate.setSeconds(parts[2])
        return newDate
    }

    formatTime = (date) => {
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59


        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        const time = h + ":" + m + ":" + s + " ";
        return time;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timer.timerRunning) {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.setState({time: this.incrementTime()}), 1000);
        } else {
            clearInterval(this.interval);
        }

    }

    componentDidMount() {
        this.setState({
            time: this.parseDate(this.props.timer.time)
        })
        if (this.props.timer.timerRunning) {
            this.interval = setInterval(() => this.setState({time: this.incrementTime()}), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (<h2>{this.formatTime(this.state.time)}</h2>)
    }
}


class ToggleableTimerForm extends React.Component {
    state = {
        isFormOpen: false
    }

    isFormOpen() {
        return this.state.isFormOpen
    }

    handlePlusButtonClick = () => {
        this.setState({
            isFormOpen: true
        })
    }

    handleCloseForm = () => {
        this.setState({
            isFormOpen: false
        })
    }

    handleSaveForm = () => {

    }

    render() {
        if (!this.isFormOpen()) {
            return (
                <div className="ui basic content center aligned segment">
                    <button className="ui basic button icon" onClick={this.handlePlusButtonClick}><i
                        className="plus icon"></i></button>
                </div>)
        } else {
            return (
                <TimerForm mode='create' closeForm={this.handleCloseForm} saveForm={this.handleSaveForm}/>
            )
        }
    }
}

ReactDOM.render(
    <TimersDashboard/>
    ,
    document.getElementById('content')
);