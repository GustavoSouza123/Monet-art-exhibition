import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, CustomEase, SplitText, ScrambleTextPlugin } from 'gsap/all';
import data from '../data.json';
import { NavLink } from 'react-router';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin);

export default function Gallery() {
  useGSAP(() => {});
  const { artworks } = data;

  return (
    <header>
      <div className="title">Claude Monet</div>

      <div className="nav">
        <NavLink to="" className="gallery mask">
          Gallery <span>({artworks.length})</span>
        </NavLink>
        <NavLink to="info" className="info mask">
          Info
        </NavLink>
      </div>
    </header>
  );
}
