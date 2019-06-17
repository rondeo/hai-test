/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 5.0
  Author: PIXINVENT
  Author URL: https://themeforest.net/user/pixinvent/portfolio
================================================================================*/

var loadMenu = function () {
   "use strict";

   // Init collapsible
   $(".collapsible").collapsible({
      accordion: true,
      onOpenStart: function () {
         // Removed open class first and add open at collapsible active
         $(".collapsible > li.open").removeClass("open");
         setTimeout(function () {
            $("#slide-out > li.active > a")
               .parent()
               .addClass("open");
         }, 10);
      }
   });

   // Add open class on init
   $("#slide-out > li.active > a")
      .parent()
      .addClass("open");

   // Open active menu for multi level
   if ($("li.active .collapsible-sub .collapsible").find("a.active").length > 0) {
      $("li.active .collapsible-sub .collapsible")
         .find("a.active")
         .closest("div.collapsible-body")
         .show();
      $("li.active .collapsible-sub .collapsible")
         .find("a.active")
         .closest("div.collapsible-body")
         .closest("li")
         .addClass("active");
   }

   // Auto Scroll menu to the active item
   var position;
   if (
      $(".sidenav-main li a.active")
         .parent("li.active")
         .parent("ul.collapsible-sub").length > 0
   ) {
      position = $(".sidenav-main li a.active")
         .parent("li.active")
         .parent("ul.collapsible-sub")
         .position();
   } else {
      position = $(".sidenav-main li a.active")
         .parent("li.active")
         .position();
   }
   setTimeout(function () {
      if (position !== undefined) {
         $(".sidenav-main ul")
            .stop()
            .animate({ scrollTop: position.top - 300 }, 300);
      }
   }, 300);



   // Expand navigation on mouseenter event
   $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").mouseenter(function () {
      if (!$(".sidenav-main.nav-collapsible").hasClass("nav-lock")) {
         $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
            .addClass("nav-expanded")
            .removeClass("nav-collapsed");
         $("#slide-out > li.close > a")
            .parent()
            .addClass("open")
            .removeClass("close");

         setTimeout(function () {
            // Open only if collapsible have the children
            if ($(".collapsible .open").children().length > 1) {
               $(".collapsible").collapsible("open", $(".collapsible .open").index());
            }
         }, 100);
      }
   });

   // Collapse navigation on mouseleave event
   $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").mouseleave(function () {
      if (!$(".sidenav-main.nav-collapsible").hasClass("nav-lock")) {
         var openLength = $(".collapsible .open").children().length;
         $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
            .addClass("nav-collapsed")
            .removeClass("nav-expanded");
         $("#slide-out > li.open > a")
            .parent()
            .addClass("close")
            .removeClass("open");
         setTimeout(function () {
            // Open only if collapsible have the children
            if (openLength > 1) {
               $(".collapsible").collapsible("close", $(".collapsible .close").index());
            }
         }, 100);
      }
   });

   // Search class for focus
   $(".header-search-input")
      .focus(function () {
         $(this)
            .parent("div")
            .addClass("header-search-wrapper-focus");
      })
      .blur(function () {
         $(this)
            .parent("div")
            .removeClass("header-search-wrapper-focus");
      });



   // Plugin initialization
   $("select").formSelect();

   // Notification, Profile, Translation, Settings Dropdown & Horizontal Dropdown
   $(".notification-button, .profile-button, .translation-button, .dropdown-settings, .dropdown-menu").dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 0,
      coverTrigger: false,
      alignment: "right"
      // stopPropagation: false
   });

   // Materialize scrollSpy
   $(".scrollspy").scrollSpy();

   // Materialize tooltip
   $(".tooltipped").tooltip({
      delay: 50
   });

   //Main Left Sidebar Menu // sidebar-collapse
   $(".sidenav").sidenav({
      edge: "left" // Choose the horizontal origin
   });

   // Perfect Scrollbar
   $("select")
      .not(".disabled")
      .select();

   if ($("#slide-out.leftside-navigation").length > 0) {
      if (!$("#slide-out.leftside-navigation").hasClass("native-scroll")) {
         var ps_leftside_nav = new PerfectScrollbar(".leftside-navigation", {
            wheelSpeed: 2,
            wheelPropagation: false,
            minScrollbarLength: 20
         });
      }
   }

   // Char scroll till bottom of the char content area
   var chatScrollAuto = $("#right-sidebar-nav #slide-out-chat .chat-body .collection");
   if (chatScrollAuto.length > 0) {
      chatScrollAuto[0].scrollTop = chatScrollAuto[0].scrollHeight;
   }

   // Fullscreen
   function toggleFullScreen() {
      if (
         (document.fullScreenElement && document.fullScreenElement !== null) ||
         (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
         if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
         } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
         } else if (document.documentElement.msRequestFullscreen) {
            if (document.msFullscreenElement) {
               document.msExitFullscreen();
            } else {
               document.documentElement.msRequestFullscreen();
            }
         }
      } else {
         if (document.cancelFullScreen) {
            document.cancelFullScreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
         }
      }
   }



   // Detect touch screen and enable scrollbar if necessary
   function is_touch_device() {
      try {
         document.createEvent("TouchEvent");
         return true;
      } catch (e) {
         return false;
      }
   }
   if (is_touch_device()) {
      $("#nav-mobile").css({
         overflow: "auto"
      });
   }
};

$(document).ready(function () {
   loadMenu();

   // Collapsible navigation menu
   $(".nav-collapsible .navbar-toggler").click(function () {
      // Toggle navigation expan and collapse on radio click
      if ($(".sidenav-main").hasClass("nav-expanded") && !$(".sidenav-main").hasClass("nav-lock")) {
         $(".sidenav-main").toggleClass("nav-expanded");
         $("#main").toggleClass("main-full");
      } else {
         $("#main").toggleClass("main-full");
      }
      // Set navigation lock / unlock with radio icon
      if (
         $(this)
            .children()
            .text() == "radio_button_unchecked"
      ) {
         $(this)
            .children()
            .text("radio_button_checked");
         $(".sidenav-main").addClass("nav-lock");
         $(".navbar .nav-collapsible").addClass("sideNav-lock");
      } else {
         $(this)
            .children()
            .text("radio_button_unchecked");
         $(".sidenav-main").removeClass("nav-lock");
         $(".navbar .nav-collapsible").removeClass("sideNav-lock");
      }
   });

   //Search box form small screen
   $(".search-button").click(function (e) {
      if ($(".search-sm").is(":hidden")) {
         $(".search-sm").show();
         $(".search-box-sm").focus();
      } else {
         $(".search-sm").hide();
         $(".search-box-sm").val("");
      }
   });
   $(".search-sm-close").click(function (e) {
      $(".search-sm").hide();
      $(".search-box-sm").val("");
   });

   $(".toggle-fullscreen").click(function () {
      toggleFullScreen();
   });
});
