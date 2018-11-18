import React, { Component } from 'react';
import './App.scss';
import { FaGithub, FaLinkedinIn, FaQuora, FaEnvelope, FaVolumeUp, FaEye} from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import mcp from './assets/img/me.jpg';
import markcuipan from './assets/audio/markcuipan.mp3';
import panzizao from './assets/audio/panzizao.mp3';
import resumePdf from './resume/markcuipan-resume.pdf';


// function requireAll(r) { 
//   let img_paths = r.keys();
//   return img_paths.map( path => "./bgImages" + path.substr(1) );
// }

// let images = requireAll(require.context('./bgImages', true, /\.jpg$/));
// let randomIndex = Math.floor(Math.random() * images.length) + 0;
// var randomImgRef = images[randomIndex];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTime: new Date().getTime(),
      bgScrollOpacity: 0,
      locLabelOpacity: 0.1, 
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const scrolledFromTop = window.pageYOffset;
    if (scrolledFromTop < 700) {
      let opacity = scrolledFromTop / 300;
      this.setState({bgScrollOpacity: opacity, locLabelOpacity: 0.1 + Math.min(opacity / 2, 0.4)});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div className='App'>
        <div className='AppHeader'>
          <AppHeader bgScrollOpacity={this.state.bgScrollOpacity} locLabelOpacity={this.state.locLabelOpacity}/>
        </div>
        <AppCalloutSection className='AppCalloutSection work'>
          Some of the places I've worked...
        </AppCalloutSection>
        <AppBodySection className='AppBodySection work'/>
        <AppCalloutSection className='AppCalloutSection projects'>
          Some of the things I've made...
        </AppCalloutSection>
        <AppBodySection className='AppBodySection projects'/>
        <AppCalloutSection className='AppCalloutSection about'>
          A little more about me...
        </AppCalloutSection>
        <AppBodySection className='AppBodySection about'/>
        <AppBodySection className='AppBodySection resume'>
          <div>
            <h1>And here's my resumé...</h1>
            <h1><a href={resumePdf} target='_blank' rel='noopener noreferrer'><FaEye className='icon'/></a></h1>
            {/* <a href="" class="btn btn-lg btn-default btn-special" target="_blank"><i class="fa fa-eye fa-2x"></i></a> */}
          </div>
        </AppBodySection>
        <AppBodySection className='AppBodySection footer'>
          <div>
            <hr/>
            <p className="lead">Copyright © Mark Cui Pan 2018</p>
          </div>
        </AppBodySection>
      </div>
    )
  }
}

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgUrl: './bgImages/Madison0/bg0-blur.jpg',
      bgScrollUrl: './bgImages/Madison0/bg0.jpg',
      locationLabel: 'Madison, WI'
    };
  }

  componentDidMount() {
    const foldersHash = {
      Madison0: "Madison, WI",
      Madison1: "Madison, WI",
      Hk0: "Hong Kong",
      Hk1: "Hong Kong",
      Beijing: "Beijing, China"
    };
    const foldersKeys = Object.keys(foldersHash);
    let intraFolderIndex = Math.floor(Math.random() * 3);
    let foldersIndex = Math.floor(Math.random() * foldersKeys.length);
    const folderKey = foldersKeys[foldersIndex];
    const bgPath = "./bgImages/" + folderKey + "/bg" + intraFolderIndex + ".jpg";
    const bgBlurPath = "./bgImages/" + folderKey + "/bg" + intraFolderIndex + "-blur.jpg";
    const img = 'url(' + bgPath + ')';
    const blurImg = 'url(' + bgBlurPath + ')';
    this.setState({ bgUrl: blurImg, bgScrollUrl: img, locationLabel: foldersHash[folderKey]});
  }

  getBgStyle(url, opacity) {
    return { 
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      BackgroundSize: 'cover',
      backgroundColor: '#222',
      backgroundImage: url,
      opacity: opacity
    };
  }

  createSoundbite() {
    const clip = document.createElement('audio');
    if (clip.canPlayType) {
      for (let i = 0; i < arguments.length; i++) {
        const source = document.createElement('source');
        source.setAttribute('src', arguments[i]);
        if (arguments[i].match(/\.(\w+)$/i)) {
          source.setAttribute("type", this.html5_audiotypes[RegExp.$1]);
        }
        clip.appendChild(source);
      }
      clip.load();
      clip.playclip = () => {
        clip.pause();
        clip.currentTime = 0;
        clip.play();
      };
      return clip;
    } else {
      return {
        playclip: () => {
          throw new Error("Your browser doesn't support HTML5 audio, unfortunately.");
        }
      }
    }
  }

  html5_audiotypes = {
    mp3: 'audio/mpeg',
    mp4: 'audio/mp4',
    ogg: 'audio/ogg',
    wav: 'audio/wav'
  };

  render() {
    const bgStyle = this.getBgStyle(this.state.bgUrl, 1);
    const bgScrollStyle = this.getBgStyle(this.state.bgScrollUrl, this.props.bgScrollOpacity)
    const englishName = this.createSoundbite(markcuipan);
    const chineseName = this.createSoundbite(panzizao);
    return (
      <header>
        <div className="AppHeader__bg" style={bgStyle}></div>
        <div className="AppHeader__scroll-bg" style={bgScrollStyle}></div>
        <h2 className="AppHeader__location-label" style={{opacity: this.props.locLabelOpacity}}>{this.state.locationLabel}</h2>
        <div className="AppHeader__title">
          <img src={mcp} alt=""/>
          <h1>Mark</h1>
          <p className='lead'>Hi! I'm <button onClick={englishName.playclip}><FaVolumeUp className='icon'/> <b>Mark Cui Pan</b></button>. My Chinese name is <button onClick={chineseName.playclip}><FaVolumeUp className='icon'/> <b>潘子早</b></button>.
          <br/>I <a href="https://markcuipan.com/blog/">write</a>, I <a href="https://markcuipan.com/autonomy/">dream</a>, and, occasionally, I <a href="https://markcuipan.com/tutor/">tutor.</a></p>
          <ul>
            <li><Icon name='GitHub' url='https://github.com/factcondenser' hoverColor='#333'/></li>
            <li><Icon name='LinkedIn' url='https://www.linkedin.com/in/markcuipan' hoverColor='#0077b5'/></li>
            <li><Icon name='Quora' url='https://www.quora.com/profile/Mark-Cui-Pan' hoverColor='#A20'/></li>
            <li><Icon name='Email' url='mailto:mark@markcuipan.com' hoverColor='#8a90c7'/></li>
          </ul>
        </div>
      </header>
    );
  }
}

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { opacity: 0.4, color: '#fff' }
    }
  }

  mouseEnter = () => {
    this.setState({
      style: { opacity: 0.8, color: this.props.hoverColor }
    });
  }

  mouseLeave = () => {
    this.setState({
      style: { opacity: 0.4, color: '#fff' }
    });
  }

  icons = {
    GitHub: FaGithub,
    LinkedIn: FaLinkedinIn,
    Quora: FaQuora,
    Email: FaEnvelope
  }

  render() {
    const FaIconName = this.icons[this.props.name]
    return (
      <a className='icon' href={this.props.url} target='_blank' rel='noopener noreferrer' style={this.state.style} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <Tooltip title={this.props.name} placement='bottom'>
          <FaIconName/>
        </Tooltip>
      </a>
    );
  }
}

function AppCalloutSection(props) {
  return <div className={props.className}><h2>>_{props.children}</h2></div>
}

class AppBodySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
export default App;
