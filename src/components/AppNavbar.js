import React from "react";
import {Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function AppNavbar() {
  const { t, i18n  } = useTranslation();

  function switchLanguage() {
    const nextLanguage = i18n.language === 'en' ? 'fr' : 'en'; 
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  }


  return (
    <Navbar className="justify-content-between">
      <Nav>
        <Navbar.Brand className="my-auto" href="/">ReviewInsight</Navbar.Brand>
        <Nav.Link className="light-bold text-center" href="/search">{t('search')}</Nav.Link>
        <Nav.Link className="light-bold text-center" href="/contribute">{t('contribute')}</Nav.Link>
        <Nav.Link className="light-bold text-center" href="/my-lists">{t('myLists')}</Nav.Link>
      </Nav>
      <h5 className="my-auto me-3 text-white pointer" onClick={switchLanguage}>{i18n.language === 'en' ? "Français" : "English"}</h5>
    </Navbar>

  );
}


export default AppNavbar;