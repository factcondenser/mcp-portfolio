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
  render() {
    return (
      <div className='App'>
        <div className='AppHeader'>
          <AppHeader/>
        </div>
        <div className='AppBodySection intro'>
          <AppBodySection>
          </AppBodySection>
        </div>
        <div className='AppBodySection work'>
          <AppBodySection/>
        </div>
        <div className='AppBodySection projects'>
          <AppBodySection/>
        </div>
        <div className='AppBodySection about'>
          <AppBodySection/>
        </div>
        <div className='AppBodySection resume'>
          <AppBodySection>
            <h1>And here's my resumé...</h1>
            <h1><a href={resumePdf} target='_blank'><FaEye className='icon'/></a></h1>
            {/* <a href="" class="btn btn-lg btn-default btn-special" target="_blank"><i class="fa fa-eye fa-2x"></i></a> */}
          </AppBodySection>
        </div>
        <div className='AppBodySection footer'>
          <AppBodySection>
            <hr/>
            <p className="lead">Copyright © Mark Cui Pan 2018</p>
          </AppBodySection>
        </div>
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

  getBgStyle() {
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
      backgroundImage: this.state.bgUrl,
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center'
    };
  }

  createSoundbite() {
    const clip = document.createElement('audio');
    console.log(clip.canPlayType);
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
    const style = this.getBgStyle();
    const englishName = this.createSoundbite(markcuipan);
    const chineseName = this.createSoundbite(panzizao);
    return (
      <header className="AppHeader__bg" style={style}>
        <h2 className="AppHeader__location-label">Madison, WI</h2>
        <div className="AppHeader__title">
          <img src={mcp} alt=""/>
          <h1>Mark</h1>
          <p className='lead'>Hi! I'm <a onClick={englishName.playclip} className='bold'><FaVolumeUp className='icon'/> Mark Cui Pan</a>. My Chinese name is <a onClick={chineseName.playclip} className='bold'><FaVolumeUp className='icon'/> 潘子早</a>.
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

class AppBodySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
