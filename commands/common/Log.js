exports.send = function(client, text) {
    client
        .guilds.cache.get('700801242284294325')
        .channels.cache.get('706819268133519410')
        .send("```diff\n-" + text + "```");
}