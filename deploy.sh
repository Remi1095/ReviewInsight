#!/bin/sh
npm run build
netlify deploy --prod --dir=./build --site reviewinsight2