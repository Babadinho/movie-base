'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ImFacebook, ImTwitter } from 'react-icons/im';
import { BiLogoTiktok } from 'react-icons/bi';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import useMovieTab from '@/store/useMovieTabs';
import useSearchModal from '@/store/useSearchModal';

interface MenuItem {
  label: string;
  key: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Movies',
    key: '#movies',
    children: [
      {
        label: 'Upcoming',
        key: '#upcoming'
      },
      {
        label: 'Popular',
        key: '#popular'
      },
      {
        label: 'Top Rated',
        key: '#top_rated'
      }
    ]
  },
  {
    label: 'Now Playing',
    key: '#now_playing'
  },
  {
    label: 'Upcoming',
    key: '#upcoming'
  },
  {
    label: 'Popular',
    key: '#popular'
  },
  {
    label: 'Top Rated',
    key: '#top_rated'
  }
];

const renderMenuItems = (
  items: MenuItem[],
  activeMenu: string,
  setActiveMenu: (key: string) => void,
  activeMobileHamburger: boolean | undefined,
  setCurrentTab: (currentTab: string) => void
): JSX.Element[] => {
  const handleSetCurrentTab = (item: MenuItem) => {
    const validTabs = ['upcoming', 'popular', 'top_rated'];
    if (validTabs.includes(item.key)) {
      setCurrentTab(item.key);
    }
  };

  return items.map((item) => (
    <li
      key={item.key}
      className="header__menu--item"
      onMouseOver={() => item.children && setActiveMenu(item.key)}
      onMouseLeave={() => item.children && setActiveMenu('')}
      onClick={() => handleSetCurrentTab(item)}
    >
      <Link href={item.key ? `/${item.key}` : '/'}>{item.label}</Link>
      {item.children && item.children.length > 0 && (
        <ul className={`header__submenu ${activeMenu === item.key ? 'header__submenu--active' : ''}`}>
          {renderMenuItems(item.children, activeMenu, setActiveMenu, activeMobileHamburger, setCurrentTab)}
        </ul>
      )}
    </li>
  ));
};

const renderMobileMenuItems = (
  items: MenuItem[],
  activeMobileMenu: string,
  setActiveMobileMenu: (key: string) => void,
  activeMobileHamburger: boolean | undefined,
  setActiveMobileHamburger: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setCurrentTab: (currentTab: string) => void
): JSX.Element[] => {
  const handleClick = (key: string) => {
    if (activeMobileMenu === key) {
      setActiveMobileMenu('');
    } else {
      setActiveMobileMenu(key);
    }
  };

  const handleSetCurrentTab = (item: MenuItem) => {
    if (item.key === 'movies') {
      setCurrentTab('now_playing');
    } else {
      const validTabs = ['upcoming', 'popular', 'top_rated'];
      if (validTabs.includes(item.key)) {
        setCurrentTab(item.key);
      }
    }
  };

  return items.map((item) => (
    <li key={item.key} className="header__mobileMenu--item">
      <Link href={`#${item.key}`} onClick={() => handleSetCurrentTab(item)}>
        {item.label}
      </Link>{' '}
      {item.children && <FaChevronDown className={`header__mobileMenuIcon ${item.key === activeMobileMenu ? 'header__mobileMenuIcon--active' : ''}`} onClick={() => handleClick(item.key)} />}
      {item.children && item.children.length > 0 && (
        <ul className={`header__mobileSubmenu ${activeMobileMenu === item.key ? 'header__mobileSubmenu--active' : ''}`}>
          {renderMobileMenuItems(item.children, activeMobileMenu, setActiveMobileMenu, activeMobileHamburger, setActiveMobileHamburger, setCurrentTab)}
        </ul>
      )}
    </li>
  ));
};

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [activeMobileMenu, setActiveMobileMenu] = useState('');
  const [navScroll, setNavScroll] = useState(false);
  const [activeMobileHamburger, setActiveMobileHamburger] = useState<boolean | undefined>(undefined);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const setCurrentTab = useMovieTab((state) => state.setCurrentTab);
  const searchModal = useSearchModal();

  // NAVBAR SCROLL TO FIX
  const fixedNav = () => {
    if (window.scrollY >= 85) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  // CLICK OUTIDE TO CLOSE MOBILE MENU
  const handleClickOutside = (event: MouseEvent) => {
    const hamburgerIcon = document.querySelector('.header__hamburger');
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !hamburgerIcon?.contains(event.target as Node)) {
      setActiveMobileHamburger(false);
      setActiveMobileMenu('');
    }
  };

  useEffect(() => {
    fixedNav();
    window.addEventListener('scroll', fixedNav);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', fixedNav);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className={`header__wrapper ${navScroll && 'header__wrapper--fixed'}`}>
        <div className="header__navbar">
          <Link href="/" className="header__logo">
            <Image src={'/images/logo-1.png'} alt={'Movie Base Logo'} width={100} height={28} />
          </Link>
          <div className="header__menu">
            <ul className="header__menu--list">{renderMenuItems(menuItems, activeMenu, setActiveMenu, activeMobileHamburger, setCurrentTab)}</ul>
          </div>
          <div className="header__cta">
            <button className="header__search" onClick={() => searchModal.onOpen()}>
              <FaSearch size={23} />
            </button>
            <div className="header__divider"></div>
            <div className="header__socials">
              <Link href="#">
                <ImTwitter size={14} />
              </Link>
              <Link href="#">
                <ImFacebook size={14} />
              </Link>
              <Link href="#">
                <BiLogoTiktok size={15} />
              </Link>
            </div>
            <div className={`header__hamburger ${activeMobileHamburger ? 'header__hamburger--active' : ''}`} onClick={() => setActiveMobileHamburger(!activeMobileHamburger)}>
              <span className="header__hamburger--line"></span>
              <span className="header__hamburger--line"></span>
              <span className="header__hamburger--line"></span>
            </div>
          </div>
        </div>
      </div>
      <>
        <div ref={mobileMenuRef} className={`header__mobile ${activeMobileHamburger ? 'header__mobile--slideIn' : ''} ${activeMobileHamburger === false ? 'header__mobile--slideOut' : ''}`}>
          <div className="header__mobileMenu">
            <ul className="header__mobileMenu--list">{renderMobileMenuItems(menuItems, activeMobileMenu, setActiveMobileMenu, activeMobileHamburger, setActiveMobileHamburger, setCurrentTab)}</ul>
            <div className="header__mobileSocials">
              <Link href="#">
                <ImTwitter size={14} />
              </Link>
              <Link href="#">
                <ImFacebook size={14} />
              </Link>
              <Link href="#">
                <BiLogoTiktok size={15} />
              </Link>
            </div>
          </div>
        </div>
        <div className={`header__mobileUnderlay ${activeMobileHamburger ? 'header__mobileUnderlay--active' : ''}`}></div>
      </>
    </div>
  );
};

export default Header;
