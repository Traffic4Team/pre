import React from 'react';
import '../../assets/css/main.css';
import '../../assets/css/noscript.css';
import '../../assets/css/fontawesome-all.min.css';
import '../router/Router';

const Main = () => {
  return (
    <div id="main">
      {/* Intro Section */}
      <article id="intro">
        <h2 className="major">Intro</h2>
        <span className="image main"><img src="images/pic01.jpg" alt="" /></span>
        <p>Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam facilisis ante interdum congue. Integer mollis, nisl amet convallis, porttitor magna ullamcorper, amet egestas mauris. Ut magna finibus nisi nec lacinia. Nam maximus erat id euismod egestas. By the way, check out my <a href="#work">awesome work</a>.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor fermentum. Nullam venenatis erat id vehicula viverra. Nunc ultrices eros ut ultricies condimentum. Mauris risus lacus, blandit sit amet venenatis non, bibendum vitae dolor. Nunc lorem mauris, fringilla in aliquam at, euismod in lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non lorem sit amet elit placerat maximus. Pellentesque aliquam maximus risus, vel sed vehicula.</p>
      </article>

      {/* Work Section */}
      <article id="work">
        <h2 className="major">Work</h2>
        <span className="image main"><img src="images/pic02.jpg" alt="" /></span>
        <p>Adipiscing magna sed dolor elit. Praesent eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices.</p>
        <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet feugiat tempus.</p>
      </article>

      {/* About Section */}
      <article id="about">
        <h2 className="major">About</h2>
        <span className="image main"><img src="images/pic03.jpg" alt="" /></span>
        <p>Lorem ipsum dolor sit amet, consectetur et adipiscing elit. Praesent eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices. Aliquam libero et malesuada fames ac ante ipsum primis in faucibus. Cras viverra ligula sit amet ex mollis mattis lorem ipsum dolor sit amet.</p>
      </article>

      {/* Contact Section */}
      <article id="contact">
        <h2 className="major">Contact</h2>
          <div className="fields">
            <div className="field half">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
          </div>
          <ul className="actions">
            <li><input type="submit" value="Send Message" className="primary" /></li>
            <li><input type="reset" value="Reset" /></li>
          </ul>
        <ul className="icons">
          <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
          <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
          <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
          <li><a href="#" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
        </ul>
      </article>
    </div>
  );
}

export default Main;
