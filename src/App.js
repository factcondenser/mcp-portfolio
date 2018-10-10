import React, { Component } from 'react';
import './App.css';
import mcp from './img/me.jpg';

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
      bgUrl: './bgImages/Madison0/bg0-blur.jpg',
      bgScrollUrl: './bgImages/Madison0/bg0.jpg',
      locationLabel: 'Madison, WI'
    };
  }

  componentDidMount() {
    var foldersHash = {
      Madison0: "Madison, WI",
      Madison1: "Madison, WI",
      Hk0: "Hong Kong",
      Hk1: "Hong Kong",
      Beijing: "Beijing, China"
    };
    var foldersKeys = Object.keys(foldersHash);
    var intraFolderIndex = Math.floor(Math.random() * 3);
    var foldersIndex = Math.floor(Math.random() * foldersKeys.length);
    var folderKey = foldersKeys[foldersIndex];
    var bgPath = "./bgImages/" + folderKey + "/bg" + intraFolderIndex + ".jpg";
    var bgBlurPath = "./bgImages/" + folderKey + "/bg" + intraFolderIndex + "-blur.jpg";
    var img = 'url(' + bgPath + ')';
    var blurImg = 'url(' + bgBlurPath + ')';
    this.setState({ bgUrl: blurImg, bgScrollUrl: img, locationLabel: foldersHash[folderKey]});
  }

  getAppHeaderStyle() {
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
      zIndex: -10,
      backgroundColor: '#222',
      backgroundImage: this.state.bgUrl,
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center'
    };
  }

  render() {
    // const bgImg = { backgroundImage: `url(${Background})` };
    const style = this.getAppHeaderStyle();
    console.log(style);
    return (
      <div className="App">
        <header className="App__header" style={style}>
          <h2 className="App__location-label">Madison, WI</h2>
          <div className="App__title">
            <img src={mcp} alt=""/>
            <h1>Mark</h1>
            <p class="lead"> Hi! I'm <b><a class="audio-clip" onclick="englishname.playclip()"> <i class="fa fa-volume-up"></i> Mark Cui Pan </a></b>. My Chinese name is <b><a class="audio-clip" onclick="chinesename.playclip()"> <i class="fa fa-volume-up"></i> 潘子早 </a></b>.
            <br/> I <a class="audio-clip" href="https://markcuipan.com/blog/">write</a>, I <a class="audio-clip" href="https://markcuipan.com/autonomy/">dream</a>, and, occasionally, I <a class="audio-clip" href="https://markcuipan.com/tutor/"> tutor. </a> </p>
            <ul>
              {/* <!-- <li> <a title="" class="icon" href="http://www.facebook.com/markcuipan" target="_blank" data-original-title="Facebook"> <i class="fa fa-facebook fa-3x"></i> </a> </li> --> */}
              {/* <!-- <li> <a title="" class="icon" href="https://twitter.com/markcuipan" target="_blank" data-original-title="Twitter"> <i class="fa fa-twitter fa-3x"></i> </a> </li> --> */}
              <li> <a title="" class="icon" href="https://github.com/factcondenser" target="_blank" data-original-title="GitHub"> <i class="fa fa-github fa-3x"></i> </a> </li>
              <li> <a title="" class="icon" href="http://www.linkedin.com/in/markcuipan" target="_blank" data-original-title="LinkedIn"> <i class="fa fa-linkedin fa-3x"></i> </a> </li>
              {/* <!-- <li> <a title="" class="icon" href="http://www.youtube.com/user/markcuipan" target="_blank" data-original-title="YouTube"> <i class="fa fa-youtube-play fa-3x"></i> </a> </li> --> */}
              <li> <a title="" class="icon" href="https://www.quora.com/profile/Mark-Cui-Pan" target="_blank" data-original-title="Quora"> <i class="fa fa-quora fa-3x"></i> </a> </li>
              <li> <a title="" class="icon" href="mailto:markpan@live.com" target="_blank" data-toggle="tooltip" data-original-title="Email"> <i class="fa fa-envelope fa-3x"></i> </a> </li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
