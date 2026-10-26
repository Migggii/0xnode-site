(function () {
  var reduce = document.body.classList.contains("no-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.requestAnimationFrame = function () { return 0; };
  }

  function mailAddr(el) {
    var user = el.getAttribute("data-u");
    var domain = el.getAttribute("data-d");
    if (!user || !domain) return "";
    return user + "@" + domain;
  }

  function bindMail() {
    document.querySelectorAll("a.js-mail").forEach(function (a) {
      var addr = mailAddr(a);
      if (!addr) return;
      a.href = "mailto:" + addr;
      if (a.getAttribute("data-show") === "1") a.textContent = addr;
    });
    document.querySelectorAll("[data-mail-subject]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        var addr = mailAddr(el);
        if (!addr) return;
        e.preventDefault();
        var subject = el.getAttribute("data-mail-subject") || "Kontakt";
        var body = el.getAttribute("data-mail-body") || "";
        window.location.href = "mailto:" + addr + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMail);
  } else {
    bindMail();
  }
})();

(function () {
  function bindNav() {
    var menu = document.getElementById("mobileMenu");

    function syncMenu() {
      if (!menu) return;
      var open = menu.style.display === "flex";
      document.body.classList.toggle("menu-open", open);
      var burger = document.querySelector(".burger");
      if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (menu) {
      new MutationObserver(syncMenu).observe(menu, { attributes: true, attributeFilter: ["style"] });
      syncMenu();
    }

    document.querySelectorAll(".nav-drop-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var drop = btn.closest(".nav-drop");
        var willOpen = !drop.classList.contains("is-open");
        document.querySelectorAll(".nav-drop.is-open").forEach(function (other) {
          if (other === drop) return;
          var inMobile = !!other.closest("#mobileMenu");
          var menuOpen = menu && menu.style.display === "flex";
          if (inMobile !== menuOpen) return;
          other.classList.remove("is-open");
          var otherBtn = other.querySelector(".nav-drop-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        drop.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".nav-drop.is-open").forEach(function (drop) {
        drop.classList.remove("is-open");
        var btn = drop.querySelector(".nav-drop-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
      if (menu && menu.style.display === "flex") menu.style.display = "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindNav);
  } else {
    bindNav();
  }
})();
