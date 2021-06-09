export function menuSelected(path) {
  setTimeout(() => {
    var els = document.getElementsByClassName("menuActiveTest___1sJKn");

    for (var i = 0; i < els.length; i++) {
      var element = els[i];
      var closet_li = element.closest("li");
      var a_href = element
        .closest("li")
        .classList.remove("ant-menu-item-selected");
    }

    for (var i = 0; i < els.length; i++) {
      var element = els[i];
      var closet_li = element.closest("li");

      var a_href = element.closest("li").querySelector("a").href;

      a_href = a_href.replace(window.location.host, "");
      a_href = a_href.replace(window.location.protocol, "");
      a_href = a_href.replace("//", "");

      if (path.indexOf("/tab/students") > -1) {
        if (a_href == "/exam-tab/center") {
          closet_li.classList.add("ant-menu-item-selected");
        }
      } else if (path.indexOf("/tab/examiners") > -1) {
        if (a_href == "/exam-tab/center") {
          closet_li.classList.add("ant-menu-item-selected");
        }
      } else {
        if (path.indexOf("/dashboard/analysis") > -1) {
          if (a_href == "/dashboard/analysis") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }

        if (path.indexOf("/student") > -1) {
          if (a_href == "/student") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("account")) {
          if (a_href == "/accounts/tab") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("transaction")) {
          if (a_href == "/transactions/tab") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("examiner")) {
          if (a_href == "/examiners") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("testcenter")) {
          if (a_href == "/testcenter") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("testCenterDetail")) {
          if (a_href == "/testcenter") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("exams")) {
          if (a_href == "/exams") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("exam-tab")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("testsDetail")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        /* if (path.includes("testsDetail/students")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }*/

        if (path.includes("setting")) {
          if (a_href == "/settingstests/tab") {
            closet_li.classList.add("ant-menu-item-selected");
          }
          if (a_href == "/settingstests/testView") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("settingstests")) {
          if (a_href == "/settingstests/tab") {
            closet_li.classList.add("ant-menu-item-selected");
          }
          if (a_href == "/settingstests/testView") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("transactions")) {
          if (a_href == "/transactions") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
      }
    }
  }, 0);
}

export function menuSelectedOver(path) {
  setTimeout(() => {
    var els = document.getElementsByClassName("menuActiveTest___1sJKn");

    for (var i = 0; i < els.length; i++) {
      var element = els[i];
      var closet_li = element.closest("li");
      var a_href = element.closest("li").querySelector("a").href;
      a_href = a_href.replace(window.location.host, "");
      a_href = a_href.replace(window.location.protocol, "");
      a_href = a_href.replace("//", "");

      element.closest("li").classList.remove("ant-menu-item-active");
      if (window.location.pathname.includes("/dashboard/analysis")) {
        if (a_href == "/dashboard/analysis") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }

      if (window.location.pathname.includes("/studentDetail/tab")) {
        if (a_href == "/student") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }

      /*if (window.location.pathname.includes("/testsDetail/center/")) {
        if (a_href == "/exam-tab/center") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }*/
      /*
      if (window.location.pathname.includes("/testsDetail/center/students")) {
        if (a_href == "/exam-tab/center") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }*/
      if (window.location.pathname.includes("/examinerDetail/tab/")) {
        if (a_href == "/examiners") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }
      if (window.location.pathname.includes("/testCenterDetail/tab/")) {
        if (a_href == "/testcenter") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }

      if (window.location.pathname.includes("/settingstests/testView")) {
        if (a_href == "/settingstests/tab") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }

      if (
        window.location.pathname.includes("/settingstests/test-step-form-edit")
      ) {
        if (a_href == "/settingstests/tab") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }
      if (window.location.pathname.includes("/settingstests/step-form-edit")) {
        if (a_href == "/settingstests/tab") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }
      if (window.location.pathname.includes("/settingstests/test-step-form")) {
        if (a_href == "/settingstests/tab") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }
      if (window.location.pathname.includes("/settingstests/step-form")) {
        if (a_href == "/settingstests/tab") {
          element.closest("li").classList.add("ant-menu-item-selected");
        } else {
          element.closest("li").classList.remove("ant-menu-item-selected");
        }
      }
    }

    for (var i = 0; i < els.length; i++) {
      var element = els[i];
      var closet_li = element.closest("li");

      var a_href = element.closest("li").querySelector("a").href;

      a_href = a_href.replace(window.location.host, "");
      a_href = a_href.replace(window.location.protocol, "");
      a_href = a_href.replace("//", "");

      if (path.indexOf("/tab/students") > -1) {
        if (a_href == "/exams") {
          closet_li.classList.add("ant-menu-item-active");
        }
      } else if (path.indexOf("/tab/examiners") > -1) {
        if (a_href == "/exams") {
          closet_li.classList.add("ant-menu-item-active");
        }
      } else {
        if (path.indexOf("/student") > -1) {
          if (a_href == "/student") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }

        if (path.includes("account")) {
          if (a_href == "/accounts/tab") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("transaction")) {
          if (a_href == "/transactions/tab") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("examiner")) {
          if (a_href == "/examiners") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("testcenter")) {
          if (a_href == "/testcenter") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("testCenterDetail")) {
          if (a_href == "/testcenter") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("exams")) {
          if (a_href == "/exams") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        /*if (path.includes("exam-tab")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-selected");
          }
        }
        if (path.includes("testsDetail")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
         if (path.includes("testsDetail/students")) {
          if (a_href == "/exam-tab/center") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }*/

        if (path.includes("setting")) {
          if (a_href == "/settingstests/tab") {
            closet_li.classList.add("ant-menu-item-active");
          }
          if (a_href == "/settingstests/testView") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("settingstests")) {
          if (a_href == "/settingstests/testView") {
            closet_li.classList.add("ant-menu-item-active");
          }
          if (a_href == "/settingstests/testView") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
        if (path.includes("transactions")) {
          if (a_href == "/transactions") {
            closet_li.classList.add("ant-menu-item-active");
          }
        }
      }
    }
  }, 0);
}
