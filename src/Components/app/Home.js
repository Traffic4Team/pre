import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle'; // Import Swiper and necessary styles
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './Home.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      effect: 'fade',
      speed: 1000,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: {
        invert: false,
        forceToAxis: false,
        thresholdDelta: 50,
        sensitivity: 1,
      },
      on: {
        slideChange: function () {
          this.slides.forEach((slide) => {
            let background = slide.querySelector('.background');
            if (background) {
              background.classList.remove('animation');
            }
          });
          let activeSlide = this.slides[this.activeIndex];
          let background = activeSlide.querySelector('.background');
          if (background) {
            background.classList.add('animation');
          }
        },
      },
    });

    return () => {
      if (swiper) swiper.destroy(); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {[
          {
            title: 'Hallstatt, Austria',
            content: `Visit Hallstatt, Austria, a beautiful village by a clear lake, surrounded by tall mountains. Walk through old streets, see ancient salt mines, and enjoy the peaceful views. This tour is perfect for nature lovers and history fans.`,
            dataItem: 'one',
            background: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/dd28eb02-d6b1-401e-bc10-aead024e9ebf',
          },
          {
            title: 'Paris, France',
            content: `Explore Paris, the City of Light, known for its romance and famous landmarks like the Eiffel Tower. Enjoy delicious food, visit the Louvre, and stroll along the Seine River. Choose this tour to experience the charm and culture of France.`,
            dataItem: 'two',
            background: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fc70e01c-17f9-4e74-a967-f039285524c5',
          },
          {
            title: 'Amsterdam, Netherlands',
            content: `Discover Amsterdam, a city full of canals, bicycles, and culture. Visit the Van Gogh Museum, take a canal cruise, and explore lively streets. This tour is great for those who love art, history, and a vibrant city atmosphere.`,
            dataItem: 'three',
            background: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4e3edcf1-1b68-408f-87e2-ee9fd477bf87',
          },
          {
            title: 'Kyoto, Japan',
            content: `Travel to Kyoto, Japan, a city rich in tradition and beauty. Visit ancient temples, enjoy beautiful gardens, and see colorful geisha districts. This tour is perfect for those who want to experience Japan's history and culture.`,
            dataItem: 'four',
            background: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b772933f-6340-4c95-8d06-d809c4c9b739',
          },
          {
            title: 'New York, USA',
            content: `Experience New York City, where excitement and adventure await at every corner. See the Statue of Liberty, enjoy a Broadway show, and taste food from around the world. This tour is ideal for those who want to feel the energy of a big city.`,
            dataItem: 'five',
            background: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9f0fab6b-c28d-47e9-80f0-868e00562c3f',
          },
        ].map((slide, index) => (
          <div className="swiper-slide" key={index}>
            <div className="content" data-content={slide.dataItem}>
              <h1>{slide.title}</h1>
              <p>{slide.content}</p>
              <Link to="/Login" className="login-button">
                Go to Login
              </Link>
            </div>
            <div
              className="background"
              data-item={slide.dataItem}
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <a
        href="https://www.youtube.com/@ecemgokdogan/videos"
        target="_blank"
        rel="noopener noreferrer"
        className="logo"
      >
        <img
          src="https://assets.codepen.io/9868786/youtube.webp"
          alt="HTML tutorial"
        />
      </a>
    </div>
  );
};

export default Home;
