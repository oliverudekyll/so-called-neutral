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

    console.log(scrolledAmount);
    console.log(bodyHeight);

    if (scrolledAmount + windowHeight >= bodyHeight - windowHeight / 4) {
      homeFooter.style.transform = `translateY(0)`;
      /* homeFooter.style.opacity = 1; */
    } else {
      homeFooter.style.transform = "translateY(100%)";
      /* homeFooter.style.opacity = ""; */
    }
  };

  window.addEventListener("scroll", footerAppear);

  intrvwHdrs.forEach((header) => {
    header.addEventListener("click", (event) => {
      const hdrId = event.target.dataset.interview;
      const interview = document.getElementById(hdrId);
      const interviewWrapper = document.getElementById(`${hdrId}-wrapper`);

      interviewWrapper.style.display = "block";
      interview.classList.add("visible");
      interview.scrollTop = 0;
      graphOverlay.style.filter = "blur(10px)";
      document.body.style.overflow = "hidden";
      interviewCloseBtn.classList.add("visible");

      interviewCloseBtn.addEventListener(
        "click",
        () => {
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
    const text = p.innerText;
    const words = text.split(" ");
    const insertCount = Math.floor((Math.random() * words.length) / 5);

    for (let i = 0; i < insertCount; i++) {
      const pos = Math.floor(Math.random() * words.length);
      const floatDir = Math.random() < 0.5 ? "inline-start" : "inline-end";
      const span = document.createElement("span");
      span.className = "p--float-space";
      span.style.float = floatDir;
      words.splice(pos, 0, span.outerHTML);
    }

    p.innerHTML = words.join(" ");
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

    const thck = (mouseX / innerWidth) * 1000 + 50;
    const grow = (mouseY / innerHeight) * 1000;
    document.body.style.fontVariationSettings = `"THCK" ${thck}, "grow" ${grow}`;
  };

  window.addEventListener("mousemove", mouseMove);
});
