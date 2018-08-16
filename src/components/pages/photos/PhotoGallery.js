import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

class PhotoGallery extends Component {
    render() {
	return (
	    <Gallery photos={PHOTO_SET} />
	);
    }
}
const PHOTO_SET = [
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/9d45bac2023a52dbb940668af1bd638e/5BFC8B31/t51.2885-15/e35/13694619_996352053815485_1466488504_n.jpg',
    width: 4,
    height: 4
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/dd2287e8cf7f821c099334c4ca90e9f8/5BED5774/t51.2885-15/e35/13551545_829269067203845_884990387_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/1e842c47c0c651f96509025f21149adc/5BF443A4/t51.2885-15/e35/12716738_240511332957050_2064869502_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/72cdaa01d6e8d76a6e35d42838bf1a70/5C0F10C5/t51.2885-15/e35/13129479_1546630348967048_1297139968_n.jpg',
    width: 3,
    height: 2
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/146f4c5ddf6dec3c8a5894707ad3ab53/5C0150E1/t51.2885-15/e35/13551751_811601562274127_95039138_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/6afae5051641274fcfe13815a2e08033/5C11D2CB/t51.2885-15/e35/12725190_462641967193919_1380810615_n.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/97403cb808b2e3b55ea0354521884a92/5BEDF596/t51.2885-15/e35/12531123_1689551387999540_1450435988_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/eb33872dd6269628a1a13d219314fc68/5C0D0A9F/t51.2885-15/e35/12716831_1017362524969375_621367992_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/32b5197bc5bb7a451ae0521957805f1d/5BECC047/t51.2885-15/e35/12534389_1100237133372832_1460177284_n.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/4c6d8a8d9f46da9646ce8e150eb01540/5BF2EBF0/t51.2885-15/e35/10012488_1707272346197204_1934595953_n.jpg',
    width: 1,
    height: 1
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/17b88702836c4744c55adc9bedb403c3/5C094647/t51.2885-15/e35/917077_167796596914840_2119571801_n.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'https://scontent-lax3-1.cdninstagram.com/vp/7c4c3d20e119995ff05a5b24fdb289fc/5BF95B92/t51.2885-15/e35/12407493_667658316710218_908941777_n.jpg',
    width: 3,
    height: 4
  }
];

export default PhotoGallery;