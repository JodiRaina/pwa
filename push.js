var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPnEtxcP-MK4N02OUk3vPAOgtHiIhVX4OcAhgNjEjyGrd1wyAsVAmLxHODjEcZbTlK3GdG9rcTRFDRH4_lEqUOQ",
    "privateKey": "oKzlEigxBPIsIapf90KKohD45eH_iEabY5b_ZkACUHY"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fu3BrWenpVw:APA91bHU7cfYgjPGp61MNGrzUkFPP1JTF8Vqs0xxKlt8FBJEdBvEYc5EzS9JTSPbRFB0Q9n5-q2Aq4yoFPC6x7DfCyFlHlv4M4uyZtEzN6NFJgRcI0VpBxcua6aV8rsY1zHAL45GTBgH",
    "keys": {
        "p256dh": "BK1n04ykOOg1+Z6d49ez4M/hg8GSWzMQJufJEespyQZMJIs2GQCSF/iqGBOEfKMU/mAF2QodxPIxVLiKktvYh4w=",
        "auth": "YPefP8uDOQr0oXgog3KJDA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '697988490442',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);