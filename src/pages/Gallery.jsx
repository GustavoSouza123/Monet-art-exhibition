import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, CustomEase, SplitText, ScrambleTextPlugin } from 'gsap/all';
import data from '../data.json';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin);

export default function Gallery() {
  const { artworks } = data;
  // const plane1 = useRef(null);
  // const plane2 = useRef(null);
  // const plane3 = useRef(null);
  // const easing = 0.08;
  // const speed = 0.01;
  // let requestAnimationFrameId = null;
  // let xForce = 0;
  // let yForce = 0;

  useGSAP(() => {
    let tl = gsap.timeline({
      defaults: {
        // duration: 4,
        duration: 1,
        ease: CustomEase.create('custom', 'M0,0 C0.907,0.183 0.117,0.984 1,0.997'),
      },
    });

    gsap.set('main#gallery .title', { scale: 2.5 });

    tl.set('.image1', { x: '51.32vw', y: '19.93vh' }, 'image');
    tl.set('.image2', { x: '32.01vw', y: '51.79vh' }, 'image');
    tl.set('.image3', { x: '13.5vw', y: '5.38vh' }, 'image');
    tl.set('.image4', { x: '53.7vw', y: '70.36vh' }, 'image');
    tl.set('.image5', { x: '73.02vw', y: '51.79vh' }, 'image');
    tl.set('.image6', { x: '2.65vw', y: '59.71vh' }, 'image');
    tl.set('.image7', { x: '75.66vw', y: '6.85vh' }, 'image');

    SplitText.create('main#gallery .title', {
      type: 'chars',
      autoSplit: true,
      mask: 'chars',
      onSplit: (self) => {
        tl.from(
          self.chars,
          {
            yPercent: 100,
            // duration: 1.5,
            duration: 0.1,
            // stagger: 0.05,
            ease: 'power2.inOut',
          },
          '0.5'
        );
      },
    });

    tl.fromTo(
      'img',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        scale: 1.5,
        stagger: 0.05, // 0.5
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        stagger: 0.05, // 0.5
      },
      '>-1'
    );

    const headerTitle = document.querySelector('header .title').getBoundingClientRect();
    const headerX = headerTitle.x;
    const headerY = headerTitle.y;

    tl.to(
      'main#gallery .title',
      {
        x: headerX,
        y: headerY,
        scale: 1,
        top: 0,
        left: 0,
        transform: 'none',
        // duration: 2,
        duration: 0.1,
        ease: 'power3.inOut',
      },
      'title'
    );

    tl.to('main#gallery', { padding: '100px 0', /*duration: 2*/ duration: 0.1 }, 'title');
    imagesGrid(tl);
    // imagesList();

    SplitText.create('.mask', {
      type: 'lines',
      autoSplit: true,
      mask: 'lines',
      onSplit: (self) => {
        tl.from(
          self.lines,
          {
            yPercent: 100,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
          },
          'title+0.5'
        );
      },
    });
  });

  function ignore() {
    // const manageMouseMove = (e) => {
    //   const { movementX, movementY } = e;
    //   xForce += movementX * speed;
    //   yForce += movementY * speed;
    //   if (requestAnimationFrameId == null) {
    //     requestAnimationFrameId = requestAnimationFrame(animate);
    //   }
    // };
    // const lerp = (start, target, amount) =>
    //   start * (1 - amount) + target * amount;
    // const animate = () => {
    //   xForce = lerp(xForce, 0, easing);
    //   yForce = lerp(yForce, 0, easing);
    //   gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    //   // gsap.set(plane2.current, {
    //   //   x: `+=${xForce * 0.5}`,
    //   //   y: `+=${yForce * 0.5}`,
    //   // });
    //   // gsap.set(plane3.current, {
    //   //   x: `+=${xForce * 0.25}`,
    //   //   y: `+=${yForce * 0.25}`,
    //   // });
    //   if (Math.abs(xForce) < 0.01) xForce = 0;
    //   if (Math.abs(yForce) < 0.01) yForce = 0;
    //   if (xForce != 0 || yForce != 0) {
    //     requestAnimationFrame(animate);
    //   } else {
    //     cancelAnimationFrame(requestAnimationFrameId);
    //     requestAnimationFrameId = null;
    //   }
    // };
  }

  const imagesList = () => {
    // const numCols = 8;
    // const colWidth = (window.innerWidth - 80) / numCols - 40;
    // const getGridWidth = (cols) => {
    //   return colWidth * cols + 40 * (numCols - 1);
    // };
    // const widths = [getGridWidth(6), getGridWidth(4), getGridWidth(2), getGridWidth(8), getGridWidth(4), getGridWidth(6), getGridWidth(4)];

    const heights = [470, 895, 800, 872, 642, 512, 1084];
    const gap = 50;
    const galleryHeight = heights.reduce((acc, cur) => acc + cur, 0) + gap * (heights.length - 1);

    gsap.to('main .gallery', { height: galleryHeight + 'px', alignItems: 'center', gap: '100px' });
    // gsap.to('main .gallery', { height: '3000px' });

    document.querySelectorAll('.image').forEach((image, index) => {
      gsap.to(image, { height: heights[index], x: 0, y: 0 });
      // gsap.to(image, { width: widths[index], height: '100%', x: 0, y: 0 });
      // gsap.to(image.firstChild, { width: '100%', height: 'auto' });
    });
  };

  const imagesGrid = (timeline) => {
    // const duration = 2;
    const duration = 0.1;

    const tl =
      timeline ||
      gsap.timeline({
        defaults: {
          duration,
          ease: CustomEase.create('custom', 'M0,0 C0.907,0.183 0.117,0.984 1,0.997'),
        },
      });

		// TODO: calculate images widths based on grids width (see imageList() function)
    tl.to('.image1', { x: '36.51vw', y: (1564 * 21.74) / 100, height: '256px', duration }, 'title');
    tl.to('.image2', { x: '40px', y: (1564 * 53.07) / 100, height: '634px', duration }, 'title');
    tl.to('.image3', { x: '60.85vw', y: (1564 * 53.07) / 100, height: '223px', duration }, 'title');
    tl.to('.image4', { x: '70.37vw', y: (1564 * 11.64) / 100, height: '316px', duration }, 'title');
    tl.to('.image5', { x: '48.68vw', y: (1564 * 86.51) / 100, height: '211px', duration }, 'title');
    tl.to('.image6', { x: '2.65vw', y: (1564 * 4.67) / 100, height: '267px', duration }, 'title');
    tl.to('.image7', { x: '82.54vw', y: (1564 * 67.33) / 100, height: '250px', duration }, 'title');
  };

  return (
    <main id="gallery">
      <div className="top">
        <div className="title">Claude Monet</div>
      </div>

      <div
        className="gallery"
        // onMouseMove={(e) => manageMouseMove(e)}
      >
        {artworks.map((artwork, index) => (
          <div className={`image image${index + 1}`} key={index}>
            <img src={artwork.imageFile} alt={artwork.name} />
          </div>
        ))}
      </div>

      <div className="bottom">
        <div className="nav">
          <div className="list mask" onClick={() => imagesList()}>
            List
          </div>
          <div className="span mask">/</div>
          <div className="grid mask active" onClick={() => imagesGrid()}>
            Grid
          </div>
        </div>
        <div className="copyright">Made by Gustavo Souza</div>
      </div>
    </main>
  );
}
