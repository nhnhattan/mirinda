const apiRef = "https://game.advietnam.vn/app/api/sql/Public_Return_Json";
const apiLogin = "https://game.advietnam.vn/app/api/Token/TokenCustomer";
const apiDetail = "https://game.advietnam.vn/app/api/sql/Customer_Return_Json";

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

function getUserDetail(bearer) {
  new Promise(() => {
    const formDetail = new FormData();
    formDetail.append("Procedure", "Gamer_Select_Detail");
    formDetail.append("Parameters", {});
    fetch(apiDetail, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
      body: formDetail,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Get Detail failed");
        }
      })
      .then((data) => {
        setCookie("gamer", JSON.parse(data.Objects[0].Data)[0].GamerCode);
      })
      .catch((error) => {
        console.error("Error Get Detail:", error);
      });
  });
}

async function fetchAndUpdateCookie() {
  try {
    new Promise(() => {
      const requestData = {
        CustomerEmail: "test@gmail.com",
        CustomerPassword: "123",
        CustomerFacebookId: "",
        CustomerGoogleId: "",
      };
      fetch(apiLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          if (!data) {
            throw new Error("Login failed");
          } else {
            new Promise(() => {
              setCookie("bearer", data);
              getUserDetail(data);
            });
          }
        })
        .catch((error) => {
          console.error("Error Login:", error);
          loading.style.display = "none";
        });
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchAndUpdateCookie();

setInterval(fetchAndUpdateCookie, 10 * 60 * 1000);
