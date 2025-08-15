import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ScrollTrigger,
  CustomEase,
  SplitText,
  ScrambleTextPlugin,
} from 'gsap/all';
import data from '../data.json';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin);

export default function Gallery() {
  const { artworks } = data;

  useGSAP(() => {
    let tl = gsap.timeline({
      defaults: {
        duration: 4,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0.907,0.183 0.117,0.984 1,0.997'
        ),
      },
    });

		tl.addLabel('h1', 1)

    SplitText.create('h1', {
      type: 'chars',
      autoSplit: true,
      mask: 'chars',
      onSplit: (self) => {
        tl.from(
          self.chars,
          {
            yPercent: 100,
            duration: 1.5,
            stagger: 0.05,
            // ease: CustomEase.create(
            //   'custom',
            //   'M0,0 C0.972,0 0.515,0.986 1,0.997 '
            // ),
            ease: 'power2.inOut',
          },
          'h1'
        );
      },
    });

    tl.fromTo(
      'img',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        scale: 1.5,
        stagger: 0.5,
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        stagger: 0.5,
      },
      '>h1'
    );
  });

  return (
    <main id="gallery">
      <h1>Claude Monet</h1>

      <div className="gallery">
        {artworks.map((artwork, index) => (
          <div className="wrapper" key={index}>
            <img
              src={artwork.imageFile}
              alt={artwork.name}
              className={`image${index + 1}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
