document.addEventListener("DOMContentLoaded", () => {
  const overlayGraph = document.getElementById("graph-overlay__graph");
  const loadingOverlay = document.getElementById("loading-overlay");
  const intrvwHdrs = document.querySelectorAll(
    ".title__hgroup__header--interview"
  );
  const graphOverlay = document.getElementById("graph-overlay");
  const interviewCloseBtn = document.getElementById("interview-close-btn");
  const interviewParagraphs = document.querySelectorAll(
    ".interview__segment__column__p"
  );

  const imgIcons = document.querySelectorAll(
    ".interview__segment__column__img-icon"
  );
  const imgPreviewContainer = document.getElementById("img-preview");
  const imgPreviewImage = document.getElementById("img-preview__img");
  const imgPreviewImageContainer = document.getElementById(
    "img-preview__img--container"
  );

  const dotCount = 500;
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("span");
    const scaleRatio = Math.random();
    /*     const r1 = Math.random();
    const r2 = Math.random();
    const x = r1 < 0.2 ? Math.random() * 100 : Math.random() * 50 + 25;
    const y = r2 < 0.5 ? Math.random() * 100 : Math.random() * 50 + 25; */
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dot.className = "img-preview__dot";
    dot.setAttribute("data-scale", scaleRatio);
    dot.style.top = `${y}%`;
    dot.style.left = `${x}%`;
    imgPreviewImageContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".img-preview__dot");

  imgIcons.forEach((imgIcon) => {
    const glyphs = [".", ",", "&#8152;", ";", ":", "-", "&#894;"];
    const r1 = Math.floor(Math.random() * glyphs.length);
    let r2 = Math.floor(Math.random() * glyphs.length);
    r2 = r2 === r1 ? (r2 + 1) % glyphs.length : r2;
    imgIcon.innerHTML = "";
    imgIcon.innerHTML = `${glyphs[r1]} ${glyphs[r2]}`;

    imgIcon.addEventListener("click", (event) => {
      const source = event.target.getAttribute("data-src");
      console.log(source);
      imgPreviewImage.src = source;
      imgPreviewContainer.classList.add("img-preview--active");
      dots.forEach((dot) => {
        dot.classList.add("img-preview__dot--active");
      });
    });
  });

  imgPreviewContainer.addEventListener("click", (event) => {
    imgPreviewContainer.classList.remove("img-preview--active");
    dots.forEach((dot) => {
      dot.classList.remove("img-preview__dot--active");
    });
  });

  setTimeout(() => {
    loadingOverlay.style.opacity = 0;
    overlayGraph.classList.remove("graph-overlay__graph--loading");
    document.body.classList.remove("overflow--none");
  }, 1500);

  setTimeout(() => {
    document.querySelectorAll(".graph-overlay__definition").forEach((def) => {
      def.style.opacity = "1";
    });
  }, 2000);

  const footerAppear = () => {
    const homeFooter = document.getElementById("footer--home");
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrolledAmount = window.scrollY;
    const graphOverlay = document.getElementById("graph-overlay");
    const footerHeight = homeFooter.clientHeight;
    console.log(footerHeight);

    if (scrolledAmount + windowHeight >= bodyHeight - windowHeight / 8) {
      graphOverlay.style.height = `calc(100vh - ${footerHeight}px)`;
      homeFooter.style.transform = `translateY(0)`;
    } else {
      homeFooter.style.transform = "translateY(100%)";
      graphOverlay.style.height = "";
    }
  };

  window.addEventListener("scroll", footerAppear);
  window.addEventListener("resize", footerAppear);

  intrvwHdrs.forEach((header) => {
    header.addEventListener("click", (event) => {
      const hdrId = event.target.dataset.interview;
      const interview = document.getElementById(hdrId);
      const interviewWrapper = document.getElementById(`${hdrId}-wrapper`);
      const hGroups = document.querySelectorAll(".title__hgroup");

      interviewWrapper.style.display = "block";
      interview.classList.add("visible");
      interview.scrollTop = 0;
      graphOverlay.style.filter = "blur(10px)";
      document.body.style.overflow = "hidden";
      interviewCloseBtn.classList.add("visible");
      setTimeout(() => {
        hGroups.forEach((group) => {
          group.style.display = "none";
        });
      }, 500);

      interviewCloseBtn.addEventListener(
        "click",
        () => {
          hGroups.forEach((group) => {
            group.style.display = "flex";
          });
          interview.classList.remove("visible");
          graphOverlay.style.filter = "";
          document.body.style.overflow = "";
          interviewCloseBtn.classList.remove("visible");
          setTimeout(() => {
            interviewWrapper.style.display = "";
          }, 500);
        },
        { once: true }
      );
    });
  });

  interviewParagraphs.forEach((p) => {
    if (p.children.length === 0) {
      const text = p.innerHTML;
      const words = text.split(/(\s+)/);

      const insertCount = Math.floor((Math.random() * words.length) / 5);

      for (let i = 0; i < insertCount; i++) {
        const pos = Math.floor(Math.random() * words.length);
        const span = document.createElement("span");
        span.className = "p--float-space";
        span.style.float = Math.random() < 0.5 ? "left" : "right";
        words.splice(pos, 0, span.outerHTML);
      }

      p.innerHTML = words.join("");
    }
  });

  const mouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const floatSpc = document.querySelectorAll(".p--float-space");
    const dia = (mouseY / innerHeight) * 1.8;
    floatSpc.forEach((element) => {
      element.style.width = `${dia}rem`;
      element.style.height = `${dia}rem`;
    });

    dots.forEach((dot) => {
      const scaleRatio = dot.getAttribute("data-scale");
      const dotDia = (mouseX / innerWidth) * scaleRatio;
      dot.style.height = `${dotDia}rem`;
      dot.style.width = `${dotDia}rem`;
    });

    const thck = (mouseX / innerWidth) * 1000 + 50;
    const grow = (mouseY / innerHeight) * 1000;
    document.body.style.fontVariationSettings = `"THCK" ${thck}, "grow" ${grow}`;
  };
  window.addEventListener("mousemove", mouseMove);
});
