# Jekyll serve script - bypasses RUBYOPT space-in-path issue
# Usage: .\serve.ps1

$env:GEM_HOME = 'C:\RubyGems'
$env:GEM_PATH = 'C:\RubyGems;C:\Ruby34-x64\lib\ruby\gems\3.4.0'
$env:PATH = "C:\RubyGems\bin;$env:PATH"

bundle _2.6.9_ exec jekyll serve $args
