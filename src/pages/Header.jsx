import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ScrollTrigger,
  CustomEase,
  SplitText,
  ScrambleTextPlugin,
} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin);

export default function Gallery() {
  useGSAP(() => {});

  return (
		<header>
			
		</header>
  );
}
