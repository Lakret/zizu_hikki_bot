zizu_hikki_bot
===============

To run it:


1. Create new Twitter app. Run:

```
    node src/index.js makeToken --key={yourAppKey} --secret={yourAppSecret}
```

2. Go to redirect_url, get Pin, and input Pin.

3. Make `account.key` file in the project directory with the following contents:

```
    appkey,appsecret,accessToken,accessTokenSecret
```

4. Run `node src/index.js`
