'use strict';
import {useEffect, useState} from 'react';
import throttle from 'lodash.throttle';

module.exports = (offset = 0) => {
	const [ref, setRef] = useState(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const elementYPos = () => {
			return (
				ref.getBoundingClientRect().top +
				window.pageYOffset -
				window.innerHeight +
				offset
			);
		};

		if (!ref) {
			return;
		}

		const handleScroll = throttle(() => {
			if (!ref) {
				return;
			}

			if (window.pageYOffset >= elementYPos()) {
				window.removeEventListener('scroll', handleScroll);
				setInView(true);
			}
		}, 200);
		window.addEventListener('scroll', handleScroll, {passive: true});
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [ref, offset]);

	return [setRef, inView];
};