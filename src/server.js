import sirv from "sirv";
const express = require("express");
import compression from "compression";
import * as sapper from "@sapper/server";
const crypto = require("crypto");
import { json } from "body-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const nonce = crypto.randomBytes(16).toString("hex");

const FileStore = new sessionFileStore(session);
import { secret_key } from "../config";

express()
  .use(
    json(),
    session({
	  name: 'milkbook',
	  secret: secret_key,
	  secure: true,
      resave: true,
      saveUninitialized: true,
      cookie: {
		sameSite: 'strict'
      },
      store: new FileStore({
        path: `.sessions`,
      }),
    }),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => {
        return {
          token: req.session.token,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

import helmet from "helmet";

express().use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: "self",
        // Has to be unsafe-eval because %sapper.scripts% uses eval
        // @ts-expect-error
        scriptSrc: [
          "'self' 'unsafe-eval' 'apis.google.com'",
          (_req, res) => `'nonce-${nonce}'`,
        ],
        // Has to be unsafe-inline currently, because svelte-awesome & svelte-image sets inline style
        styleSrc: ["'self' 'unsafe-inline'"],
        // data: needed for svelte-image placeholders and svelte-awesome icons
        imgSrc: ["'self'", "data:"],
      },
    },
    referrerPolicy: { policy: "same-origin" },
  })
);

express().listen(8888, "0.0.0.0");
express().use(sapper.middleware());
