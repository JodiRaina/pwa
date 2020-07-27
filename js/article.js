// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("../service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let btndelete = document.getElementById("delete");
    let base_url = "https://api.football-data.org/v2/";
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';

        // ambil artikel lalu tampilkan
        getSavedArticleById();
    } else {
        var itemSave = getArticleById();
        btndelete.style.display = 'none';
    }
    btnSave.onclick = function () {
        itemSave.then(function (article) {
            saveForLater(article);
        });
        M.toast({
            html: 'Berhasil ditambahkan dalam favorit',
            classes: 'rounded'
        });
    };
    btndelete.onclick = function () {
        deleteById(idParam);
        M.toast({
            html: 'Berhasil dihapus dalam favorit',
            classes: 'rounded'
        });
        window.history.back();
    };
})