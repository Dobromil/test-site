
import MobileMenu from './modules/mobileMenu'
import RevealOnScroll from './modules/revealOnScroll'
import $ from 'jquery';
import StickyHeader from './modules/stickyHeader'
import Modal from './modules/modal'


var mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), "85%");
new RevealOnScroll($('.testemonial'), "65%");

var stickyHeader = new StickyHeader;
var modal = new Modal;