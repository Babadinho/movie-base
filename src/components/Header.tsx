'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ImFacebook, ImTwitter } from 'react-icons/im';
import { BiLogoTiktok } from 'react-icons/bi';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import useMovieTab from '@/hooks/useMovieTabs';
import useSearchModal from '@/hooks/useSearchModal';
import useMobileMenu from '@/hooks/useMobileMenu';

interface MenuItem {
  label: string;
  key: string;
  value: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Movies',
    key: '#movies',
    value: 'movies',
    children: [
      {
        label: 'Upcoming',
        key: '#upcoming',
        value: 'upcoming'
      },
      {
        label: 'Popular',
        key: '#popular',
        value: 'popular'
      },
      {
        label: 'Top Rated',
        key: '#top_rated',
        value: 'top_rated'
      }
    ]
  },
  {
    label: 'Now Playing',
    key: '#now_playing',
    value: 'now_playing'
  },
  {
    label: 'Upcoming',
    key: '#upcoming',
    value: 'upcoming'
  },
  {
    label: 'Popular',
    key: '#popular',
    value: 'popular'
  },
  {
    label: 'Top Rated',
    key: '#top_rated',
    value: 'top_rated'
  }
];

const renderMenuItems = (items: MenuItem[], activeMenu: string, setActiveMenu: (key: string) => void, setCurrentTab: (currentTab: string) => void): JSX.Element[] => {
  const handleSetCurrentTab = (item: MenuItem) => {
    const validTabs = ['upcoming', 'popular', 'top_rated'];
    if (validTabs.includes(item.value)) {
      setCurrentTab(item.value);
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
        <ul className={`header__submenu ${activeMenu === item.key ? 'header__submenu--active' : ''}`}>{renderMenuItems(item.children, activeMenu, setActiveMenu, setCurrentTab)}</ul>
      )}
    </li>
  ));
};

const renderMobileMenuItems = (items: MenuItem[], activeMobileMenu: string, setActiveMobileMenu: (key: string) => void, setCurrentTab: (currentTab: string) => void): JSX.Element[] => {
  const handleClick = (key: string) => {
    if (activeMobileMenu === key) {
      setActiveMobileMenu('');
    } else {
      setActiveMobileMenu(key);
    }
  };

  const handleSetCurrentTab = (item: MenuItem) => {
    if (item.value === 'movies') {
      setCurrentTab('now_playing');
    } else {
      const validTabs = ['upcoming', 'popular', 'top_rated'];
      if (validTabs.includes(item.value)) {
        setCurrentTab(item.value);
      }
    }
  };

  return items.map((item) => (
    <li key={item.key} className="header__mobileMenu--item">
      <Link href={item.key ? `/${item.key}` : '/'} onClick={() => handleSetCurrentTab(item)}>
        {item.label}
      </Link>{' '}
      {item.children && <FaChevronDown className={`header__mobileMenuIcon ${item.key === activeMobileMenu ? 'header__mobileMenuIcon--active' : ''}`} onClick={() => handleClick(item.key)} />}
      {item.children && item.children.length > 0 && (
        <ul className={`header__mobileSubmenu ${activeMobileMenu === item.key ? 'header__mobileSubmenu--active' : ''}`}>
          {renderMobileMenuItems(item.children, activeMobileMenu, setActiveMobileMenu, setCurrentTab)}
        </ul>
      )}
    </li>
  ));
};

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [activeMobileMenu, setActiveMobileMenu] = useState('');
  const [navScroll, setNavScroll] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const setCurrentTab = useMovieTab((state) => state.setCurrentTab);
  const searchModal = useSearchModal();
  const mobileMenu = useMobileMenu();
  const isMenuOpen = useRef(false);

  // NAVBAR SCROLL TO FIX
  const fixedNav = () => {
    if (window.scrollY >= 65) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  const handleMobileMenu = () => {
    const menu = mobileMenuRef.current;

    if (menu) {
      if (isMenuOpen.current) {
        menu.className = 'header__mobile header__mobile--slideOut';
        mobileMenu.onClose();
        setActiveMobileMenu('');
      } else {
        menu.className = 'header__mobile header__mobile--slideIn';
        mobileMenu.onOpen();
      }
      isMenuOpen.current = !isMenuOpen.current;
    }
  };

  // CLICK OUTIDE TO CLOSE MOBILE MENU
  const handleClickOutside = (event: MouseEvent) => {
    const hamburgerIcon = document.querySelector('.header__hamburger');
    const menu = mobileMenuRef.current;

    if (menu && !menu.contains(event.target as Node) && (!hamburgerIcon || !hamburgerIcon.contains(event.target as Node))) {
      if (isMenuOpen.current) {
        menu.className = 'header__mobile header__mobile--slideOut';
        mobileMenu.onClose();
        setActiveMobileMenu('');
        isMenuOpen.current = false;
      }
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
  });

  return (
    <div className="header">
      <div className={`header__wrapper ${navScroll && 'header__wrapper--fixed'}`}>
        <div className="header__navbar">
          <Link href="/" className="header__logo">
            <Image src={'/images/logo-1.png'} alt={'Movie Base Logo'} width={100} height={28} />
          </Link>
          <div className="header__menu">
            <ul className="header__menu--list">{renderMenuItems(menuItems, activeMenu, setActiveMenu, setCurrentTab)}</ul>
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
            <div className={`header__hamburger ${mobileMenu.isOpen ? 'header__hamburger--active' : ''}`} onClick={handleMobileMenu}>
              <span className="header__hamburger--line"></span>
              <span className="header__hamburger--line"></span>
              <span className="header__hamburger--line"></span>
            </div>
          </div>
        </div>
      </div>
      <>
        <div ref={mobileMenuRef} className="header__mobile">
          <div className="header__mobileMenu">
            <ul className="header__mobileMenu--list">{renderMobileMenuItems(menuItems, activeMobileMenu, setActiveMobileMenu, setCurrentTab)}</ul>
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
        <div className={`header__mobileUnderlay ${mobileMenu.isOpen ? 'header__mobileUnderlay--active' : ''}`}></div>
      </>
    </div>
  );
};

export default Header;
