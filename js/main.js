try {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 4,
		spaceBetween: 70,
		slidesPerGroup: 1,
		loop: true,

		pagination: {
			el: '.special-pagination',
			clickable: true,
			bulletClass: 'custom-bullet',
			bulletActiveClass: 'custom-bullet-active',
			renderBullet: function (index, className) {
				return `<span class="${className}"></span>`
			},
		},

		navigation: {
			nextEl: '.special-next',
			prevEl: '.special-prev',
		},

		breakpoints: {
			320: { slidesPerView: 1 },
			576: { slidesPerView: 2 },
			768: { slidesPerView: 3 },
			1024: { slidesPerView: 4 },
		},

		// Добавляем обработку ошибок внутри Swiper
		on: {
			init: function () {
				console.log('Swiper инициализирован')
			},
			error: function (error) {
				console.error('Swiper error:', error)
				this.destroy(true) // Чистый дестрой при ошибке
			},
		},
	})
} catch (error) {
	console.error('Swiper initialization failed:', error)
	// Fallback: показываем карточки без слайдера
	document.querySelector('.swiper-wrapper').style.overflowX = 'auto'
	document.querySelector('.swiper-wrapper').style.flexWrap = 'nowrap'
	document.querySelector('.special-controls').style.display = 'none'
}
const menuButton = document.querySelector('.header__burger')
const menu = document.querySelector('.header__nav')

menuButton.addEventListener('click', () => {
	menu.classList.toggle('active')
	menuButton.classList.toggle('active')
	if (menu.classList.contains('active')) {
		document.body.style.overflow = 'hidden'
		document.querySelector('.header__burger .open').style.display = 'none'
		document.querySelector('.header__burger .close').style.display = 'block'
	} else {
		document.body.style.overflow = 'unset'
		document.querySelector('.header__burger .open').style.display = 'block'
		document.querySelector('.header__burger .close').style.display = 'none'
	}
})

document.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('load', () => {
		gsap.to('#preloader', {
			opacity: 0,
			duration: 1,
			onComplete: () => {
				document.getElementById('preloader').remove()
			},
		})
		gsap.to('.gsap-spinner', {
			rotate: 360,
			repeat: -1,
			duration: 1,
			ease: 'linear',
		})

		gsap.to('.content', { opacity: 1, duration: 0.6, delay: 0.3 })
	})
	let resizeTimer
	const RESIZE_DELAY = 250

	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer)
		resizeTimer = setTimeout(() => {
			ScrollTrigger.refresh()
			console.log('ScrollTrigger обновлен после ресайза')
		}, RESIZE_DELAY)
	})
	gsap.registerPlugin(ScrollTrigger)
	gsap.registerPlugin(SplitText)

	gsap.set('.container', { opacity: 1 })
	let splitNav = SplitText.create(['.header__list', '.logo'], {
		type: 'words',
		aria: 'hidden',
	})

	gsap.fromTo(
		'.header__btn',
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1,
			delay: 1.5,
		}
	)
	gsap.from(splitNav.words, {
		opacity: 0,
		x: () => gsap.utils.random(-200, 200),
		y: () => gsap.utils.random(-100, 100),
		rotation: () => gsap.utils.random(-10, 10),
		duration: 1.5,
		ease: 'power3.out',
		stagger: 0.1,
	})

	let splitTitle = SplitText.create('.header__title', {
		type: 'words',
		aria: 'hidden',
	})

	gsap.from(splitTitle.words, {
		opacity: 0,
		y: () => gsap.utils.random(-100, 100),
		rotation: () => gsap.utils.random(-10, 10),
		duration: 1.2,
		ease: 'power2.out',
		stagger: 0.08,
	})

	let split = SplitText.create('.header__text', {
		type: 'words',
		aria: 'hidden',
	})

	gsap.from(split.words, {
		opacity: 0,
		duration: 2,
		ease: 'sine.out',
		stagger: 0.1,
	})
	gsap.fromTo(
		'.header-middle__btn',
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1,
			delay: 1.5,
		}
	)

	ScrollTrigger.batch('.item', {
		start: 'top 85%',
		onEnter: batch => {
			gsap.to(batch, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.35,
				ease: 'power2.out',
			})
		},
		onLeaveBack: batch => {
			gsap.to(batch, {
				opacity: 0,
				y: 100,
				duration: 0.5,
			})
		},
		// markers: true,
	})
	ScrollTrigger.batch(
		[
			'.title-h2',
			'.description-h2',
			'.swiper-slide',
			'.blog-small',
			'.blog-big',
		],
		{
			start: 'top 85%',
			onEnter: batch => {
				gsap.to(batch, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.35,
					ease: 'power2.out',
				})
			},
			onLeaveBack: batch => {
				gsap.to(batch, {
					opacity: 0,
					y: 100,
					duration: 0.5,
				})
			},
			// markers: true,
		}
	)
})
