import $ from 'jquery';

class MobileMenu {
  constructor(){
  	this.siteHeader = $('.site-header');
  	this.menuIcon = $('.site-header__menu-icon');
  	this.events();
  	this.menuContent = $('.site-header__menu-content');
  }

  events(){
  	this.menuIcon.click(this.toggleMenu.bind(this));
  }

  toggleMenu(){
  	this.siteHeader.toggleClass('site-header--is-open');
  	this.menuContent.toggleClass('site-header__menu-content--is-visible');
  	this.menuIcon.toggleClass('site-header__menu-icon--close');
  }

}

export default MobileMenu;