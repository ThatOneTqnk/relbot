# relbot
Discord bot Skript Updater for MH servers

1. Clone source
```
git clone https://github.com/ThatOneTqnk/relbot
cd relbot
```

2. Install dependencies
```
npm install
```

3. Configure environment variables in `.env` (Please see https://github.com/jellz/minehut-file-watcher on how to get server ID, auth_token, and x-session-id)

Guild IDs are separated by commas
```
DTOKEN=DISCORD BOT TOKEN
GREPO=SKRIPT GIT REPO
SKRIPT_HOST=MINEHUT
MH_X_SESSION_ID=X SESSION ID
MH_AUTHORIZATION=AUTHORIZATION
MH_SERVER_ID=MH SERVER ID
TARGET_GUILDS=GUILD IDS
```

4. Start
```
npm start
```

`.flush` - Cache all Skripts from reposutory
`.ul` - Upload Skripts to Minehut
