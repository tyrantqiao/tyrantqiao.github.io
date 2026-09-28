(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var article = document.querySelector(".article-entry");
    var image = article && article.querySelector("img.kroki");
    if (!image || image.closest(".tubatu-workflow-viewer")) return;

    var viewer = document.createElement("section");
    viewer.className = "tubatu-workflow-viewer";
    viewer.setAttribute("aria-label", "AI 导购完整 workflow 可缩放流程图");

    var toolbar = document.createElement("div");
    toolbar.className = "tubatu-workflow-toolbar";
    toolbar.innerHTML = [
      '<span class="tubatu-workflow-title">AI 导购完整 workflow：拖动画布查看细节，或用按钮切换缩放</span>',
      '<span class="tubatu-workflow-actions">',
      '<button type="button" data-workflow-action="zoom-out" aria-label="缩小流程图">-</button>',
      '<span class="tubatu-workflow-scale" aria-live="polite">100%</span>',
      '<button type="button" data-workflow-action="zoom-in" aria-label="放大流程图">+</button>',
      '<button type="button" data-workflow-action="fit">适屏</button>',
      '<button type="button" data-workflow-action="reset">原始</button>',
      "</span>"
    ].join("");

    var viewport = document.createElement("div");
    viewport.className = "tubatu-workflow-viewport";
    viewport.setAttribute("tabindex", "0");
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-label", "可滚动流程图区域");

    var stage = document.createElement("div");
    stage.className = "tubatu-workflow-stage";

    var hint = document.createElement("p");
    hint.className = "tubatu-workflow-hint";
    hint.textContent = "默认使用清晰阅读尺寸展示；横向拖动或滚动可以查看完整链路。";

    image.parentNode.insertBefore(viewer, image);
    stage.appendChild(image);
    viewport.appendChild(stage);
    viewer.appendChild(toolbar);
    viewer.appendChild(viewport);
    viewer.appendChild(hint);

    var scaleText = viewer.querySelector(".tubatu-workflow-scale");
    var baseWidth = 1480;
    var minScale = 0.45;
    var maxScale = 2;
    var scale = 1;

    function setScale(nextScale) {
      var previousWidth = baseWidth * scale;
      var centerX = viewport.scrollLeft + viewport.clientWidth / 2;
      scale = Math.max(minScale, Math.min(maxScale, nextScale));
      image.style.width = Math.round(baseWidth * scale) + "px";
      scaleText.textContent = Math.round(scale * 100) + "%";

      var nextWidth = baseWidth * scale;
      if (previousWidth > 0) {
        viewport.scrollLeft = (centerX / previousWidth) * nextWidth - viewport.clientWidth / 2;
      }
    }

    function fitToViewport() {
      var available = Math.max(320, viewport.clientWidth - 56);
      setScale(Math.max(minScale, Math.min(1, available / baseWidth)));
      viewport.scrollLeft = 0;
    }

    function primeSize() {
      baseWidth = Math.max(1480, image.naturalWidth || image.clientWidth || 0);
      setScale(window.innerWidth < 720 ? 0.68 : 1);
    }

    if (image.complete) {
      primeSize();
    } else {
      image.addEventListener("load", primeSize, { once: true });
    }

    toolbar.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-workflow-action]");
      if (!button) return;
      var action = button.getAttribute("data-workflow-action");
      if (action === "zoom-in") setScale(scale + 0.15);
      if (action === "zoom-out") setScale(scale - 0.15);
      if (action === "fit") fitToViewport();
      if (action === "reset") setScale(1);
    });

    var dragging = false;
    var startX = 0;
    var startY = 0;
    var scrollLeft = 0;
    var scrollTop = 0;

    viewport.addEventListener("pointerdown", function (event) {
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      scrollLeft = viewport.scrollLeft;
      scrollTop = viewport.scrollTop;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      event.preventDefault();
      viewport.scrollLeft = scrollLeft - (event.clientX - startX);
      viewport.scrollTop = scrollTop - (event.clientY - startY);
    });

    function endDrag(event) {
      dragging = false;
      viewport.classList.remove("is-dragging");
      if (event && viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
  });
})();
