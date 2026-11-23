export const mockData = {
  header: {
    topBar: {
      leftLinks: [
        { label: 'Gift Voucher', href: '#voucher' },
        { label: 'Help & Advice', href: '#help' }
      ],
      rightLinks: [
        { label: 'Login / Sign up', href: '#account', icon: 'User' },
        { label: 'Wishlist (0)', href: '#wishlist', icon: 'Heart' }
      ]
    },
    navItems: [
      { name: 'Home', href: '#', active: true },
      { name: 'Shop', href: '#shop', active: false },
      { name: 'Blog', href: '#blog', active: false },
      { name: 'Pages', href: '#pages', active: false },
      { name: 'Portfolios', href: '#portfolios', active: false }
    ]
  },

  hero: {
    slides: [
      {
        id: 1,
        image: '/images/hero-slider1.jpg',
        title: 'NEW COLLECTION',
        subtitle: 'SALE UP TO 70% OFF',
        buttonText: 'Shop now !'
      },
      {
        id: 2,
        image: '/images/hero-slider2.jpg',
        title: 'MEN FASHION',
        subtitle: 'SALE UP TO 70% OFF',
        buttonText: 'Shop now !'
      },
      {
        id: 3,
        image: '/images/hero-slider3.jpg',
        title: 'AUTUMN LOOKBOOK',
        subtitle: 'UP TO 50% OFF',
        buttonText: 'Shop now !'
      }
    ],
    rightTopLeft: {
      image: '/images/hero-image1.jpg',
      alt: 'Men Fashion Showcase'
    },
    rightTopRight: {
      image: '/images/hero-image2.jpg',
      alt: 'Women Fashion Showcase'
    },
    rightBottom: {
      image: '/images/hero-image3.jpg',
      title: 'NEW ARRIVALS',
      subtitle: 'SALE 30%',
      alt: 'Luxury Watch Collection'
    }
  },

  serviceBenefits: [
    {
      id: 1,
      icon: 'Truck',
      title: 'FREE SHIPPING',
      subtitle: 'For All Orders Over $220'
    },
    {
      id: 2,
      icon: 'RotateCcw',
      title: '30 DAYS RETURNS',
      subtitle: 'Money Back Guarantee'
    },
    {
      id: 3,
      icon: 'Gift',
      title: 'PROMOTIONS',
      subtitle: '10% Member Discount'
    },
    {
      id: 4,
      icon: 'Headphones',
      title: 'ONLINE SUPPORT',
      subtitle: 'Free support 24/7 Per Week'
    }
  ],

  featuredProducts: {
    bestSeller: [
      {
        id: 'bs-1',
        title: 'Amed-Sleeve Tops Group',
        price: 60.00,
        originalPrice: null,
        formattedPrice: '$60.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-jacket-1.jpg',
        hoverImage: '/images/product-jacket-2.jpg',
        category: 'Jackets & Tops',
        description: 'Premium tailored cotton blend jacket with hood and zippered front closure. Breathable interior lining with adjustable cuffs.'
      },
      {
        id: 'bs-2',
        title: 'Sap Framed-Sleeve Group',
        price: 50.00,
        maxPrice: 62.00,
        originalPrice: null,
        formattedPrice: '$50.00 – $62.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-sweater.jpg',
        hoverImage: '/images/product-sweater.jpg',
        category: 'Knitwear & Sweaters',
        description: 'Soft-touch jacquard knitted sweater featuring modern Nordic geometric patterns. Designed for effortless seasonal layering.'
      },
      {
        id: 'bs-3',
        title: 'Avitae lectus default',
        price: 54.00,
        originalPrice: null,
        formattedPrice: '$54.00',
        badge: null,
        rating: 5,
        image: '/images/product-watch.jpg',
        hoverImage: '/images/product-watch-2.jpg',
        category: 'Accessories & Watches',
        description: 'Minimalist dress watch featuring an ultra-slim stainless steel casing, mineral glass crystal, and genuine supple leather strap.'
      },
      {
        id: 'bs-4',
        title: 'At Sleeve odio external',
        price: 35.00,
        originalPrice: 40.00,
        formattedPrice: '$35.00',
        formattedOriginalPrice: '$40.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-sandals.jpg',
        hoverImage: '/images/product-sandals.jpg',
        category: 'Footwear',
        description: 'Chic metallic multi-strap gladiator sandals with cushioned insole and non-slip rubber tread. Perfect for warm-weather sophistication.'
      }
    ],
    newArrival: [
      {
        id: 'na-1',
        title: 'Asem qwase default',
        price: 65.00,
        originalPrice: null,
        formattedPrice: '$65.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-jacket-2.jpg',
        hoverImage: '/images/product-jacket-1.jpg',
        category: 'Outerwear',
        description: 'Contemporary casual fit utility coat featuring weather-resistant cotton twill and antique brass hardware.'
      },
      {
        id: 'na-2',
        title: 'Azrouel dress variable',
        price: 50.00,
        originalPrice: 72.00,
        formattedPrice: '$50.00',
        formattedOriginalPrice: '$72.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-dress-1.jpg',
        hoverImage: '/images/product-dress-2.jpg',
        category: 'Dresses',
        description: 'Flowing linen-blend sleeveless slip dress with subtle pleated detailing and flattering silhouette.'
      },
      {
        id: 'na-3',
        title: 'At Sleeve odio external',
        price: 35.00,
        originalPrice: 40.00,
        formattedPrice: '$35.00',
        formattedOriginalPrice: '$40.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-sandals.jpg',
        hoverImage: '/images/product-sandals.jpg',
        category: 'Footwear',
        description: 'Chic metallic multi-strap gladiator sandals with cushioned insole and non-slip rubber tread.'
      },
      {
        id: 'na-4',
        title: 'Avitae lectus default',
        price: 54.00,
        originalPrice: null,
        formattedPrice: '$54.00',
        badge: null,
        rating: 5,
        image: '/images/product-watch.jpg',
        hoverImage: '/images/product-watch-2.jpg',
        category: 'Accessories & Watches',
        description: 'Minimalist dress watch featuring an ultra-slim stainless steel casing, mineral glass crystal, and genuine supple leather strap.'
      }
    ],
    mostWanted: [
      {
        id: 'mw-1',
        title: 'Amed-Sleeve Tops Group',
        price: 60.00,
        originalPrice: null,
        formattedPrice: '$60.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-jacket-1.jpg',
        hoverImage: '/images/product-jacket-2.jpg',
        category: 'Jackets & Tops',
        description: 'Premium tailored cotton blend jacket with hood and zippered front closure.'
      },
      {
        id: 'mw-2',
        title: 'Sap Framed-Sleeve Group',
        price: 50.00,
        maxPrice: 62.00,
        originalPrice: null,
        formattedPrice: '$50.00 – $62.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-sweater.jpg',
        hoverImage: '/images/product-jacket-1.jpg',
        category: 'Knitwear & Sweaters',
        description: 'Soft-touch jacquard knitted sweater featuring modern Nordic geometric patterns.'
      },
      {
        id: 'mw-3',
        title: 'Azrouel dress variable',
        price: 50.00,
        originalPrice: 72.00,
        formattedPrice: '$50.00',
        formattedOriginalPrice: '$72.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-dress-1.jpg',
        hoverImage: '/images/product-dress-2.jpg',
        category: 'Dresses',
        description: 'Flowing linen-blend sleeveless slip dress with subtle pleated detailing.'
      },
      {
        id: 'mw-4',
        title: 'At Sleeve odio external',
        price: 35.00,
        originalPrice: 40.00,
        formattedPrice: '$35.00',
        formattedOriginalPrice: '$40.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-sandals.jpg',
        hoverImage: '/images/product-sandals.jpg',
        category: 'Footwear',
        description: 'Chic metallic multi-strap gladiator sandals with cushioned insole and non-slip rubber tread.'
      }
    ]
  },

  categoryBanners: [
    {
      id: 1,
      title: 'COLLECTION',
      subtitle: 'BAGS',
      image: '/images/banner-bags.jpg',
      link: '#collection-bags'
    },
    {
      id: 2,
      title: 'SALE UP TO 50% OFF',
      subtitle: 'WOMEN FASHION',
      image: '/images/banner-sale50.jpg',
      link: '#sale-50'
    },
    {
      id: 3,
      title: 'WOMEN',
      subtitle: 'SHOES',
      image: '/images/banner-shoes.jpg',
      link: '#women-shoes'
    }
  ],

  womenFashionShowcase: {
    banner: {
      badge: 'Hot Trend',
      title: "WOMEN'S FASHION",
      description: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',
      image: '/images/showcase-women.jpg'
    },
    products: [
      {
        id: 'wf-1',
        title: 'Amed-Sleeve Tops Group',
        price: 60.00,
        formattedPrice: '$60.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-jacket-1.jpg',
        hoverImage: '/images/product-jacket-2.jpg'
      },
      {
        id: 'wf-2',
        title: 'Azrouel dress variable',
        price: 50.00,
        originalPrice: 72.00,
        formattedPrice: '$50.00',
        formattedOriginalPrice: '$72.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-dress-1.jpg',
        hoverImage: '/images/product-dress-2.jpg'
      },
      {
        id: 'wf-3',
        title: 'At Sleeve odio external',
        price: 35.00,
        originalPrice: 40.00,
        formattedPrice: '$35.00',
        formattedOriginalPrice: '$40.00',
        badge: 'SALE',
        rating: 5,
        image: '/images/product-sandals.jpg',
        hoverImage: '/images/product-sandals.jpg'
      }
    ]
  },

  dealsOfWeek: {
    left: {
      discount: '-30%',
      title: "MEN'S FASHION",
      subtitle: 'Crasornar elit.',
      image: '/images/deals-men.png'
    },
    center: {
      title: 'DEALS OF WEEKS',
      description: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.',
      buttonText: 'VIEW ALL PRODUCTS'
    },
    right: {
      discount: '-50%',
      title: "WOMEN'S FASHION",
      subtitle: 'Crasornar elit.',
      image: '/images/deals-women.png'
    }
  },

  menFashionShowcase: {
    banner: {
      badge: 'Hot Trend',
      title: "MEN'S FASHION",
      description: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',
      image: '/images/showcase-men.jpg'
    },
    products: [
      {
        id: 'mf-1',
        title: 'Amed-Sleeve Tops Group',
        price: 60.00,
        formattedPrice: '$60.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-jacket-1.jpg',
        hoverImage: '/images/product-jacket-2.jpg'
      },
      {
        id: 'mf-2',
        title: 'Sap Framed-Sleeve Group',
        price: 50.00,
        maxPrice: 62.00,
        formattedPrice: '$50.00 – $62.00',
        badge: 'NEW',
        rating: 5,
        image: '/images/product-sweater.jpg',
        hoverImage: '/images/product-sweater.jpg'
      },
      {
        id: 'mf-3',
        title: 'Avitae lectus default',
        price: 54.00,
        formattedPrice: '$54.00',
        badge: null,
        rating: 5,
        image: '/images/product-watch.jpg',
        hoverImage: '/images/product-watch-2.jpg',
        category: 'Accessories & Watches',
        description: 'Minimalist dress watch featuring an ultra-slim stainless steel casing, mineral glass crystal, and genuine supple leather strap.'
      }
    ]
  },

  dealOfDayBanners: {
    left: {
      title: 'DEAL OF THE DAY',
      subtitle: "GIRL'S BAGS",
      discount: 'SALE 30%',
      image: '/images/dealoftheday-bags.jpg',
      link: '#deal-of-the-day'
    },
    right: {
      title: 'NEW ARRIVALS',
      subtitle: 'SALE 40%',
      image: '/images/newarrivals-sale40.jpg',
      link: '#new-arrivals-sale'
    }
  },

  blog: {
    subtitle: 'The Fashion Blogger',
    title: 'FROM THE BLOG',
    featured: {
      id: 1,
      title: 'Lorem Ipsum is simply',
      author: 'Admin',
      date: 'January 20, 2026',
      day: '20',
      month: 'Jan',
      image: '/images/blog-1.jpg',
      excerpt: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    },
    posts: [
      {
        id: 2,
        title: 'FASHION SHOOT FOR AUTUMN',
        author: 'Admin',
        date: 'January 18, 2026',
        day: '18',
        month: 'Jan',
        image: '/images/blog-2.jpg',
        excerpt: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.'
      },
      {
        id: 3,
        title: 'LOREM IPSUM IS SIMPLY DUMMY',
        author: 'Admin',
        date: 'January 16, 2026',
        day: '16',
        month: 'Jan',
        image: '/images/blog-3.jpg',
        excerpt: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.'
      }
    ]
  },

  brandLogos: [
    { id: 1, name: 'Fashion Brand', image: '/images/brand-1.jpg' },
    { id: 2, name: 'Brand Fashion', image: '/images/brand-3.jpg' },
    { id: 3, name: 'Vintage Circle Brand', image: '/images/brand-2.jpg' },
    { id: 4, name: 'Fashion Brand Ribbon', image: '/images/brand-1.jpg' },
    { id: 5, name: 'Brand Fashion Crest', image: '/images/brand-3.jpg' }
  ],

  footer: {
    about: {
      logo: '/images/logo-white.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    contact: {
      title: 'CONTACT US',
      address: '123 Sky Tower, West Central City, NY',
      phone: '(012) 345-6789',
      email: 'support@rango.com'
    },
    socials: [
      { name: 'Facebook', icon: 'Facebook', href: '#' },
      { name: 'Twitter', icon: 'Twitter', href: '#' },
      { name: 'Pinterest', icon: 'Pin', href: '#' },
      { name: 'Instagram', icon: 'Instagram', href: '#' },
      { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
      { name: 'RSS', icon: 'Rss', href: '#' }
    ],
    newsletter: {
      title: 'NEWSLETTER',
      description: 'Subscribe to our newsletter to receive news, updates, and special offers by email.'
    },
    columns: [
      {
        title: 'QUICK LINK',
        links: ['Home', 'About Us', 'Contact Us', 'FAQ', 'Privacy Policy', 'Terms & Conditions']
      },
      {
        title: 'JOIN OUR COMMUNITY',
        links: ['Help Center', 'Returns', 'Shipping Info', 'Order Status', 'Gift Cards', 'Track Order']
      },
      {
        title: 'JOIN OUR COMMUNITY',
        links: ['Size Guide', 'Our Brands', 'Affiliates', 'Careers', 'Press & Media', 'Investors']
      },
      {
        title: 'CUSTOMER SERVICE',
        links: ['Payment Methods', 'Customer Support', 'Store Locator', 'Site Map', 'Terms of Use']
      }
    ],
    copyright: 'Copyright © 2026 Rango. All Rights Reserved.',
    payments: ['Visa', 'MasterCard', 'PayPal', 'Amex', 'Discover']
  }
};
