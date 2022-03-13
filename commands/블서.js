const { SlashCommandBuilder } = require('@discordjs/builders')
const Log = require('./common/Log');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('블서')
        .setDescription('이터널리턴 전적검색')
        .addStringOption(option => option.setName('닉네임').setDescription('검색할 이터널리턴 닉네임을 입력해주세요').setRequired(true))
        .addStringOption(option => option.setName('게임모드').setDescription('검색할 이터널리턴 게임모드를 입력해주세요 (솔로, 듀오, 스쿼드)').setRequired(true))
        .addIntegerOption(option => option.setName('시즌').setDescription('검색할 시즌을 입력해주세요 미입력시 현재시즌으로 검색됩니다.')),
    async execute(interaction, client) {
        const nickName = interaction.options.getString('닉네임'); // 필수옵션
        const gameMode = interaction.options.getString('게임모드'); // 필수옵션
        const season = interaction.options.getInteger('시즌'); // 선택옵션 : 미입력시 null

        Log.send(client, 'test')
        await interaction.reply(nickName + season);
    },
};