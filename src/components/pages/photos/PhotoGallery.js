import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class PhotoGallery extends Component {
  state = { currentImage: 0 };
  
  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    return (
        <div>
          <Gallery photos={PHOTO_SET} onClick={this.openLightbox}/>
          <Lightbox images={PHOTO_SET}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
          />
      </div>
    );
  }
}

const PHOTO_SET = [
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto1.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto3.jpg',
    width: 3,
    height: 2
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto2.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto8.jpg',
    width: 3,
    height: 2
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto4.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto6.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto12.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto7.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto11.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto9.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto10.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto5.jpg',
    width: 3,
    height: 4
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto0.jpeg',
    width: 3,
    height: 2
  },
  {
    src: 'https://d3lc0b90jzcm0p.cloudfront.net/kayphoto13.jpeg',
    width: 3,
    height: 2
  }
];

export default PhotoGallery;