(function () {
  var reduce = document.body.classList.contains("no-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.requestAnimationFrame = function () { return 0; };
  }

  function bindMail() {
    var user = "admin";
    var domain = "0xnode.ch";
    var addr = user + "@" + domain;
    document.querySelectorAll("a.js-mail").forEach(function (a) {
      a.href = "mailto:" + addr;
      if (a.getAttribute("data-show") === "1") a.textContent = addr;
    });
    document.querySelectorAll("[data-mail-subject]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var subject = el.getAttribute("data-mail-subject") || "Kontakt";
        var body = el.getAttribute("data-mail-body") || "";
        window.location.href = "mailto:" + user + "@" + domain + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMail);
  } else {
    bindMail();
  }
})();
