import $ from 'jquery';
import MobileMenu from './modules/mobileMenu';
import StickyHeader from './modules/stickyHeader';
import RevealOnScroll from './modules/revealOnScroll';
import Modal from './modules/modal';


var mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), "85%");
new RevealOnScroll($('.testemonial'), "65%");

var modal = new Modal;
var stickyHeader = new StickyHeader;