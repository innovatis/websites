SERVER     = "og"
BRANCH     = "thorvaldson.ca"
PATH       = "/srv/http/inno/thorvaldson.ca"
REPO_ROOT  = "git@github.com:innovatis"
REPO       = "websites"

task :deploy do
  puts "deploying: #{REPO_ROOT}/#{REPO} to #{SERVER}:#{PATH}"
  sleep 2
  puts "starting:"

  system <<-END
    ssh #{SERVER} " cd #{PATH} &&
    rm -rf #{REPO} &&
    git clone #{REPO_ROOT}/#{REPO} --depth 0 &&
    cd #{REPO} &&
    git checkout #{BRANCH} &&
    rm -rf Rakefile  &&
    cp -r * ../htdocs "
  END
  puts "finished"
end
