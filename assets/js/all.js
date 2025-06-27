const apiUpload =
  "https://supermanxmirinda.com/app/api/sql/Authorized_Return_Json";
const apiInit = "https://supermanxmirinda.com/app/api/sql/Public_Return_Json";
const apiAI = "https://supermanxmirinda.com/app/api/ai/Authorized_Ai_Image";

const examps = document.querySelectorAll(".example-item");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture");
const countdownDisplay = document.getElementById("countdown");
const cameraContainer = document.querySelector(".camera-container");
const flashOverlay = document.getElementById("flash");
const controls = document.getElementById("controls");
const controlsNext = document.getElementById("controls-next");

const stepHome = document.getElementById("home");
const stepRule = document.getElementById("step-rule");
const stepTwo = document.getElementById("step-two");
const stepThree = document.getElementById("step-three");
const stepFinal = document.getElementById("step-final");
const screenPC = document.querySelector(".screen-pc");

const gdMale = document.getElementById("gender-male");
const gdFemale = document.getElementById("gender-female");
const gdMaleWrapper = document.getElementById("gender-wrapper-male");
const gdFemaleWrapper = document.getElementById("gender-wrapper-female");

const startBtn = document.getElementById("startButton");
const shareBtn = document.getElementById("shareBtn");
const drawerShare = document.getElementById("drawerShare");
const checkbox = document.getElementById("cb5");
const closeBanner = document.getElementById("closeBannerBtn");

const loading = document.getElementById("overlay-loading");
const fileInput = document.getElementById("fileInput");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const image = document.getElementById("image");
const cropBtn = document.getElementById("cropBtn");
const croppedResult = document.getElementById("croppedResult");

let cropper;
let globalData = {};
let finalCanvas;

let gender = "";
let isChoose;

var bannedWords = {
  Drug: [
    "ỉa",
    "drug",
    "dope",
    "drugs",
    "cigarette",
    "alcohol",
    "contraband",
    "ecstasy",
    "cigar",
    "ma túy",
    "thuốc phiện",
    "cần sa",
    "heroin",
    "meth",
    "chơi đá",
    "chơi cỏ",
    "hít ke",
    "ma túy đá",
    "thuốc lắc",
    "kim tiêm",
    "tẩu",
    "bột trắng",
    "buôn ma túy",
    "nghiện",
    "thuốc lá",
    "xì gà",
    "cần sa",
    "thuốc lào",
    "vape",
    "shisha",
    "bia",
    "cồn",
    "rượu",
    "ngộ độc",
    "say xỉn",
    "lậu",
    "hàng cấm",
    "trái phép",
    "kích thích",
    "đánh thuê",
    "bảo kê",
    "tống tiền",
    "mất kiểm soát",
    "gây gổ",
    "bạo hành",
    "phá phách",
    "sốc thuốc",
    "mất ý thức",
    "bắt cóc",
    "lăng mạ",
    "phỉ báng",
    "mắng nhiếc",
    "chửi rủa",
    "kích động",
    "nguyền rủa",
    "cổ xúy",
    "bạo lực",
    "hận thù",
    "đố kỵ",
    "đố kị",
    "mại dâm",
    "dâm ô",
    "đĩ",
    "điếm",
    "dâm",
    "cờ bạc",
    "cá độ",
    "bài bạc",
    "chơi bài",
    "đánh bài",
    "buôn lậu",
    "buôn người",
    "lừa đảo",
    "tống tiền",
    "defecated",
    "defecate",
    "defecates",
    "dơ bẩn",
    "đi tiểu",
    "đi đại tiện",
    "phóng uế",
    "đồi bại",
    "con cu",
  ],
  Violence: [
    "threatening",
    "terrorizing",
    "denouncing crimes",
    "blood",
    "die",
    "kill",
    "torture",
    "war",
    "fight",
    "bullying",
    "beating",
    "suicide",
    "self - harm",
    "cursing",
    "extremism",
    "death",
    "đâm",
    "chém",
    "đánh",
    "đập",
    "đấm",
    "xô xát",
    "gây sự",
    "giết",
    "hành hung",
    "bóp cổ",
    "tạt axit",
    "chết",
    "trọng thương",
    "tử vong",
    "mất mạng",
    "thảm sát",
    "tự tử",
    "cắt cổ tay",
    "treo cổ",
    "nhảy cầu",
    "đầu độc",
    "đe dọa",
    "khủng bố",
    "uy hiếp",
    "hăm dọa",
    "dọa nạt",
    "giết chóc",
    "sát hại",
    "hành quyết",
    "tàn sát",
    "diệt chủng",
    "tử vong",
    "mất mạng",
    "thiệt mạng",
    "hy sinh",
    "bị thương",
    "thối rữa",
    "hủy diệt",
    "hủy hoại",
    "tự hại",
    "nhảy lầu",
    "chiến tranh",
    "xung đột",
    "giao tranh",
    "thảm sát",
    "tấn công",
  ],
  Weapons: [
    [
      "swords",
      "spears",
      "bayonets",
      "daggers",
      "crossbows",
      "machetes",
      "gun",
      "grenades",
      "artillery",
      "bombs",
      "mines",
      "enemy",
      "Army",
      "boomb",
      "bom nổ",
      "tàn sát",
      "hủy diệt",
      "xâm chiếm",
      "thương vong",
      "mất mát",
      "đau thương",
    ],
  ],
  Illegal: [
    "transgress",
    "robbery",
    "jealousy",
    "prostitution",
    "gambling",
    "bitch",
  ],
  Famous_Brand: [
    "Dior",
    "Chanel",
    "Apple",
    "Samsung",
    "Gucci",
    "Zara",
    "Prada",
    "Adidas",
    "Nike",
    "Hermes",
    "Louis",
    "Vuitton",
    "Burberry",
    "Versace",
    "Céline",
  ],
  App: [
    "Facebook",
    "Zalo",
    "Instagram",
    "Shopee",
    "Lazada",
    "Amazon",
    "Google",
    "Telegram",
    "SnapChat",
  ],
  BodyandSex: [
    "sex",
    "nude",
    "naked",
    "body",
    "dick",
    "dicks",
    "cunt",
    "bitch",
    "sextoy",
    "kiss",
    "fuck",
    "chest",
    "sexy",
    "blowjob",
    "masturbation",
    "jerk off",
    "hand job",
    "orgasm",
    "condom",
    "sperm",
    "dildo",
    "buttocks",
    " ass",
    "clitoris",
    "hickey",
    "semen",
    "raped",
    "penis",
    "cock",
    "dick",
    "anus",
    "boobs",
    "tits",
    "pussy",
    "tounge",
    "vulva",
    "vagina",
    "clitoris",
    "threesome",
    "ám ảnh",
    "trầm cảm",
    "bế tắc",
    "tuyệt vọng",
    "tự hành hạ",
    "cô lập",
    "sỉ nhục",
    "cưỡng hiếp",
    "xâm hại",
    "tình dục",
    "quấy rối",
    "dương vật",
    "loz",
    "lồn",
    "cac",
    "cặc",
    "cc",
    "ép buộc",
    "cưỡng bức",
    "tra tấn",
    "bao cao su",
    "mông",
    "ngực",
    "vú",
    "dú",
    "bú",
    "liếm",
    "mút",
    "cưỡng ép",
    "lạm dụng",
    "loli",
    "shota",
  ],
  People: ["kid", "teenager", "hybrid", "crime"],
  Decry: [
    "trash",
    "rubbish",
    "dirty",
    "ugly",
    "silly",
    "fat",
    "stupid",
    "crazy",
    "disgusting",
  ],
  Sanitary: [
    "bath",
    "shower",
    "pee",
    "poo",
    "poop",
    "shit",
    "toilet",
    "vomit",
    "pees",
  ],
  Ecology: [
    "Snake",
    "ants",
    "bacteria",
    "insects",
    "centipede",
    "lizards",
    "insects",
  ],
  Scary: [
    "ghost",
    "monster",
    "creepy",
    "terrifying",
    "horror",
    "graveyard",
    "suicidal",
    "devil",
    "zombie",
    "blood",
    "máu",
    "đổ máu",
    "loang máu",
    "thấm máu",
    "vết thương",
    "sẹo",
    "trầy xước",
    "dập nát",
    "vỡ đầu",
    "phanh thây",
    "xác chết",
    "thi thể",
    "thối rữa",
  ],
  Sensitive: [
    "religion",
    "politics",
    "nation",
    "nation",
    "ethnicity",
    "territory",
    "money",
    "maternity",
    "reactionary",
    "parties",
    "communism",
    "socialism",
    "god",
    "buddha",
    "coffin",
    "bone",
  ],
  Offensive: [
    "skull",
    "middle finger",
    "three stripes",
    "cross",
    "thumb down",
    "cross finger",
  ],
  Illness: [
    "HIV",
    "Virus",
    "corona",
    "hospital",
    "scabies",
    "bleeding",
    "cancer",
    "chickenpox",
    "ulcer",
    "acne",
    "eczema",
    "ung thư",
    "ghẻ",
    "bệnh",
    "huyết",
    "giang mai",
    "bệnh lậu",
    "sinh dục",
    "viêm nhiễm",
    "nhiễm trùng",
    "zombie",
    "xác sống",
    "qua đời",
    "chết",
    "tuyệt vọng",
    "đau đớn",
    "tử thần",
    "đái",
    "tiểu",
    "không mặc đồ",
    "khỏa thân",
    "nude",
    "cởi",
    "truồng",
    "vệ sinh",
    "đi ỉa",
    "đi nặng",
    "đại tiện",
    "thô tục",
    "chất thải",
    "phân",
    "cứt",
    "ỉa",
    "cặn bã",
    "xả rác",
    "thải",
    "dơ bẩn",
    "hôi thối",
    "ô uế",
    "hôi",
    "bẩn",
    "đần",
    "dốt",
    "dở",
    "hiểm nghèo",
    "thợ săn trẻ em",
    "thợ săn bé trai",
    "thợ săn bé gái",
    "vệ sinh",
  ],
};

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
    text: "Vui lòng sử dụng điện thoại để quét QR",
    icon: "info",
    showConfirmButton: false,
    didOpen: () => {},
    // willClose: () => {},
    customClass: {
      htmlContainer: "swal-text-large",
      confirmButton: "swal2-confirm-large",
    },
    // allowOutsideClick: false,
    // allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    showCloseButton: false,
  });
} else {
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
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
        fontSize: "1rem",
        padding: "1rem",
        maxWidth: "80%",
        textAlign: "center",
      };
}

gdMale.addEventListener("click", () => {
  gdFemale.classList.remove("selected");
  gdMale.classList.add("selected");
  document.querySelector(".gender-male img").src = "./assets/img/male.png";
  document.querySelector(".gender-female img").src =
    "./assets/img/femaleDefault.png";
  gender = "male";
});

gdFemale.addEventListener("click", () => {
  gdFemale.classList.add("selected");
  gdMale.classList.remove("selected");
  document.querySelector(".gender-male img").src =
    "./assets/img/maleDefault.png";
  document.querySelector(".gender-female img").src = "./assets/img/female.png";
  gender = "female";
});

checkbox.addEventListener("change", function () {
  if (this.checked) {
    if (gender) {
      stepRule.style.display = "none";
      stepHome.style.display = "flex";
      document.querySelector(".overlay-lds-ring").style.display = "flex";
      setTimeout(() => {
        stepHome.style.display = "none";
        stepTwo.style.display = "flex";
        document.querySelector(".overlay-lds-ring").style.display = "none";
        setCookie("rule", "true");
      }, 1000);
      if (gender === "male") {
        gdMaleWrapper.style.display = "block";
        gdFemaleWrapper.style.display = "none";
        document.getElementById("genderHeader").src =
          "./assets/img/genderMale.png";
      } else {
        gdFemaleWrapper.style.display = "block";
        gdMaleWrapper.style.display = "none";
        document.getElementById("genderHeader").src =
          "./assets/img/genderFemale.png";
      }
    } else {
      Toastify({
        text: "Bạn chưa chọn giới tính! Vui lòng quay lại!",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor:
          "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
        style: getToastStyle(),
      }).showToast();
      this.checked = false;
    }
  }
});

document.getElementById("ruleBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  stepHome.style.display = "none";
  stepRule.style.display = "flex";
});

startBtn.addEventListener("click", () => {
  if (gender) {
    checkbox.checked = true;
    stepRule.style.display = "none";
    stepHome.style.display = "flex";
    document.querySelector(".overlay-lds-ring").style.display = "flex";
    setTimeout(() => {
      stepHome.style.display = "none";
      stepTwo.style.display = "flex";
      document.querySelector(".overlay-lds-ring").style.display = "none";
      setCookie("rule", "true");
    }, 1000);
    if (gender === "male") {
      gdMaleWrapper.style.display = "block";
      gdFemaleWrapper.style.display = "none";
      document.getElementById("genderHeader").src =
        "./assets/img/genderMale.png";
    } else {
      gdFemaleWrapper.style.display = "block";
      gdMaleWrapper.style.display = "none";
      document.getElementById("genderHeader").src =
        "./assets/img/genderFemale.png";
    }
  } else {
    Toastify({
      text: "Bạn chưa chọn giới tính! Vui lòng quay lại!",
      duration: 1000,
      close: false,
      gravity: "top",
      position: "center",
      backgroundColor:
        "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
      style: getToastStyle(),
    }).showToast();
    stepRule.style.display = "none";
    stepHome.style.display = "flex";
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
  checkbox.checked = false;
  gdFemale.classList.remove("selected");
  gdMale.classList.remove("selected");
  examps.forEach((i) => i.classList.remove("active"));
});

document.getElementById("back1Btn").addEventListener("click", () => {
  stepHome.style.display = "flex";
  stepTwo.style.display = "none";
  stepRule.style.display = "none";
  gdMaleWrapper.style.display = "none";
  gdFemaleWrapper.style.display = "none";
  checkbox.checked = false;
});

document.getElementById("nextStepMaleTwo").addEventListener("click", () => {
  const activeItem = Array.from(examps).find((examp) =>
    examp.classList.contains("active")
  );
  if (!activeItem) {
    Toastify({
      text: "Bạn chưa chọn mẫu!",
      duration: 1000,
      close: false,
      gravity: "top",
      position: "center",
      backgroundColor:
        "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
      style: getToastStyle(),
    }).showToast();
  } else {
    isChoose = activeItem.id;
    stepTwo.style.display = "none";
    stepThree.style.display = "flex";
  }
});

document.getElementById("nextStepFemaleTwo").addEventListener("click", () => {
  const activeItem = Array.from(examps).find((examp) =>
    examp.classList.contains("active")
  );
  if (!activeItem) {
    Toastify({
      text: "Bạn chưa chọn mẫu!",
      duration: 1000,
      close: false,
      gravity: "top",
      position: "center",
      backgroundColor:
        "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
      style: getToastStyle(),
    }).showToast();
  } else {
    isChoose = activeItem.id;
    stepTwo.style.display = "none";
    stepThree.style.display = "flex";
  }
});

async function startFaceDetection() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("frame-overlay");
  const ctx = canvas.getContext("2d");
  const waitting = document.querySelector(".wait-camera");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });

    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.setAttribute("autoplay", true);
    video.setAttribute("muted", true);
    video.setAttribute("disablePictureInPicture", true);
    video.removeAttribute("controls");
    video.controls = false;

    waitting.style.display = "none";
    video.style.opacity = "1";

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    captureButton.disabled = false;
  } catch (err) {
    console.error("Không truy cập được webcam:", err);
  }
}

startFaceDetection();

captureButton.addEventListener("click", function () {
  captureButton.disabled = true;
  let count = 3;
  countdownDisplay.style.display = "flex";
  countdownDisplay.textContent = count;
  captureButton.disabled = true;
  document.getElementById("back3Btn").style.display = "none";

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownDisplay.style.display = "none";

      flashOverlay.classList.add("flash");
      setTimeout(() => {
        flashOverlay.classList.remove("flash");
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

        canvas.src = base64Image;
        canvas.style.display = "block";
        cameraContainer.style.display = "none";
        captureButton.disabled = false;
        controls.style.display = "none";
        controlsNext.style.display = "flex";
        document.getElementById("back3Btn").style.display = "none";
        document.getElementById("captureAgain").style.display = "block";

        new Promise((resolve, reject) => {
          const formImg = new FormData();
          formImg.append("Procedure", "Upload_Avatar");
          formImg.append("Parameters", capAI);
          const bearerToken = getCookie("bearer");
          fetch(apiUpload, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
            body: formImg,
          })
            .then((response) => {
              if (response.ok) {
                return response.text();
              } else if (response === 401) {
              } else {
                throw new Error("Login failed");
              }
            })
            .then((data) => {
              resolve(data);
              localStorage.setItem(
                "img",
                `https://supermanxmirinda.com/avatars/${
                  JSON.parse(data).Objects[0].ResponseData
                }`
              );
              document.getElementById("capture-image").style.display = "flex";
              canvas.src = base64Image;
              canvas.style.display = "block";
              cameraContainer.style.display = "none";
              captureButton.disabled = false;
              controls.style.display = "none";
              controlsNext.style.display = "flex";
              document.getElementById("back3Btn").style.display = "none";
              document.getElementById("captureAgain").style.display = "block";
            })
            .catch((error) => {
              console.error("Error Create AI:", error);
              Toastify({
                text: "Tải ảnh thất bại! Vui lòng chụp lại",
                duration: 1000,
                close: false,
                gravity: "top",
                position: "center",
                backgroundColor:
                  "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
                style: getToastStyle(),
              }).showToast();
              document.getElementById("capture-image").style.display = "none";
              cameraContainer.style.display = "flex";
              controls.style.display = "block";
              controlsNext.style.display = "none";
              canvas.src = "";
              canvas.style.display = "none";
              document.getElementById("back3Btn").style.display = "block";
              document.getElementById("captureAgain").style.display = "none";
              reject(error);
            });
        });
      }, 500);
    }
  }, 1000);
});

document.getElementById("uploadImg").addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);

    image.src = url;
    modal.style.display = "flex";

    if (cropper) {
      cropper.destroy();
    }

    image.onload = () => {
      cropper = new Cropper(image, {
        aspectRatio: 0.692 / 1,
        viewMode: 1,
        autoCropArea: 1,
        dragMode: "move",
        cropBoxResizable: true,
        cropBoxMovable: true,
        ready() {
          const cropBoxData = cropper.getCropBoxData();
          const containerData = cropper.getContainerData();

          const scale = containerData.width / 842;
          cropper.setCropBoxData({
            width: 210.5 * scale,
            height: 304 * scale,
          });
        },
      });
    };
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  image.src = "";
  resetFileInput();
});

cropBtn.addEventListener("click", () => {
  if (!cropper) return;
  loading.style.display = "flex";
  const croppedCanvas = cropper.getCroppedCanvas({
    width: 842,
    height: 1216,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high",
  });

  const targetCanvas = document.getElementById("canvas");
  const ctx = targetCanvas.getContext("2d");

  targetCanvas.width = 842;
  targetCanvas.height = 1216;

  ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  ctx.drawImage(croppedCanvas, 0, 0, 842, 1216);
  const base64Crop = targetCanvas.toDataURL("image/png");
  new Promise((resolve, reject) => {
    const formImg = new FormData();
    formImg.append("Procedure", "Upload_Avatar");
    formImg.append(
      "Parameters",
      base64Crop.replace("data:image/png;base64,", "")
    );
    const bearerToken = getCookie("bearer");
    fetch(apiUpload, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: formImg,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else if (response === 401) {
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        resolve(data);
        localStorage.setItem(
          "img",
          `https://supermanxmirinda.com/avatars/${
            JSON.parse(data).Objects[0].ResponseData
          }`
        );
        document.getElementById("capture-image").style.display = "flex";
        canvas.src = base64Crop;
        canvas.style.transform = "scaleX(1)";
        canvas.style.display = "block";
        cameraContainer.style.display = "none";
        captureButton.disabled = false;
        controls.style.display = "none";
        controlsNext.style.display = "flex";
        document.getElementById("back3Btn").style.display = "none";
        document.getElementById("captureAgain").style.display = "block";
        loading.style.display = "none";
      })
      .catch((error) => {
        console.error("Error Create AI:", error);
        Toastify({
          text: "Tải ảnh thất bại! Vui lòng chụp lại",
          duration: 1000,
          close: false,
          gravity: "top",
          position: "center",
          backgroundColor:
            "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
          style: getToastStyle(),
        }).showToast();
        cameraContainer.style.display = "flex";
        controls.style.display = "block";
        controlsNext.style.display = "none";
        canvas.src = "";
        canvas.style.display = "none";
        document.getElementById("back3Btn").style.display = "block";
        document.getElementById("captureAgain").style.display = "none";
        reject(error);
      });
  });
  canvas.src = base64Crop;
  canvas.style.transform = "scaleX(1)";
  canvas.style.display = "block";
  cameraContainer.style.display = "none";
  captureButton.disabled = false;
  controls.style.display = "none";
  controlsNext.style.display = "flex";
  document.getElementById("back3Btn").style.display = "none";
  document.getElementById("captureAgain").style.display = "block";
  loading.style.display = "none";
  modal.style.display = "none";
  cropper.destroy();
  cropper = null;
  image.src = "";

  resetFileInput();
});

function resetFileInput() {
  fileInput.value = "";
}

document.getElementById("captureAgain").addEventListener("click", () => {
  cameraContainer.style.display = "flex";
  controls.style.display = "block";
  controlsNext.style.display = "none";
  canvas.src = "";
  canvas.style.display = "none";
  document.getElementById("back3Btn").style.display = "block";
  document.getElementById("captureAgain").style.display = "none";
  canvas.style.transform = "scaleX(-1)";
  document.getElementById("capture-image").style.display = "none";
});

document.getElementById("back3Btn").addEventListener("click", () => {
  stepThree.style.display = "none";
  stepTwo.style.display = "flex";
  if (gender === "male") {
    gdMaleWrapper.style.display = "block";
    gdFemaleWrapper.style.display = "none";
  } else if (gender === "female") {
    gdMaleWrapper.style.display = "none";
    gdFemaleWrapper.style.display = "block";
  }
});

function containsBannedWord(input, bannedWords) {
  const normalizedInput = input.toLowerCase();
  for (const category in bannedWords) {
    const words = Array.isArray(bannedWords[category][0])
      ? bannedWords[category].flat()
      : bannedWords[category];
    for (const word of words) {
      if (normalizedInput.includes(word.toLowerCase())) {
        return { found: true, category, word };
      }
    }
  }
  return { found: false };
}

const overlay = document.getElementById("drawerOverlay");
const drawer = document.getElementById("drawerPanel");

document.getElementById("addName").addEventListener("click", () => {
  overlay.classList.add("active");

  setTimeout(() => {
    drawer.style.bottom = "0";
  }, 200);
});

function closeDrawer() {
  drawer.style.bottom = "-100%";
  setTimeout(() => {
    overlay.classList.remove("active");
  }, 300);
}

document.getElementById("createAi").addEventListener("click", () => {
  const input = document.getElementById("nameInput").value.trim();
  const resultElement = document.getElementById("result");
  const charCount = input.length;

  if (!input) {
    Toastify({
      text: "Không được để trống tên!",
      duration: 1000,
      close: false,
      gravity: "top",
      position: "center",
      backgroundColor:
        "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
      style: getToastStyle(),
    }).showToast();
  } else {
    if (charCount > 15) {
      resultElement.innerHTML = `⚠️ Nội dung quá dài. Vui lòng rút gọn lại.`;
      resultElement.style.color = "orange";
      resultElement.style.display = "block";
      return;
    }

    const result = containsBannedWord(input, bannedWords);

    if (result.found) {
      resultElement.innerHTML = `🚫 Phát hiện từ cấm "<b>${result.word}</b>"! Vui lòng nhập lại"`;
      resultElement.style.color = "red";
    } else {
      resultElement.innerHTML = "";
      localStorage.setItem("name", document.getElementById("nameInput").value);
      closeDrawer();
      Toastify({
        text: "Thêm tên thành công!",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        style: getToastStyle(),
      }).showToast();
      loading.style.display = "flex";
      document.getElementById("name-wrapper").textContent = String(
        localStorage.getItem("name")
      );
      switch (isChoose) {
        case "male01":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/male01.png"
          );
          break;
        case "male02":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/male02.png"
          );
          break;
        case "male03":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/male03.png"
          );
          break;
        case "female01":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/female01.png"
          );
          break;
        case "female02":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/female02.png"
          );
          break;
        case "female03":
          uploadFaceSwap(
            "https://supermanxmirinda.com/images/ai/face_swap/female03.png"
          );
          break;
        default:
          break;
      }
    }
    resultElement.style.display = "block";
  }
});

const inputField = document.getElementById("nameInput");
inputField.addEventListener("input", function () {
  document.getElementById("result").style.display = "none";
});

function uploadFaceSwap(ex) {
  return new Promise((resolve, reject) => {
    const formUpload = new FormData();
    formUpload.append("Procedure", "Face_Swap");
    formUpload.append(
      "Parameters",
      JSON.stringify({
        GamerCode: getCookie("gamer"),
        SourceImageUrl: localStorage.getItem("img"),
        TargetImageUrl: ex,
      })
    );
    const bearerToken = getCookie("bearer");

    fetch(apiAI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: formUpload,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Login failed or unauthorized");
        }
      })
      .then((data) => {
        const responseData = JSON.parse(data).Objects[0].ResponseData;

        if (!responseData) {
          loading.style.display = "none";
          Toastify({
            text: "Tạo ảnh thất bại! Vui lòng thử lại",
            duration: 1000,
            close: false,
            gravity: "top",
            position: "center",
            backgroundColor:
              "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
            style: getToastStyle(),
          }).showToast();
          cameraContainer.style.display = "flex";
          controls.style.display = "block";
          controlsNext.style.display = "none";
          canvas.src = "";
          canvas.style.display = "none";
          document.getElementById("back3Btn").style.display = "block";
          document.getElementById("captureAgain").style.display = "none";
          reject("Empty response");
        } else {
          document.getElementById(
            "imageAi"
          ).src = `https://supermanxmirinda.com/images-ai/${responseData}`;
          if (window.innerWidth >= 769) {
            fitty("#name-wrapper", {
              minSize: 24,
              maxSize: 35,
              multiLine: false,
            });
          } else {
            fitty("#name-wrapper", {
              minSize: 12,
              maxSize: 23,
              multiLine: false,
            });
          }
          setTimeout(() => {
            const currentFontSize = parseFloat(
              window.getComputedStyle(document.getElementById("name-wrapper"))
                .fontSize
            );
            if (currentFontSize < 19) {
                document.querySelector(".name-wrapper").style.top = "90%";
              } else {
                document.querySelector(".name-wrapper").style.top = "88%";
              }
            screenshot();
          }, 300);

          loading.style.display = "none";
          Toastify({
            text: "Tạo ảnh thành công!",
            duration: 1000,
            close: false,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            style: getToastStyle(),
          }).showToast();
          stepThree.style.display = "none";
          stepFinal.style.display = "flex";
          resolve();
        }
      })
      .catch((error) => {
        console.error("Error Create AI:", error);
        loading.style.display = "none";
        cameraContainer.style.display = "flex";
        controls.style.display = "block";
        controlsNext.style.display = "none";
        canvas.src = "";
        canvas.style.display = "none";
        document.getElementById("back3Btn").style.display = "block";
        document.getElementById("captureAgain").style.display = "none";
        Toastify({
          text: "Tạo ảnh thất bại! Vui lòng thử lại",
          duration: 1000,
          close: false,
          gravity: "top",
          position: "center",
          backgroundColor:
            "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
          style: getToastStyle(),
        }).showToast();
        reject(error);
      });
  });
}

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

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeDrawer();
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const imageUrl = localStorage.getItem("lastImg");
  navigator.clipboard
    .writeText(imageUrl)
    .then(() =>
      Toastify({
        text: "Sao chép thành công!",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        style: getToastStyle(),
      }).showToast()
    )
    .catch((err) =>
      Toastify({
        text: "Sao chép thất bại!",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor:
          "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
        style: getToastStyle(),
      }).showToast()
    );
  // const imageUrl = localStorage.getItem("lastImg");
  // navigator.clipboard
  //   .writeText(imageUrl)
  //   .then(() =>
  //     Toastify({
  //       text: "Sao chép thành công!",
  //       duration: 1000,
  //       close: false,
  //       gravity: "top",
  //       position: "center",
  //       backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  //       style: getToastStyle(),
  //     }).showToast()
  //   )
  //   .catch((err) =>
  //     Toastify({
  //       text: "Sao chép thất bại!",
  //       duration: 1000,
  //       close: false,
  //       gravity: "top",
  //       position: "center",
  //       backgroundColor:
  //         "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
  //       style: getToastStyle(),
  //     }).showToast()
  //   );
});

document.getElementById("shareFbBtn").addEventListener("click", () => {
  const sharedUrl = localStorage.getItem("lastImg");
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    sharedUrl
  )}`;
  window.open(facebookShareUrl, "_blank");
  navigator.clipboard
    .writeText(sharedUrl)
    .then(() =>
      Toastify({
        text: "Chia sẻ ảnh thành công!",
        duration: 3000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        style: getToastStyle(),
      }).showToast()
    )
    .catch((err) =>
      Toastify({
        text: "Chia sẻ ảnh thất bại!",
        duration: 1000,
        close: false,
        gravity: "top",
        position: "center",
        backgroundColor:
          "linear-gradient(to right,rgb(255, 40, 40),rgb(255, 74, 74))",
        style: getToastStyle(),
      }).showToast()
    );
});

document.getElementById("shareZlBtn").addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Trang chia sẻ",
        text: "Hãy xem thử nội dung này nhé!",
        url: localStorage.getItem("lastImg"),
      })
      .then(() => console.log("Chia sẻ thành công"))
      .catch((error) => console.log("Lỗi chia sẻ:", error));
  } else {
    alert("Trình duyệt không hỗ trợ chia sẻ trực tiếp.");
  }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const widthScreen = window.screen.width * window.devicePixelRatio;
  const heightScreen = window.screen.height * window.devicePixelRatio;
  const img = document.getElementById("imageAi");

  if (widthScreen >= 2000 && heightScreen >= 3000) {
    console.log("large");
  } else {
    fetch(localStorage.getItem("lastImg"))
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, "Final.jpg");
        setTimeout(() => {
          fadeIn(document.getElementById("overlay-banner"), 200);
        }, 2000);
      })
      .catch((err) => {
        console.error("Lỗi khi tải ảnh:", err);
      });
  }
});

closeBanner.addEventListener("click", () => {
  fadeOut(document.getElementById("overlay-banner"), 200);
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
  gdFemale.classList.remove("selected");
  gdMale.classList.remove("selected");
  document.querySelector(".gender-male img").src =
    "./assets/img/maleDefault.png";
  document.querySelector(".gender-female img").src =
    "./assets/img/femaleDefault.png";
  gender = "";
  checkbox.checked = false;
  document.getElementById("nameInput").value = "";
}

function screenshot() {
  const node = document.getElementById("image-final");

  const nameWrapper = document.querySelector("#name-wrapper span");
  document.querySelector(".name-wrapper").style.overflow = "visible";

  if (nameWrapper) {
    const scale = parseFloat(
      getComputedStyle(nameWrapper)
        .transform.split(",")[0]
        .replace("matrix(", "")
    );
    const fontSize = parseFloat(getComputedStyle(nameWrapper).fontSize);
    const actualFontSize = fontSize * scale;

    const parent = nameWrapper.parentElement;
    parent.style.fontSize = actualFontSize + "px";
    parent.textContent = nameWrapper.textContent;
  }

  const img = document.querySelector(".image-final img");
  const originalBorder = img.style.border;
  img.style.border = "none";

  html2canvas(node, {
    scale: 3,
    useCORS: true,
    logging: false,
  })
    .then((canvasOriginal) => {
      img.style.border = originalBorder;

      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = 1000;
      resizedCanvas.height = 1200;

      const ctx = resizedCanvas.getContext("2d");
      ctx.drawImage(
        canvasOriginal,
        0,
        0,
        canvasOriginal.width,
        canvasOriginal.height,
        0,
        0,
        resizedCanvas.width,
        resizedCanvas.height
      );

      let base64 = resizedCanvas.toDataURL("image/jpeg", 0.85);
      new Promise((resolve, reject) => {
        const formImg = new FormData();
        formImg.append("Procedure", "Upload_Avatar");
        formImg.append(
          "Parameters",
          base64.replace("data:image/jpeg;base64,", "")
        );
        const bearerToken = getCookie("bearer");
        fetch(apiUpload, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          body: formImg,
        })
          .then((response) => {
            if (response.ok) {
              return response.text();
            } else if (response === 401) {
            }
          })
          .then((data) => {
            resolve(data);
            localStorage.setItem(
              "lastImg",
              `https://supermanxmirinda.com/avatars/${
                JSON.parse(data).Objects[0].ResponseData
              }`
            );
          })
          .catch((error) => {
            console.error("Error Create AI:", error);
            reject(error);
          });
      });

      finalCanvas = resizedCanvas;
    })
    .catch((err) => {
      console.error("Lỗi:", err);
    });
}

function fadeOut(element, duration) {
  let opacity = 1;
  const interval = 50;
  const gap = interval / duration;

  const fading = setInterval(() => {
    opacity -= gap;
    if (opacity <= 0) {
      opacity = 0;
      clearInterval(fading);
      element.style.display = "none";
    }
    element.style.opacity = opacity;
  }, interval);
}

function fadeIn(element, duration) {
  let opacity = 0;
  const interval = 50;
  const gap = interval / duration;

  element.style.opacity = opacity;
  element.style.display = "flex";

  const fading = setInterval(() => {
    opacity += gap;
    if (opacity >= 1) {
      opacity = 1;
      clearInterval(fading);
    }
    element.style.opacity = opacity;
  }, interval);
}
