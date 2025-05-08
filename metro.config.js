// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 🚨 THIS is the workaround that fixes the Supabase `ws` + `stream` crash
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
