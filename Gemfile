source "https://rubygems.org"

gem "jekyll", "~> 4.3.3"

# gem "just-the-docs" # Not needed for remote_theme method, but keeping it doesn't hurt locally.
# However, to be cleaner for GH Pages, we rely on remote-theme.

gem "jekyll-remote-theme"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
