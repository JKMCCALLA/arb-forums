import {React, Component, createRef} from "react";
import Lottie from "lottie-react";
import axios from 'axios';

import "./styles.css";
import logo from './assets/logo.svg';
import reset from './assets/reset.png';
import video from './assets/video.mp4';
import demo_1 from './assets/demo_1.pdf';
import lineAnimation from "./assets/poly-line-animate.json";
import previewAnimation from "./assets/preview-animate-long.json";

class MyApp extends Component {
    constructor(props){
        super(props);
        this.state = {showPlay: true, layer: 1, showPreview: false, requestHide: false, gameReady: false, begin: 0, end: 220, lottieRef: createRef(), lottieRef_2: createRef(), boxText: "Create a request", boxTextOriginal:"Create a request", voiceInput_WPR:"", boxTextToggle: 1
        , currFrame: "https://forms.office.com/Pages/ResponsePage.aspx?id=3vcbdOXi30aNZ4JgffneqoXx5-_kVctJiOGQEd3dbV5UNTZTNlgwSUo2RFhIQ0hIRjdYMVJTMEFXRC4u&embed=true"};
        this.handlePlayChange = this.handlePlayChange.bind(this);
        this.handlePlayHover = this.handlePlayHover.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleRequestToggle = this.handleRequestToggle.bind(this);
        this.handleDisable = this.handleDisable.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleQuestionToggle = this.handleQuestionToggle.bind(this);
        this.handleReport = this.handleReport.bind(this);
        this.handleReportToggle = this.handleReportToggle.bind(this);
        this.handlePreviewDisable = this.handlePreviewDisable.bind(this);
        this.PreviewDisable = this.PreviewDisable.bind(this);
        this.LineApp = this.LineApp.bind(this);
        this.PreviewApp = this.PreviewApp.bind(this);
        this.whisperListening = this.whisperListening.bind(this); /* To be updated */
        this.startListening = this.startListening.bind(this); /* To be updated */
        this.stopListening = this.stopListening.bind(this); /* To be updated */
        this.lineStyle = {height: 1024, width: 1440};
    }

    handlePlayChange = () => {
        this.setState({showPlay: !(this.state.showPlay)});
        if (this.state.showPlay) {this.startListening();} else {this.stopListening();}
    };
    handlePlayHover = () => {
        this.state.lottieRef.current.play();
    };
    handleReset = () => {
        if (this.state.layer === 1) {this.setState({boxTextToggle: 1, boxText: this.state.boxTextOriginal, currFrame: "https://forms.office.com/Pages/ResponsePage.aspx?id=3vcbdOXi30aNZ4JgffneqoXx5-_kVctJiOGQEd3dbV5UNTZTNlgwSUo2RFhIQ0hIRjdYMVJTMEFXRC4u&embed=true"});}
    };
    handleRequest = () => {
        this.setState({boxText: "Create a request"});
    };
    handleRequestToggle = () => {
        this.setState({boxTextToggle: 1, currFrame: "https://forms.office.com/Pages/ResponsePage.aspx?id=3vcbdOXi30aNZ4JgffneqoXx5-_kVctJiOGQEd3dbV5UNTZTNlgwSUo2RFhIQ0hIRjdYMVJTMEFXRC4u&embed=true"});
    };
    handleDisable = () => {
        if (this.state.boxTextToggle === 1) {this.setState({boxText: "Create a request"});}
        else if (this.state.boxTextToggle === 2) {this.setState({boxText: "Ask a question"});}
        else if (this.state.boxTextToggle === 3) {this.setState({boxText: "Report an issue"});}
    };
    handleQuestion = () => {
        this.setState({boxText: "Ask a question"});
    };
    handleQuestionToggle = () => {
        this.setState({boxTextToggle: 2, currFrame: "https://forms.office.com/Pages/ResponsePage.aspx?id=3vcbdOXi30aNZ4JgffneqoXx5-_kVctJiOGQEd3dbV5UMVQwSERXNTFKUEpRS0FaNUNWRDBEUUNSWi4u&embed=true"});
    };
    handleReport = () => {
        this.setState({boxText: "Report an issue"});
    };
    handleReportToggle = () => {
        this.setState({boxTextToggle: 3, currFrame: "https://forms.office.com/Pages/ResponsePage.aspx?id=3vcbdOXi30aNZ4JgffneqoXx5-_kVctJiOGQEd3dbV5UOTVEVjdKV0lQV09TRURIWUs3RFZDSDRSMi4u&embed=true"});
    };
    handlePreviewClick = () => {
        this.setState({requestHide: false});
        this.setState({showPreview: true});
        this.state.lottieRef_2.current.setDirection(1);
        this.state.lottieRef_2.current.playSegments([this.state.begin,this.state.end], true);
    };
    handlePreviewDisable = () => {
        if (this.state.requestHide === false) {
            this.state.lottieRef_2.current.setDirection(-1);
            this.state.lottieRef_2.current.playSegments([this.state.end,this.state.begin], true);
            this.setState({requestHide: true});
        }
    };
    PreviewDisable = () => {
        if (this.state.requestHide == true) this.setState({showPreview: false});
    };
    log = () => {
    }; 
    async whisperListening(flag, path) { /* To be updated */
        try {
            const response = await axios.post('http://localhost:5000/S2T', {
                flag: flag,
                path: path,
            });
            // Save the token to local storage
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.setState({voiceInput_WPR: response.data});
        } catch (error) {
            console.error(error);
        }
    };
    startListening = () => { /* To be updated */
        this.whisperListening('False', "../public/assets/common_voice_es_19610612.mp3");
    };
    stopListening = () => { /* To be updated */
    };
    LineApp = () =>
        <Lottie lottieRef={this.state.lottieRef} style={this.lineStyle} animationData={lineAnimation} loop={false} autoplay={false}/>;
    PreviewApp = () =>
        <Lottie lottieRef={this.state.lottieRef_2} style={this.lineStyle} animationData={previewAnimation} loop={false} autoplay={false} onComplete={this.PreviewDisable}/>;
    render() {
            return (
                <div className="desktop-master"> 
                    <div className="desktop-1">
                    <img className="logo" alt="Logo" src={logo} />   
                    <div className="div">
                        <div className={this.state.showPreview ? "preview-master-vis" : "preview-master-op"}>
                            <button className="btn-vis" onClick={this.handlePreviewDisable}>
                                <this.PreviewApp/>
                            </button> 
                        </div>
                        {this.state.showPreview?(<div className={this.state.showPreview ? "game-master-vis": "game-master-op"}>
                            <video controls width="542px" height="500px" src={video}></video>
                            <iframe class="pdf" 
                                src={demo_1}>
                            </iframe>
                        </div>):""}
                        <div className="box-media">
                             <iframe width="500px" height="500px" src={this.state.currFrame} style={{border: "none", maxWidth:"100%", maxHeight:"100vh"}} allowFullScreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
                        </div>
                        <div className="PEND">
                            Pending Requests
                        </div>
                        <div className="KNOW">
                            Knowledge Base
                        </div>
                        <div className="poly-parent">
                            <button className="poly-circle" onClick={this.handleRequestToggle} onMouseEnter={this.handleRequest} onMouseLeave={this.handleDisable}/>
                            <button className="poly-circle-2" onClick={this.handleQuestionToggle} onMouseEnter={this.handleQuestion} onMouseLeave={this.handleDisable}/>
                            <button className="poly-circle-3" onClick={this.handleReportToggle} onMouseEnter={this.handleReport} onMouseLeave={this.handleDisable} />
                            <div className="line-parent">
                                <this.LineApp/>
                            </div>
                        </div>
                        <div className="scrollable-list-pend">
                            <button className="box"/>
                            <button className="box-2"/>
                            <button className="box-3"/>
                        </div>
                        <div className="scrollable-list-know">
                            <button className="box-5" onClick={this.handlePreviewClick}/>
                            <button className="box-6" />
                            <button className="box-7" />
                        </div>
                        <div className="reset-overlay">
                            <button className="reset-btn" onClick={this.handleReset}>
                                 <img className="reset" src={reset}/>   
                            </button>
                        </div>
                        <button className={(this.state.showPlay || this.state.boxTextToggle !== 0)? "btn-play": "btn-pause"} onClick={this.handlePlayChange} onMouseOver={this.handlePlayHover}>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <clipPath id="play">
                                        <path d="M34 22.5L0.25 0.416351L0.25 44.5836L34 22.5Z" fill="#D9D9D9"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
            );
        }
    }

export default MyApp;