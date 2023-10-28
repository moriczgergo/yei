module.exports = function (client) {
    return {
        text: `Yei | by skiilaa | ${require("./../package.json").version}`,
        icon_url: client.user.displayAvatarURL
    };
}