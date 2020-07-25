let base_url = "https://api.football-data.org/v2/";
let token = "8daec90e04444ae09a51c40ed28b5961";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function team(teams, crestUrl) {
  let teamsHTML = `
    <div class="card">
      <a href="./article.html?id=${teams.id}">
        <img class="card-img-top" style="width:30%;display: block;margin: 0 auto;"src="${crestUrl}">
        <div class="card-body">
          <h5 class="card-title" align="center"><strong>${teams.name}</strong></h5>
        </div>
    </div>
  `;
  return teamsHTML;
}

function articleByid(data) {
  let article = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${data.crestUrl}" />
        </div>
        <div class="card-content">
          <span class="card-title text-center">${data.name}</span>
          <ul>
          <li>${data.address}</li>
          <li>${data.phone}</li>
          <li>${data.website}</li>
          <li>${data.email}</li>
          <ul>
        </div>
      </div>
    `;
  return article;
}

function funstandings(standing) {
  let standingsHTML = `
  <tr>
    <td>${standing.position}</td>
    <td>${standing.team.name}</td>
    <td>${standing.playedGames}</td>
    <td>${standing.won}</td>
    <td>${standing.draw}</td>
    <td>${standing.lost}</td>
    <td>${standing.points}</td>
  </tr>
    `;
  return standingsHTML;
}
// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          let teams = data.teams;

          teams.forEach(function (teams) {
            let crestUrl = teams.crestUrl;
            if (crestUrl === null || crestUrl === undefined || crestUrl === "") {
              crestUrl = "/images/team_img_not_found.jpg";
            } else {
              crestUrl = crestUrl.replace(/^http:\/\//i, "https://");
            }
            teamsHTML += team(teams, crestUrl);
            document.getElementById("articles").innerHTML = teamsHTML;
          });
        });
      }
    });
  }

  fetch(base_url + "teams", {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let teamsHTML = "";
      let teams = data.teams;
      // console.log(teams);
      teams.forEach(function (teams) {
        let crestUrl = teams.crestUrl;
        if (crestUrl === null || crestUrl === undefined || crestUrl === "") {
          crestUrl = "/images/team_img_not_found.jpg";
        } else {
          crestUrl = crestUrl.replace(/^http:\/\//i, "https://");
        }
        teamsHTML += team(teams, crestUrl);
      });
      document.getElementById("articles").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let articleHTML = articleByid(data);
            document.getElementById("body-content").innerHTML = articleHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then(status)
      .then(json)
      .then(function (data) {
        let articleHTML = articleByid(data);
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    let articlesHTML = "";
    articles.forEach(function (teams) {
      articlesHTML += `
      <div class="card">
      <a href="./article.html?id=${teams.id}&saved=true">
        <img class="card-img-top" style="width:50%;display: block;margin: 0 auto;"src="${teams.crestUrl}">
        <div class="card-body">
          <h5 class="card-title" align="center"><strong>${teams.name}</strong></h5>
        </div
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("savedarticles").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = parseInt(urlParams.get("id"));
  getById(idParam).then(function (data) {
    let articleHTML = articleByid(data);
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function (response) {
      if (response) {
        response.json().then(function (res) {
          let standingsHTML = "";
          let standings = res.standings[0].table;
          standings.forEach(function (standing) {
            standingsHTML += funstandings(standing);;
            document.getElementById("standings").innerHTML = standingsHTML;
          });
        });
      }
    });
  }

  fetch(base_url + "competitions/2021/standings", {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then(status)
    .then(json)
    .then(function (res) {
      let standingsHTML = "";
      let standings = res.standings[0].table;
      standings.forEach(function (standing) {
        standingsHTML += funstandings(standing);
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}