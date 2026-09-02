#!/bin/sh
# 本地预览：http://127.0.0.1:4000
# 用 Homebrew 的 Ruby（系统 Ruby 2.6 装不上 Jekyll）；仓库 Gemfile 会拉起 Bundler，这里跳过它。
set -e
cd "$(dirname "$0")/.."

export PATH="/usr/local/opt/ruby/bin:$PATH"
export GEM_HOME="$HOME/.gem/softminilabs"
export JEKYLL_NO_BUNDLER_REQUIRE=true

if [ ! -x "$GEM_HOME/bin/jekyll" ]; then
    gem install jekyll -v 4.3.4 --no-document
fi

# remote_theme 和 jekyll-feed 只在 GitHub Pages 上需要，本地关掉
printf 'plugins: []\nremote_theme: ""\n' > /tmp/softminilabs_local.yml

exec "$GEM_HOME/bin/jekyll" serve --config _config.yml,/tmp/softminilabs_local.yml -d /tmp/softminilabs_site --livereload
