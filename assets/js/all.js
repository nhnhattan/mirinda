const examps = document.querySelectorAll(".example-item");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture");
const countdownDisplay = document.getElementById("countdown");
const cameraContainer = document.querySelector(".camera-container");
const controls = document.getElementById("controls");
const controlsNext = document.getElementById("controls-next");

const stepHome = document.getElementById("home");
const stepTwo = document.getElementById("step-two");
const stepThree = document.getElementById("step-three");
const stepFinal = document.getElementById("step-final");
const screenPC = document.querySelector(".screen-pc");

const gdMale = document.getElementById("gender-male");
const gdFemale = document.getElementById("gender-female");
const gdMaleWrapper = document.getElementById("gender-wrapper-male");
const gdFemaleWrapper = document.getElementById("gender-wrapper-female");

const startBtn = document.getElementById("startButton");

const loading = document.getElementById("overlay-loading");

let gender = "male";

const lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy",
  callback_loaded: (el) => {
    el.classList.remove("blur");
  },
});

function isDesktop() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
      userAgent
    );
  return !isMobile;
}

if (isDesktop()) {
  stepHome.style.display = "none";
  screenPC.style.display = "block";
  Swal.fire({
    title: "Thông báo!",
    text: "Vui lòng sử dụng điện thoại",
    icon: "error",
    showConfirmButton: false,
    confirmButtonText: "Tôi đã hiểu!",
    didOpen: () => {},
    // willClose: () => {},
    customClass: {
      htmlContainer: "swal-text-large",
      confirmButton: "swal2-confirm-large",
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    showCloseButton: false,
  });
} else {
  // document.querySelector(".home").style.display = "flex";
  // document.querySelector(".screen-pc").style.display = "none";
  // if (Swal.isVisible()) {
  //   Swal.close();
  // }
}

function getToastStyle() {
  return window.innerWidth > 2100 && window.innerHeight > 3000
    ? {
        fontSize: "6rem",
        padding: "4rem",
        maxWidth: "80%",
        textAlign: "center",
      }
    : {
        fontSize: "1.2rem",
        padding: "1rem",
        maxWidth: "80%",
        textAlign: "center",
      };
}

gdMale.addEventListener("click", () => {
  gdFemale.classList.remove("selected");
  gdMale.classList.add("selected");
  gender = "male";
});

gdFemale.addEventListener("click", () => {
  gdFemale.classList.add("selected");
  gdMale.classList.remove("selected");
  gender = "female";
});

startBtn.addEventListener("click", () => {
  if (gender) {
    stepHome.style.display = "none";
    stepTwo.style.display = "flex";
    if (gender === "male") {
      gdMaleWrapper.style.display = "block";
      gdFemaleWrapper.style.display = "none";
    } else {
      gdFemaleWrapper.style.display = "block";
      gdMaleWrapper.style.display = "none";
    }
  } else {
    Toastify({
      text: "Vui lòng chọn mẫu!",
      duration: 1000,
      close: false,
      gravity: "top",
      position: "center",
      backgroundColor:
        "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
      style: getToastStyle(),
    }).showToast();
  }
});

examps.forEach((examp) => {
  examp.addEventListener("click", () => {
    examps.forEach((i) => i.classList.remove("active"));
    examp.classList.add("active");
  });
});

document.getElementById("back2Btn").addEventListener("click", () => {
  stepHome.style.display = "flex";
  stepTwo.style.display = "none";
  gdMaleWrapper.style.display = "none";
  gdFemaleWrapper.style.display = "none";
});

document.getElementById("nextStepTwo").addEventListener("click", () => {
  const activeItem = Array.from(examps).find((examp) =>
    examp.classList.contains("active")
  );
  stepTwo.style.display = "none";
  stepThree.style.display = "flex";
});

async function startFaceDetection() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("frame-overlay");
  const ctx = canvas.getContext("2d");
  const statusText = document.getElementById("status");
  const waitting = document.querySelector(".wait-camera");

  navigator.mediaDevices
    .getUserMedia({ video: {} })
    .then((stream) => {
      video.style.opacity = "1";
      waitting.style.display = "none";
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };
      captureButton.disabled = false;
    })
    .catch((err) => {
      console.error("Không truy cập được webcam:", err);
      statusText.textContent = "Không truy cập được webcam.";
    });
}

startFaceDetection();

captureButton.addEventListener("click", function () {
  captureButton.disabled = true;
  let count = 3;
  countdownDisplay.style.display = "flex";
  countdownDisplay.textContent = count;
  captureButton.disabled = true;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownDisplay.style.display = "none";

      // flashOverlay.classList.add("flash");
      setTimeout(() => {
        // flashOverlay.classList.remove("flash");
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const canvasAspect = canvas.width / canvas.height;
        let cropWidth, cropHeight, sx, sy;
        if (videoWidth / videoHeight > canvasAspect) {
          cropHeight = videoHeight;
          cropWidth = cropHeight * canvasAspect;
          sx = (videoWidth - cropWidth) / 2;
          sy = 0;
        } else {
          cropWidth = videoWidth;
          cropHeight = cropWidth / canvasAspect;
          sx = 0;
          sy = (videoHeight - cropHeight) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        if (localStorage.getItem("rotate") == "hor") {
          context.rotate((rotationAngle * Math.PI) / 180);
        }

        context.drawImage(
          video,
          sx,
          sy,
          cropWidth,
          cropHeight,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
        context.restore();

        const base64Image = canvas.toDataURL("image/png");
        capAI = base64Image.replace("data:image/png;base64,", "");
        // new Promise((resolve, reject) => {
        //   const formImg = new FormData();
        //   formImg.append("Procedure", "Upload_Avatar");
        //   formImg.append("Parameters", capAI);
        //   const bearerToken = getCookie("bearer");
        //   fetch(apiUpload, {
        //     method: "POST",
        //     headers: {
        //       Authorization: `Bearer ${bearerToken}`,
        //     },
        //     body: formImg,
        //   })
        //     .then((response) => {
        //       if (response.ok) {
        //         return response.text();
        //       } else if (response === 401) {
        //         Swal.fire({
        //           icon: "warning",
        //           title: "Phiên đăng nhập hết hạn!",
        //           text: "Vui lòng đăng nhập lại.",
        //           confirmButtonText: "OK",
        //         }).then(() => {
        //           outDated();
        //         });
        //       } else {
        //         throw new Error("Login failed");
        //       }
        //     })
        //     .then((data) => {
        //       resolve(data);
        //       localStorage.setItem(
        //         "img",
        //         `https://game.advietnam.vn/avatars/${
        //           JSON.parse(data).Objects[0].ResponseData
        //         }`
        //       );
        //     })
        //     .catch((error) => {
        //       console.error("Error Create AI:", error);
        //       loading.style.display = "none";
        //       reject(error);
        //     });
        // });
        canvas.src = base64Image;
        canvas.style.display = "block";
        cameraContainer.style.display = "none";
        captureButton.disabled = false;
        controls.style.display = "none";
        controlsNext.style.display = "flex";
        document.getElementById("back3Btn").style.display = "none";
        document.getElementById("captureAgain").style.display = "block";
      }, 500);
    }
  }, 1000);
});

document.getElementById("captureAgain").addEventListener("click", () => {
  cameraContainer.style.display = "flex";
  controls.style.display = "block";
  controlsNext.style.display = "none";
  canvas.src = "";
  canvas.style.display = "none";
  document.getElementById("back3Btn").style.display = "block";
  document.getElementById("captureAgain").style.display = "none";
});

document.getElementById("back3Btn").addEventListener("click", () => {
  stepThree.style.display = "none";
  stepTwo.style.display = "flex";
  if (gender === "male") {
    gdMaleWrapper.style.display = "block";
    gdFemaleWrapper.style.display = "none";
  } else {
    gdMaleWrapper.style.display = "none";
    gdFemaleWrapper.style.display = "block";
  }
});

document.getElementById("createAi").addEventListener("click", () => {
  loading.style.display = "flex";
  setTimeout(() => {
    loading.style.display = "none";
    stepThree.style.display = "none";
    stepFinal.style.display = "flex";
  }, 1000);
});

const shareBtn = document.getElementById("shareBtn");
const drawerShare = document.getElementById("drawerShare");

document.getElementById("shareBtn").addEventListener("click", () => {
  drawerShare.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  const isClickInsideDrawer = drawerShare.contains(event.target);
  const isClickOnButton = shareBtn.contains(event.target);

  if (!isClickInsideDrawer && !isClickOnButton) {
    drawerShare.classList.remove("active");
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  console.log("copy picture url");
});

document.getElementById("shareFbBtn").addEventListener("click", () => {
  console.log("share fb");
});

document.getElementById("shareZlBtn").addEventListener("click", () => {
  console.log("share zalo");
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const widthScreen = window.screen.width * window.devicePixelRatio;
  const heightScreen = window.screen.height * window.devicePixelRatio;

  if (widthScreen >= 2000 && heightScreen >= 3000) {
    console.log("large");
  } else {
    console.log("normal");
  }
});

function returnHome() {
  stepHome.style.display = "flex";
  stepTwo.style.display = "none";
  stepThree.style.display = "none";
  stepFinal.style.display = "none";
  gdMaleWrapper.style.display = "none";
  gdFemaleWrapper.style.display = "none";
  cameraContainer.style.display = "flex";
  controls.style.display = "block";
  controlsNext.style.display = "none";
  canvas.src = "";
  canvas.style.display = "none";
  document.getElementById("back3Btn").style.display = "block";
  document.getElementById("captureAgain").style.display = "none";
  drawerShare.classList.remove("active");
  examps.forEach((examp) => {
    examps.forEach((i) => i.classList.remove("active"));
  });
  examps[0].classList.add("active");
  examps[5].classList.add("active");
  gdFemale.classList.remove("selected");
  gdMale.classList.add("selected");
  gender = "male";
}
